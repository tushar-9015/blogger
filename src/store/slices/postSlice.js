import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postService from "../../appwrite/post";
import toast from "react-hot-toast";

const initialState = {
  allPosts: [],
};

export const getAllPost = createAsyncThunk("post/getAllPosts", async () => {
  try {
    return await postService.getPosts();
  } catch (error) {
    toast.error(error.message);
  }
});

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    upsertPost: (state, action) => {
      let postIdx = state.allPosts.findIndex(
        (x) => x.$id == action.payload.post.$id
      );
      if (postIdx != -1) {
        state.allPosts[postIdx] = action.payload.post;
      } else {
        state.allPosts.push(action.payload.post);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllPost.fulfilled, (state, action) => {
      state.allPosts = action.payload.documents;
    });
  },
});

export const { upsertPost } = postSlice.actions;

export default postSlice.reducer;
