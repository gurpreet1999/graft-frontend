import style from "../ForgotPassword.module.css";
import { Button, Heading, Input, SnackBar } from "shared/ui";
import { Auth } from "features/Auth/lib";
import { useInputState } from "shared/hooks";
import envelopeIcon from "assets/images/sign-in/envelope.svg";
import lockIcon from "assets/images/sign-in/reset/lock.svg";
import { LinkBack } from "./LinkBack";
import { useNavigate } from "react-router-dom";
import { ResetPasswordApi } from "shared/api";

export const PhoneConfirm = ({ handleRequest, email }: IResetProps) => {
  const {
    value: code,
    setValue: setCode,
    error,
    setErrorState,
  } = useInputState<string>("");

  const navigate = useNavigate();

  const handleCodeChange = (value: string) => {
    setCode(value);
  };

  const handleConfirmReset = async () => {
    if (!email) {
      SnackBar({ text: "Phone number is missing" });
      return;
    }
    try {
      await ResetPasswordApi.verifyResetPasswordOtp(code, email);
      navigate("/auth/reset-password", {
        state: { email: email, code: code },
      });
    } catch {
      setErrorState(["Invalid code"]);
    }
  };

  const handleResend = () => {
    if (email) {
      Auth.forgotPasswordPhone(email);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.text}>
        <div className={style.icon__container}>
          <img src={envelopeIcon} alt="envelope" />
        </div>
        <Heading variant="h1">Check your phone</Heading>
        <span>
          SMS with code has been sent to your phone number
          <br />
          If it doesn`t arrive soon, click to Send again or choose{" "}
          <LinkBack handleRequest={handleRequest}>another method</LinkBack>
        </span>
      </div>
      <div className={style.input}>
        <Input
          icon={lockIcon}
          placeholder="4-digit code"
          type="text"
          handleChange={handleCodeChange}
          error={error}
        />
      </div>
      <div className={style.buttons}>
        <Button
          variant="primaryBlue"
          onClick={handleConfirmReset}
          className={style.button}
        >
          Reset Password
        </Button>
        <Button
          variant="primary"
          onClick={handleResend}
          className={style.button}
        >
          Send code again
        </Button>
      </div>
      <LinkBack className={style.link} handleRequest={handleRequest}>
        Back to Log In
      </LinkBack>
    </div>
  );
};
