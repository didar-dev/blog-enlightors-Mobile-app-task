import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Articles: [],
};

export const ArticlesSlice = createSlice({
  name: "Articles",
  initialState,
  reducers: {
    AddArticles: (state, action) => {
      state.Articles = action.payload;
    },
  },
});

export const { AddArticles } = ArticlesSlice.actions;

export default ArticlesSlice.reducer;
