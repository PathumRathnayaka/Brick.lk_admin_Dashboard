import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { Product } from '../../types';

interface ProductState {
  products: Product[];
  product: Product | null;
  loading: boolean;
  error: string | null;
  totalCount: number;
}

const initialState: ProductState = {
  products: [],
  product: null,
  loading: false,
  error: null,
  totalCount: 0,
};

// Get all products
export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async (params: { page?: number; limit?: number; search?: string }, { rejectWithValue }) => {
    try {
      // Mock API call
      // const response = await api.get('/products', { params });
      
      // Mock data for now
      const mockData = {
        products: [
          {
            id: '1',
            name: 'Premium Cement Bag (50kg)',
            description: 'High-quality cement suitable for all construction purposes.',
            price: 1250,
            imageUrl: 'https://images.pexels.com/photos/5691544/pexels-photo-5691544.jpeg',
            category: 'Building Materials',
            subcategory: 'Cement',
            brand: 'Holcim',
            rating: 4.7,
            stock: 500,
          },
          {
            id: '2',
            name: 'Construction Sand (Cubic Meter)',
            description: 'Fine quality river sand, perfect for concrete mixing and mortar preparation.',
            price: 9500,
            imageUrl: 'https://images.pexels.com/photos/3334360/pexels-photo-3334360.jpeg',
            category: 'Building Materials',
            subcategory: 'Sand',
            brand: 'Local',
            rating: 4.5,
            stock: 200,
          },
        ],
        totalCount: 2,
      };
      
      return mockData;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
    }
  }
);

// Get single product
export const fetchProductById = createAsyncThunk(
  'products/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      // Mock API call
      // const response = await api.get(`/products/${id}`);
      
      // Mock data for now
      const mockProduct = {
        id: '1',
        name: 'Premium Cement Bag (50kg)',
        description: 'High-quality cement suitable for all construction purposes.',
        price: 1250,
        imageUrl: 'https://images.pexels.com/photos/5691544/pexels-photo-5691544.jpeg',
        category: 'Building Materials',
        subcategory: 'Cement',
        brand: 'Holcim',
        rating: 4.7,
        stock: 500,
      };
      
      return mockProduct;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch product');
    }
  }
);

// Create product
export const createProduct = createAsyncThunk(
  'products/create',
  async (productData: Omit<Product, 'id'>, { rejectWithValue }) => {
    try {
      // Mock API call
      // const response = await api.post('/products', productData);
      
      // Mock response for now
      const mockResponse = {
        ...productData,
        id: Math.random().toString(36).substring(2, 9),
      };
      
      return mockResponse;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create product');
    }
  }
);

// Update product
export const updateProduct = createAsyncThunk(
  'products/update',
  async ({ id, data }: { id: string; data: Partial<Product> }, { rejectWithValue }) => {
    try {
      // Mock API call
      // const response = await api.put(`/products/${id}`, data);
      
      // Mock response for now
      const mockResponse = {
        id,
        ...data,
      };
      
      return mockResponse;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update product');
    }
  }
);

// Delete product
export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      // Mock API call
      // await api.delete(`/products/${id}`);
      
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete product');
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProduct: (state) => {
      state.product = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch all products
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload.products;
      state.totalCount = action.payload.totalCount;
      state.loading = false;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      toast.error(action.payload as string);
    });

    // Fetch product by ID
    builder.addCase(fetchProductById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.product = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchProductById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      toast.error(action.payload as string);
    });

    // Create product
    builder.addCase(createProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.products = [...state.products, action.payload];
      state.totalCount++;
      state.loading = false;
      toast.success('Product created successfully!');
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      toast.error(action.payload as string);
    });

    // Update product
    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.products = state.products.map((product) =>
        product.id === action.payload.id ? { ...product, ...action.payload } : product
      );
      state.product = null;
      state.loading = false;
      toast.success('Product updated successfully!');
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      toast.error(action.payload as string);
    });

    // Delete product
    builder.addCase(deleteProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.products = state.products.filter((product) => product.id !== action.payload);
      state.totalCount--;
      state.loading = false;
      toast.success('Product deleted successfully!');
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      toast.error(action.payload as string);
    });
  },
});

export const { clearProduct } = productSlice.actions;
export default productSlice.reducer;