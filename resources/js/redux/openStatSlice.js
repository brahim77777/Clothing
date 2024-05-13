import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
}

export const openStatSlice = createSlice({
  name: 'openStatState',
  initialState,
  reducers: {
    openStat: (state) => {
      state.value = !state.value ;
    },
  },
})

// Action creators are generated for each case reducer function
export const { openStat } = openStatSlice.actions

export default openStatSlice.reducer
