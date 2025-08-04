// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      }
    },
    updateFriends: (state, action) => {
      if (state.user) {
        state.user.friends = state.user.friends.map(friend => 
          friend._id === action.payload.friend._id ? action.payload.friend : friend
        );
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      state.posts = state.posts.map(post =>
        post._id === action.payload.post._id ? action.payload.post : post
      );
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setFriends,
  updateFriends,
  setPosts,
  setPost,
} = authSlice.actions;

export default authSlice.reducer;