import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../user";
import experienceReducer from "../experience";

export const store = configureStore({
  reducer: {
    user: userReducer,
    experience: experienceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
