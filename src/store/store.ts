import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "./features/posts/postsSlice";

export const store = configureStore({
  reducer: {
    posts: postsSlice,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = ReturnType<AppStore["dispatch"]>;
