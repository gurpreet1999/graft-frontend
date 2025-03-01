import { useState, useEffect } from "react";
import { ResetPasswordApi } from "shared/api";

export const useCheckToken = (jwt: string) => {
  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const checkToken = async () => {
      try {
        await ResetPasswordApi.verifyResetPasswordToken(jwt);
        setIsValid(true);
      } catch (error: any) {
        setError(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, [jwt]);

  return { loading, error, isValid };
};
