import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { IPost } from "../../../types/PostType";
import { RootState } from "../../store";
import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com";

interface IStorePosts {
  posts: IPost[];
  status: string;
  error: string;
}

const initialState: IStorePosts = {
  posts: [],
  status: "idle", // idle | loading | succeeded |
  error: "",
};

export const getAllPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(`${BASE_URL}/posts`);
  return [...response.data];
});

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },

      prepare(title: string, body: string, userId: string) {
        return {
          payload: {
            id: nanoid(),
            title,
            body,
            date: new Date().toISOString(),
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    addReaction(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);

      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
});

export const selectAllPosts = (state: RootState) => state.posts.posts;

export const { addPost, addReaction } = postsSlice.actions;

export default postsSlice.reducer;
