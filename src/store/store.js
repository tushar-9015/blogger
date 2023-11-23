import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./slices/authSlice";
import postSliceReducer from "./slices/postSlice";

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    post: postSliceReducer,
  },
});

export default store;
