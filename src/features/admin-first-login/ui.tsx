import { useEffect, useState } from "react";
import style from "./style.module.css";
import { Button, Input, SnackBar, Steps } from "shared/ui";
import { Link, useNavigate } from "react-router-dom";
import userIcon from "assets/images/jobs/User.svg";
import phoneIcon from "assets/images/sign-in/signup/phone.svg";
import smsIcon from "assets/images/sign-in/reset/phone.svg";
import lockIcon from "assets/images/sign-in/reset/lock.svg";
import passwordIcon from "assets/images/sign-in/login/password.svg";
import { useInputState } from "shared/hooks";
import { BackButton, Header } from "./helpers";
import { Validation } from "shared/validation";
import { AuthApi } from "shared/api";

export const AdminFirstLogin = () => {
  const [step, setStep] = useState(1);
  const [stepShow, setStepShow] = useState(1);
  const [codeSendTo, setCodeSendTo] = useState("");
  const [isTokenValid, setIsTokenValid] = useState(false);

  const emailToken = new URLSearchParams(window.location.search).get("token");

  const {
    value: phone,
    setValue: setPhone,
    setErrorState: setPhoneError,
    error: phoneError,
  } = useInputState<string>("");

  const {
    value: code,
    setValue: setCode,
    setErrorState: setCodeError,
    error: codeError,
  } = useInputState<string>("");

  const {
    value: password,
    setValue: setPassword,
    setErrorState: setPasswordError,
    error: passwordError,
  } = useInputState<string>("");

  const {
    value: confirmPassword,
    setValue: setConfirmPassword,
    setErrorState: setConfirmPasswordError,
    error: confirmPasswordError,
  } = useInputState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      if (emailToken) {
        try {
          const res = await AuthApi.validateAdminToken(emailToken);
          if (res.status === 200) {
            setIsTokenValid(true);
          }
        } catch (error) {
          SnackBar({ text: "Token is invalid", variant: "error" });
          setIsTokenValid(false);
        }
      }
    };

    checkToken();
  }, [emailToken]);

  const sendCodeAgain = async () => {
    if (!isTokenValid || !emailToken) {
      SnackBar({
        text: "Your token is invalid, please try again later",
        variant: "error",
      });
      return;
    }
    try {
      await AuthApi.requestPhoneCodeAdmin(phone, emailToken);
      SnackBar({ text: "Code sent successfully", variant: "success" });
    } catch (error) {
      SnackBar({ text: "Something went wrong", variant: "error" });
    }
  };

  const handleFirstLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isTokenValid || !emailToken) {
      SnackBar({
        text: "Your token is invalid, please try again later",
        variant: "error",
      });
      return;
    }

    if (step === 1) {
      const error = Validation.validatePhone(phone);
      if (error.length) {
        setPhoneError(error);
        return;
      }

      try {
        await AuthApi.requestPhoneCodeAdmin(phone, emailToken);
      } catch (error) {
        SnackBar({ text: "Something went wrong", variant: "error" });
        return;
      }

      setCodeSendTo(phone);
    }

    if (step === 2) {
      const error = Validation.validateCode(code);
      if (error.length) {
        setCodeError(error);
        return;
      }

      try {
        await AuthApi.verifyPhoneCodeAdmin(phone, code, emailToken);
      } catch (error) {
        setCodeError(["Code is invalid"]);
        return;
      }

      setStepShow(2);
    }

    if (step === 3) {
      const error = Validation.validatePassword(password);
      if (error.length) {
        setPasswordError(error);
        return;
      }

      const errorConfirm = [];
      if (password !== confirmPassword) {
        errorConfirm.push("Passwords do not match");
      }
      if (errorConfirm.length) {
        setConfirmPasswordError(errorConfirm);
        return;
      }

      try {
        await AuthApi.completeAdminSignUp(emailToken, password);
      } catch (error) {
        SnackBar({ text: "Something went wrong", variant: "error" });
        return;
      }
    }

    setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step === 1) {
      navigate("/auth/admin");
    } else {
      setStep(step - 1);
    }
  };

  const renderStepContent = () => {
    // eslint-disable-next-line no-console
    console.log("Step Count*** ", step);
    switch (step) {
      case 1:
        // eslint-disable-next-line no-console
        console.log("Step 1");
        return (
          <>
            <img src={userIcon} alt="login" className={style.img} />
            <Header
              title="Welcome!"
              subtitle="Please enter the following details to create admin account"
            />
            <div className={style.input}>
              <Input
                icon={phoneIcon}
                placeholder="Mobile Number"
                type="phone"
                error={phoneError}
                value={phone}
                handleChange={setPhone}
              />
            </div>

            <div className={style.buttons}>
              <Button className={style.button}>Send Code</Button>
            </div>
            <BackButton onClick={handlePrevStep} />
          </>
        );
      case 2:
        return (
          <>
            <img src={smsIcon} alt="login" className={style.img} />
            <Header
              title="Check your phone"
              subtitle={`SMS with code has been sent to ${codeSendTo}. \n
                If it doesn’t arrive soon, click to Send again`}
            />
            <BackButton onClick={handlePrevStep} />
            <div className={style.input}>
              <Input
                icon={lockIcon}
                placeholder="4-digit code"
                type="text"
                error={codeError}
                value={code}
                handleChange={setCode}
              />
            </div>
            <div className={style.buttons}>
              <Button className={style.button}>Confirm</Button>
              <Button
                type="button"
                className={style.button}
                onClick={sendCodeAgain}
                variant="primary"
              >
                Send code again
              </Button>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <img src={userIcon} alt="login" className={style.img} />
            <Header
              title="Set your password"
              subtitle="Please enter the following details to create admin account"
            />
            <BackButton onClick={handlePrevStep} />
            <div className={style.input}>
              <Input
                type="password"
                isPassword
                icon={passwordIcon}
                placeholder="New Password"
                value={password}
                error={passwordError}
                handleChange={setPassword}
              />
              <Input
                type="password"
                isPassword
                icon={passwordIcon}
                placeholder="Repeat Password"
                value={confirmPassword}
                error={confirmPasswordError}
                handleChange={setConfirmPassword}
              />
            </div>
            <div className={style.buttons}>
              <Button className={style.button}>Create Account</Button>
            </div>
          </>
        );
      case 4:
        return (
          <>
            <img src={userIcon} alt="login" className={style.img} />
            <Header title="Admin account successfully registered!" />
            <div className={style.buttons}>
              <Link to="/auth/admin">
                <Button className={style.button}>Login</Button>
              </Link>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <form className={style.container} onSubmit={handleFirstLogin}>
      {step !== 4 && <Steps maxSteps={2} activeStep={stepShow} />}
      {renderStepContent()}
    </form>
  );
};
