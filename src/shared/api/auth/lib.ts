import { Api } from "../Api";

export class AuthApi extends Api {
  static async register(data: ISignUpRecruiterData | ISignUpCandidateData) {
    return this.post("/auth/sign-up", data);
  }

  static async login(data: ILoginData) {
    const response = await this.post("/auth/sign-in", data);
    return response;
  }

  static async logout() {
    return this.post("/auth/sign-out", {});
  }

  static async fetchUser(): Promise<IUser> {
    return this.get("/auth");
  }

  static async adminLogin(data: ILoginData) {
    return this.post("auth/sign-in", data);
  }

  static async validateAdminToken(token: string) {
    return this.get(`auth/admin/${token}`, {}, true);
  }

  static async requestPhoneCodeAdmin(phone_number: string, token: string) {
    return this.put("auth/admin/phone", { phone_number, token });
  }

  static async verifyPhoneCodeAdmin(
    phone_number: string,
    code: string,
    token: string
  ) {
    return this.put("auth/admin/verify", { phone_number, code, token });
  }

  static async completeAdminSignUp(token: string, password: string) {
    return this.post("auth/admin/complete", { token, password });
  }
}
