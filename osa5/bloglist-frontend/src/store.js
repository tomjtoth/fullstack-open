import { configureStore } from "@reduxjs/toolkit";
import blogs from "./reducers/blogReducer";
import user from "./reducers/userReducer";
import feedback from "./reducers/feedbackReducer";

const store = configureStore({
  reducer: { blogs, user, feedback },
});

export default store;
