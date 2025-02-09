import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';
import { IPost } from '../../../types/PostType';
import { RootState } from '../../store';
import axios from 'axios';
import { sub } from 'date-fns';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

interface IStorePosts {
  posts: IPost[];
  status: string;
  error: string | undefined;
}

const initialState: IStorePosts = {
  posts: [],
  status: 'idle', // idle | loading | succeeded | failed
  error: undefined,
};

// asinchroniskai gaunami duomenys
export const getPosts = createAsyncThunk('posts/getPosts', async () => {
  try {
    const response = await axios.get(`${BASE_URL}/posts`);
    return [...response.data];
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      return e.response?.data.message;
    }

    if (e instanceof Error) return e.message;
  }
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },

      prepare(title: string, body: string, userId: number) {
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
  extraReducers(builder) {
    builder
      .addCase(getPosts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log('state posts: ', state.posts);
        // pridedam prie postu data ir emoji
        let min = 1;

        const loadedPosts = action.payload.map((post: IPost) => {
          (post.date = sub(new Date(), { minutes: min * 10 }).toISOString()),
            (post.reactions = {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            });
          return post;
        });

        state.posts = state.posts.concat(loadedPosts);
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectAllPosts = (state: RootState) => state.posts.posts;
export const getPostsStatus = (state: RootState) => state.posts.status;
export const getPostsError = (state: RootState) => state.posts.error;

export const { addPost, addReaction } = postsSlice.actions;

export default postsSlice.reducer;
