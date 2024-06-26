import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: null,
}

export const updateProductSlice = createSlice({
  name: 'dataToUpdate',
  initialState,
  reducers: {
    setDataToUpdate: (state,action) => {
      state.value = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setDataToUpdate } = updateProductSlice.actions

export default updateProductSlice.reducer
