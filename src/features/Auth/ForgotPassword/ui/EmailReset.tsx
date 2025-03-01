import style from "../ForgotPassword.module.css";
import { Button, Input, SnackBar } from "shared/ui";
import { Auth } from "features/Auth/lib";
import { useInputState } from "shared/hooks";
import mailIcon from "assets/images/sign-in/login/mail.svg";
import { Validation } from "shared/validation";

export const EmailReset = ({
  handleRequest,
  handleChangeEmail,
}: IResetProps) => {
  const {
    value: email,
    error,
    setValue: setEmail,
    setErrorState,
  } = useInputState<string>("");

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const getEmail = async () => {
    const error = Validation.validateEmail(email);
    if (error.length > 0) {
      setErrorState(error);
      SnackBar({ text: "Please fill all fields" });
      return;
    }
    await Auth.forgotPasswordEmail(email);
    if (handleChangeEmail) handleChangeEmail(email);
    handleRequest("email");
  };

  return (
    <div className={style.container}>
      <div className={style.input}>
        <Input
          icon={mailIcon}
          placeholder="Email"
          type="email"
          error={error}
          value={email}
          handleChange={handleEmailChange}
        />
        <Button onClick={getEmail}>Continue</Button>
      </div>
    </div>
  );
};
