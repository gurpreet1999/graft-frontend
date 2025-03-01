import { Api } from "../Api";

export class ExperienceApi extends Api {
  static getExperience = async (): Promise<IExperienceData> => {
    return await this.get("/experience");
  };
}
