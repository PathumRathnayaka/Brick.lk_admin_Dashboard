import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { Category, SubCategory } from '../../types';

interface CategoryState {
  categories: Category[];
  category: Category | null;
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  category: null,
  loading: false,
  error: null,
};

// Get all categories
export const fetchCategories = createAsyncThunk(
  'categories/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      // Mock API call
      // const response = await api.get('/categories');
      
      // Mock data for now
      const mockCategories = [
        {
          id: 'building-materials',
          name: 'Building Materials',
          imageUrl: 'https://images.pexels.com/photos/5582837/pexels-photo-5582837.jpeg',
          subcategories: [
            { id: 'cement', name: 'Cement', imageUrl: 'https://images.pexels.com/photos/5691544/pexels-photo-5691544.jpeg' },
            { id: 'sand', name: 'Sand', imageUrl: 'https://images.pexels.com/photos/3334360/pexels-photo-3334360.jpeg' },
            { id: 'bricks', name: 'Bricks', imageUrl: 'https://images.pexels.com/photos/2092078/pexels-photo-2092078.jpeg' },
          ],
        },
        {
          id: 'electrical',
          name: 'Electrical',
          imageUrl: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg',
          subcategories: [
            { id: 'lighting', name: 'Lighting', imageUrl: 'https://images.pexels.com/photos/577514/pexels-photo-577514.jpeg' },
            { id: 'wiring', name: 'Wiring', imageUrl: 'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg' },
          ],
        },
      ];
      
      return mockCategories;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch categories');
    }
  }
);

// Get single category
export const fetchCategoryById = createAsyncThunk(
  'categories/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      // Mock API call
      // const response = await api.get(`/categories/${id}`);
      
      // Mock data for now
      const mockCategory = {
        id: 'building-materials',
        name: 'Building Materials',
        imageUrl: 'https://images.pexels.com/photos/5582837/pexels-photo-5582837.jpeg',
        subcategories: [
          { id: 'cement', name: 'Cement', imageUrl: 'https://images.pexels.com/photos/5691544/pexels-photo-5691544.jpeg' },
          { id: 'sand', name: 'Sand', imageUrl: 'https://images.pexels.com/photos/3334360/pexels-photo-3334360.jpeg' },
          { id: 'bricks', name: 'Bricks', imageUrl: 'https://images.pexels.com/photos/2092078/pexels-photo-2092078.jpeg' },
        ],
      };
      
      return mockCategory;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch category');
    }
  }
);

// Create category
export const createCategory = createAsyncThunk(
  'categories/create',
  async (categoryData: Omit<Category, 'id'>, { rejectWithValue }) => {
    try {
      // Mock API call
      // const response = await api.post('/categories', categoryData);
      
      // Mock response for now
      const mockResponse = {
        ...categoryData,
        id: categoryData.name.toLowerCase().replace(/\s+/g, '-'),
      };
      
      return mockResponse;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create category');
    }
  }
);

// Update category
export const updateCategory = createAsyncThunk(
  'categories/update',
  async ({ id, data }: { id: string; data: Partial<Category> }, { rejectWithValue }) => {
    try {
      // Mock API call
      // const response = await api.put(`/categories/${id}`, data);
      
      // Mock response for now
      const mockResponse = {
        id,
        ...data,
      };
      
      return mockResponse;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update category');
    }
  }
);

// Delete category
export const deleteCategory = createAsyncThunk(
  'categories/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      // Mock API call
      // await api.delete(`/categories/${id}`);
      
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete category');
    }
  }
);

// Add subcategory
export const addSubcategory = createAsyncThunk(
  'categories/addSubcategory',
  async ({ categoryId, subcategory }: { categoryId: string; subcategory: Omit<SubCategory, 'id'> }, { rejectWithValue }) => {
    try {
      // Mock API call
      // const response = await api.post(`/categories/${categoryId}/subcategories`, subcategory);
      
      // Mock response for now
      const newSubcategory = {
        ...subcategory,
        id: subcategory.name.toLowerCase().replace(/\s+/g, '-'),
      };
      
      return { categoryId, subcategory: newSubcategory };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add subcategory');
    }
  }
);

// Delete subcategory
export const deleteSubcategory = createAsyncThunk(
  'categories/deleteSubcategory',
  async ({ categoryId, subcategoryId }: { categoryId: string; subcategoryId: string }, { rejectWithValue }) => {
    try {
      // Mock API call
      // await api.delete(`/categories/${categoryId}/subcategories/${subcategoryId}`);
      
      return { categoryId, subcategoryId };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete subcategory');
    }
  }
);

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    clearCategory: (state) => {
      state.category = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch all categories
    builder.addCase(fetchCategories.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      toast.error(action.payload as string);
    });

    // Fetch category by ID
    builder.addCase(fetchCategoryById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCategoryById.fulfilled, (state, action) => {
      state.category = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchCategoryById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      toast.error(action.payload as string);
    });

    // Create category
    builder.addCase(createCategory.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.categories = [...state.categories, action.payload];
      state.loading = false;
      toast.success('Category created successfully!');
    });
    builder.addCase(createCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      toast.error(action.payload as string);
    });

    // Update category
    builder.addCase(updateCategory.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      state.categories = state.categories.map((category) =>
        category.id === action.payload.id ? { ...category, ...action.payload } : category
      );
      state.category = null;
      state.loading = false;
      toast.success('Category updated successfully!');
    });
    builder.addCase(updateCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      toast.error(action.payload as string);
    });

    // Delete category
    builder.addCase(deleteCategory.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.categories = state.categories.filter((category) => category.id !== action.payload);
      state.loading = false;
      toast.success('Category deleted successfully!');
    });
    builder.addCase(deleteCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      toast.error(action.payload as string);
    });

    // Add subcategory
    builder.addCase(addSubcategory.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addSubcategory.fulfilled, (state, action) => {
      const { categoryId, subcategory } = action.payload;
      state.categories = state.categories.map((category) =>
        category.id === categoryId
          ? { ...category, subcategories: [...category.subcategories, subcategory] }
          : category
      );
      if (state.category && state.category.id === categoryId) {
        state.category = {
          ...state.category,
          subcategories: [...state.category.subcategories, subcategory],
        };
      }
      state.loading = false;
      toast.success('Subcategory added successfully!');
    });
    builder.addCase(addSubcategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      toast.error(action.payload as string);
    });

    // Delete subcategory
    builder.addCase(deleteSubcategory.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteSubcategory.fulfilled, (state, action) => {
      const { categoryId, subcategoryId } = action.payload;
      state.categories = state.categories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              subcategories: category.subcategories.filter((sub) => sub.id !== subcategoryId),
            }
          : category
      );
      if (state.category && state.category.id === categoryId) {
        state.category = {
          ...state.category,
          subcategories: state.category.subcategories.filter((sub) => sub.id !== subcategoryId),
        };
      }
      state.loading = false;
      toast.success('Subcategory deleted successfully!');
    });
    builder.addCase(deleteSubcategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      toast.error(action.payload as string);
    });
  },
});

export const { clearCategory } = categorySlice.actions;
export default categorySlice.reducer;