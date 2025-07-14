import qualitiesReducer from "./qualities";
import professionsReducer from "./professions";
import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users";
import commentsReducer from "./comments";

const createStore = () => {
  return configureStore({
    reducer: {
      qualities: qualitiesReducer,
      professions: professionsReducer,
      users: usersReducer,
      comments: commentsReducer,
    },
  });
};

export default createStore;
