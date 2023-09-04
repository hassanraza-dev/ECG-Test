import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./bookSlice";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    book: bookReducer,
    token: userSlice,
  },
});

export default store;
