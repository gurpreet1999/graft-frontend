import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ExperienceActions } from "./lib";

export interface ExperienceState {
  status?: "loading" | "succeeded" | "failed";
  experience?: INormalizedExperienceData;
  suggestions?: IExperienceData;
  error?: string | null;
}

const initialState: ExperienceState = {
  experience: undefined,
  suggestions: undefined,
};

export const experienceSlice = createSlice({
  name: "experienceData",
  initialState,
  reducers: {
    setExperience: (state, action) => {
      state.experience = action.payload.experience;
      state.suggestions = action.payload.suggestions;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(ExperienceActions.getExperience.pending, (state) => {
        state.status = "loading";
      })
      .addCase(ExperienceActions.getExperience.fulfilled, (state, action) => {
        if (action.payload) {
          state.experience = action.payload.experience;
          state.suggestions = action.payload.suggestions;
        }
        state.status = "succeeded";
      })
      .addCase(ExperienceActions.getExperience.rejected, (state) => {
        state.experience = undefined;
        state.suggestions = undefined;
        state.status = "failed";
      });
  },
});

export const selectExperience = (state: RootState) => state.experience;

export default experienceSlice.reducer;
