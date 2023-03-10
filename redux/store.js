import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./Auth";
import ArticlesReducer from "./Articles";
export default configureStore({
  reducer: {
    Auth: AuthReducer,
    Articles: ArticlesReducer,
  },
});
