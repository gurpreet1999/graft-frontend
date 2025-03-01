import { Api } from "../Api";

export class UpdateUserDataApi extends Api {
  static async updateUserData(data: IUserChangeData) {
    return this.patch("/user", data);
  }

  static async updateExperience(
    data:
      | IUserChangeHospitalityExperience
      | IUserChangeConstructionExperience
      | IUserChangeIndustrialExperience
  ) {
    return this.put("/candidate/experience", data);
  }

  static async updateOnboardingStep(step: number, status?: boolean) {
    return this.patch("/user/update-onboarding-step", { step, status });
  }
}
