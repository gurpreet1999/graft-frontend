import { Api } from "../Api";

export class ResetPasswordApi extends Api {
  static async requestResetPasswordByEmail(data: IResetPasswordByEmail) {
    return this.post("/auth/reset-password/email", data);
  }

  static async requestResetPasswordByPhone(data: IResetPasswordByEmail) {
    return this.post("/auth/reset-password/otp", data);
  }

  static async resetPasswordByJWT(data: IResetPasswordByJWT, jwt: string) {
    return this.patch(`/auth/reset-password/email/${jwt}`, data);
  }

  static async resetPasswordByOTP(data: IResetPasswordByOTP, otp: string) {
    return this.patch(`/auth/reset-password/otp/${otp}`, {
      email: data.email,
      password: data.password,
    });
  }

  static async verifyResetPasswordToken(jwt: string) {
    return this.get("/auth/reset-password/email", { token: jwt });
  }

  static async verifyResetPasswordOtp(otp: string, email: string) {
    return this.get("/auth/reset-password/otp", { otp, email });
  }

  static async changePasswordAfterLogin(
    currentPassword: string,
    newPassword: string
  ) {
    return this.patch("/auth/password", { currentPassword, newPassword });
  }
}
