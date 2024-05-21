// addToCartSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: []
};

const addToCartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, action) => {
      state.value.push(action.payload);
    },
    // Optional: remove item from cart by slug or other identifier
    remove: (state, action) => {
      state.value = state.value.filter(item => item.slug !== action.payload.slug);
    },
  },
});

export const { add, remove } = addToCartSlice.actions;

export default addToCartSlice.reducer;
