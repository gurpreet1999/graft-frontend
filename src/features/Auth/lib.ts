import { AuthActions } from "entities/user";
import { store } from "entities/store";
import {
  buildCandidateDataForSignup,
  buildRecruiterDataForSignup,
} from "./helpers/formatData";
import { ResetPasswordApi } from "shared/api";
import { SnackBar } from "shared/ui";

export class Auth {
  static async login(loginData: ILoginData) {
    await store.dispatch(AuthActions.login(loginData)).unwrap();
  }

  static async signUp(signUpData: IFormData): Promise<boolean> {
    try {
      const data = buildRecruiterDataForSignup(signUpData);
      await store.dispatch(AuthActions.register(data)).unwrap();
      return true;
    } catch (error) {
      return false;
    }
  }

  static async signUpCandidate(
    signUpData:
      | ICandidateHospitalityFormData
      | ICandidateConstructionFormData
      | ICandidateIndustrialFormData
  ) {
    try {
      const data = buildCandidateDataForSignup(signUpData);
      if (!data) {
        SnackBar({ text: "Something went wrong. Please try again." });
        return;
      }
      await store.dispatch(AuthActions.register(data)).unwrap();

      return true;
    } catch (error) {
      return false;
    }
  }

  static async forgotPasswordEmail(email: string) {
    await ResetPasswordApi.requestResetPasswordByEmail({ email });
  }

  static async forgotPasswordPhone(email: string) {
    await ResetPasswordApi.requestResetPasswordByPhone({ email });
  }

  static async resetPasswordByEmail(
    password: string,
    passwordResetToken?: string
  ) {
    if (passwordResetToken) {
      await ResetPasswordApi.resetPasswordByJWT(
        { password },
        passwordResetToken
      );
    }
  }
}
