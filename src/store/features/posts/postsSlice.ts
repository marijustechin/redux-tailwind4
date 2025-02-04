import { createSlice } from "@reduxjs/toolkit";
import { IPost } from "../../../types/PostType";
import { RootState } from "../../store";

const initialState: IPost[] = [
  {
    id: 1,
    title: "Pavadinimas 1",
    body: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias id itaque maiores nam ea excepturi iusto laboriosam eum, aliquam dicta.",
  },
  {
    id: 2,
    title: "Pavadinimas 2",
    body: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias id itaque maiores nam ea excepturi iusto laboriosam eum, aliquam dicta.",
  },
];

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost(state, action) {
      state.push(action.payload);
    },
  },
});

export const selectAllPosts = (state: RootState) => state.posts;

export const { addPost } = postsSlice.actions;

export default postsSlice.reducer;
