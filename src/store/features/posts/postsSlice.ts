import { createSlice, nanoid } from "@reduxjs/toolkit";
import { IPost } from "../../../types/PostType";
import { RootState } from "../../store";
import { sub } from "date-fns";

const initialState: IPost[] = [
  {
    id: nanoid(),
    title: "Default post",
    body: "Lorem ipsum sit dolor",
    date: sub(new Date(), { hours: 8 }).toISOString(),
    userId: "",
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
];

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: {
      reducer(state, action) {
        state.push(action.payload);
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
      const existingPost = state.find((post) => post.id === postId);

      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
});

export const selectAllPosts = (state: RootState) => state.posts;

export const { addPost, addReaction } = postsSlice.actions;

export default postsSlice.reducer;
