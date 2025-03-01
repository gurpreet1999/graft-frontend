import { createAsyncThunk } from "@reduxjs/toolkit";
import { ExperienceApi } from "shared/api";

export class ExperienceActions {
  static getExperience = createAsyncThunk(
    "experience/getExperience",
    async () => {
      try {
        const response = await ExperienceApi.getExperience();
        const experience: INormalizedExperienceData = {
          dailyJobUpdates: {},
          hospitalityRoles: {},
          hospitalityEstablishments: {},
          constructionCardTypes: {},
          constructionRoles: {},
          skills: {},
          yearsExperience: {},
          sectors: {},
          employmentTypes: {},
          industrialAndDrivingAvailabilities: {},
          industrialAndDrivingRoles: {},
          industrialAndDrivingLicences: {},
        };

        for (const key in response) {
          if (Object.prototype.hasOwnProperty.call(response, key)) {
            response[key].forEach((item: ISuggestion) => {
              experience[key][item.id] = item;
            });
          }
        }

        return { experience, suggestions: response };
      } catch (error: any) {
        return error.message;
      }
    }
  );
}
