import { createSlice } from '@reduxjs/toolkit';

interface Order {
  id: string;
  // Add other order properties as needed
}

interface OrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    // Add order-specific reducers here
  },
});

export default orderSlice.reducer;