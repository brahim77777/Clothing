import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: []
}

export const selectCategoriesSlice = createSlice({
  name: 'selectedCategories',
  initialState,
  reducers: {
    setSelectedCategories: (state,action) => {
      state.value = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSelectedCategories } = selectCategoriesSlice.actions

export default selectCategoriesSlice.reducer
