import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { AuthActions } from "./lib";

export interface UserState {
  status?: "loading" | "succeeded" | "failed";
  userData: IUser | null;
  error?: string | null;
}

const initialState: UserState = {
  userData: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
    },
    resetUser: (state) => {
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AuthActions.fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(AuthActions.fetchUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.userData = action.payload;
        }
        state.status = "succeeded";
      })
      .addCase(AuthActions.fetchUser.rejected, (state) => {
        state.userData = null;
        state.status = "failed";
      })
      .addCase(AuthActions.register.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(AuthActions.register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userData = action.payload;
        state.error = null;
      })
      .addCase(AuthActions.register.rejected, (state, action) => {
        state.status = "failed";
        state.userData = null;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "An error occurred";
      })
      .addCase(AuthActions.login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(AuthActions.login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userData = action.payload;
        state.error = null;
      })
      .addCase(AuthActions.login.rejected, (state, action) => {
        state.status = "failed";
        state.userData = null;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "An error occurred";
      })
      .addCase(AuthActions.logout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(AuthActions.logout.fulfilled, (state) => {
        state.userData = null;
      })
      .addCase(AuthActions.logout.rejected, (state) => {
        state.error = "An error occurred";
      })
      .addCase(AuthActions.adminLogin.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(AuthActions.adminLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userData = action.payload;
        state.error = null;
      })
      .addCase(AuthActions.adminLogin.rejected, (state, action) => {
        state.status = "failed";
        state.userData = null;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "An error occurred";
      });
  },
});

export const selectUser = (state: RootState) => state.user.userData;

export default userSlice.reducer;
