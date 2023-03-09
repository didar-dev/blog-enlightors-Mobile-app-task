import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./Auth";
export default configureStore({
  reducer: {
    Auth: AuthReducer,
  },
});
