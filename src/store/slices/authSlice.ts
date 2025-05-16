import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { getStoredToken, setStoredToken, removeStoredToken } from '../../utils/auth';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: true,
  error: null,
};

// Check if user is already authenticated
export const checkAuth = createAsyncThunk('auth/check', async (_, { rejectWithValue }) => {
  try {
    const token = getStoredToken();
    if (!token) return rejectWithValue('No token found');

    // Verify token with backend
    const response = await api.get('/auth/verify');
    return response.data;
  } catch (error) {
    removeStoredToken();
    return rejectWithValue('Authentication failed');
  }
});

// Login
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      // Mock API call - replace with actual API call
      // const response = await api.post('/auth/login', credentials);
      
      // Mock successful login for now
      if (credentials.email === 'admin@brick.lk' && credentials.password === 'admin123') {
        const mockResponse: AuthResponse = {
          token: 'mock-jwt-token',
          user: {
            id: '1',
            name: 'Admin User',
            email: credentials.email,
            role: 'admin',
          },
        };
        
        setStoredToken(mockResponse.token);
        return mockResponse;
      }
      
      return rejectWithValue('Invalid email or password');
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

// Logout
export const logout = createAsyncThunk('auth/logout', async () => {
  removeStoredToken();
  return true;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Check Auth
    builder.addCase(checkAuth.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(checkAuth.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.loading = false;
    });
    builder.addCase(checkAuth.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = action.payload as string;
    });

    // Login
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.loading = false;
      toast.success('Login successful!');
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = action.payload as string;
      toast.error(action.payload as string);
    });

    // Logout
    builder.addCase(logout.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.user = null;
      toast.success('Logged out successfully');
    });
  },
});

export default authSlice.reducer;