import { Button, Input, SnackBar } from "shared/ui";
import { Auth } from "features/Auth/lib";
import { useInputState } from "shared/hooks";
import passwordIcon from "assets/images/sign-in/login/password.svg";
import { Validation } from "shared/validation";
import { useLocation, useNavigate } from "react-router-dom";
import { ResetPasswordApi } from "shared/api";

interface IResetPassword {
  passwordResetToken?: string;
}

export const ResetPassword = ({ passwordResetToken }: IResetPassword) => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    value: password,
    error: passwordError,
    setValue: setPassword,
    setErrorState: setPasswordError,
  } = useInputState<string>("");
  const {
    value: confirmPassword,
    error: confirmPasswordError,
    setValue: setConfirmPassword,
    setErrorState: setConfirmPasswordError,
  } = useInputState<string>("");

  const handleChangePassword = (value: string) => {
    setPassword(value);
    setPasswordError([]);
  };

  const handleChangeConfirmPassword = (value: string) => {
    setConfirmPassword(value);
    setConfirmPasswordError([]);
  };

  const resetPassword = async () => {
    const passwordError = Validation.validatePassword(password);
    const confirmPasswordError = Validation.validatePassword(confirmPassword);
    const code = location.state?.code;
    const email = location.state?.email;
    if (passwordError.length > 0 || confirmPasswordError.length > 0) {
      setPasswordError(passwordError);
      setConfirmPasswordError(confirmPasswordError);
      SnackBar({ text: "Please fill all fields" });
      return;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError(["Passwords do not match"]);
      SnackBar({ text: "Passwords do not match" });
      return;
    }
    if (passwordResetToken) {
      await Auth.resetPasswordByEmail(password, passwordResetToken);
    } else if (code) {
      await ResetPasswordApi.resetPasswordByOTP({ password, email }, code);
    } else {
      return;
    }
    navigate("/auth/login");
  };

  return (
    <>
      <Input
        type="password"
        isPassword
        value={password}
        error={passwordError}
        icon={passwordIcon}
        placeholder="New Password"
        handleChange={handleChangePassword}
      />
      <Input
        type="password"
        isPassword
        value={confirmPassword}
        error={confirmPasswordError}
        icon={passwordIcon}
        placeholder="Confirm New Password"
        handleChange={handleChangeConfirmPassword}
      />
      <Button onClick={resetPassword}>Continue</Button>
    </>
  );
};
