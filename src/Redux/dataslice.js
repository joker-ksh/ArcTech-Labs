import { createSlice } from '@reduxjs/toolkit';

const dataslice = createSlice({
  name: 'data',
  initialState: {
    value: [],
  },
  reducers: {
    setData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setData } = dataslice.actions;
export default dataslice.reducer;
