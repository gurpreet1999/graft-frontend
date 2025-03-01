import { ResetPasswordApi } from "shared/api";

export const checkToken = async (jwt: string) => {
  return await ResetPasswordApi.verifyResetPasswordToken(jwt);
};
