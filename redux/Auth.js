import { createSlice } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";

const initialState = {
  Auth: null,
};

export const userSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.Auth = action.payload;
    },
    signout: (state) => {
      state.Auth = null;
      SecureStore.deleteItemAsync("token");
    },
  },
});

export const { loginUser, signout } = userSlice.actions;

export default userSlice.reducer;
