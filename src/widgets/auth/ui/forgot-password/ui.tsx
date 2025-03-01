import { Button, Heading, Input, PasswordSwitcher } from "shared/ui";
import arrow from "assets/images/sign-in/arrow.svg";
import lockIcon from "assets/images/sign-in/reset/lock.png";
import mailIcon from "assets/images/sign-in/login/mail.svg";
import style from "./ForgotPassword.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmailConfirm, PhoneConfirm } from "features/Auth";
import { useInputState } from "shared/hooks";
import { ResetPasswordApi } from "shared/api";

type Method = "Magic Link" | "SMS";

export const ForgotPassword = () => {
  const [method, setMethod] = useState<Method>("Magic Link");
  const handleActive = (value: Method) => setMethod(value);
  const {
    value: email,
    setValue: setEmail,
    error: emailError,
    setErrorState: setEmailError,
  } = useInputState<string>("");
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  const [step, setStep] = useState(1);

  const handlePhoneRequest = () => {};

  const handleRequest = async () => {
    setStep(2);
  };

  const handleRequestReset = async () => {
    if (!email) {
      setEmailError(["Email is required"]);
      return;
    }
    if (method === "Magic Link") {
      await ResetPasswordApi.requestResetPasswordByEmail({ email });
    }
    if (method === "SMS") {
      await ResetPasswordApi.requestResetPasswordByPhone({ email: email });
    }
    setStep(3);
  };

  return (
    <>
      <button className={style.back} onClick={handleBack}>
        <img src={arrow} alt="arrow" />
      </button>
      <div className={style.container}>
        {step === 1 && (
          <>
            <img src={lockIcon} alt="lock" className={style.lock_img} />
            <div className={style.heading__container}>
              <Heading variant="h1" className={style.title}>
                Forgot Password
              </Heading>
              <span className={style.text}>Please enter the email</span>
            </div>
            <div className={style.input}>
              <Input
                icon={mailIcon}
                placeholder="Email"
                type="email"
                error={emailError}
                value={email}
                handleChange={(value) => setEmail(value)}
              />
            </div>
            <Button onClick={handleRequest} className={style.button}>
              Next
            </Button>
          </>
        )}
        {step === 2 && (
          <>
            <div className={style.heading__container}>
              <Heading variant="h1" className={style.title}>
                Forgot Password
              </Heading>
              <span className={style.text}>Please enter the email</span>
            </div>
            <PasswordSwitcher method={method} handleActive={handleActive} />
            <Button onClick={handleRequestReset} className={style.button}>
              Next
            </Button>
          </>
        )}
        {step === 3 &&
          (method === "SMS" ? (
            <PhoneConfirm handleRequest={handlePhoneRequest} email={email} />
          ) : (
            <EmailConfirm email={email} />
          ))}
      </div>
    </>
  );
};
