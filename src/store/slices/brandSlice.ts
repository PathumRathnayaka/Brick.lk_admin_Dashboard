import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Brand } from '../../types';

interface BrandState {
  brands: Brand[];
  loading: boolean;
  error: string | null;
}

const initialState: BrandState = {
  brands: [],
  loading: false,
  error: null,
};

const brandSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {
    setBrands: (state, action: PayloadAction<Brand[]>) => {
      state.brands = action.payload;
      state.loading = false;
      state.error = null;
    },
    addBrand: (state, action: PayloadAction<Brand>) => {
      state.brands.push(action.payload);
    },
    updateBrand: (state, action: PayloadAction<Brand>) => {
      const index = state.brands.findIndex(brand => brand.id === action.payload.id);
      if (index !== -1) {
        state.brands[index] = action.payload;
      }
    },
    deleteBrand: (state, action: PayloadAction<string>) => {
      state.brands = state.brands.filter(brand => brand.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setBrands,
  addBrand,
  updateBrand,
  deleteBrand,
  setLoading,
  setError,
} = brandSlice.actions;

export default brandSlice.reducer; 