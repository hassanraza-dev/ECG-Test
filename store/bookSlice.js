import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
  name: "books",
  initialState: [],
  reducers: {
    add(state, action) {
      state.push(action.payload);
    },
  },
});

export const { add } = bookSlice.actions;

export default bookSlice.reducer;
