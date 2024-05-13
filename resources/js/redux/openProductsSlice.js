import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
}

export const openProductsSlice = createSlice({
  name: 'openProductsState',
  initialState,
  reducers: {
    openProducts: (state) => {
      state.value = !state.value ;
    },
  },
})

// Action creators are generated for each case reducer function
export const { openProducts } = openProductsSlice.actions

export default openProductsSlice.reducer
