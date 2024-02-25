import { configureStore } from "@reduxjs/toolkit";
import boardSliceReducer from "./boardSlice";

const store = configureStore({
  reducer: {
    boards: boardSliceReducer,
  },
});

export default store;
