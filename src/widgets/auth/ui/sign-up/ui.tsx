import { useState } from "react";
import style from "./signup.module.css";
import { Heading, AuthSwitcher, Steps } from "shared/ui";
import { RecruiterSignUp, CandidateSignUp } from "features/Auth";
import classNames from "classnames";
import { isRecruiter } from "shared/helpers/getUserRole";

export const SignUp = () => {
  const [role, setRole] = useState<Role>("CANDIDATE");
  const [step, setStep] = useState(0);
  const [hideStep, setHideStep] = useState(false);
  const handleActiveRole = (value: Role) => setRole(value);
  const maxSteps = role === "CANDIDATE" ? 2 : 3;

  return (
    <div
      className={classNames(
        style.container,
        isRecruiter(role) && step === 2 && style.container__big
      )}
    >
      {step === 0 && (
        <>
          <Heading className={style.padding} variant="h1">
            Sign Up
          </Heading>
          <AuthSwitcher
            className={style.padding}
            role={role}
            handleActive={handleActiveRole}
          />
        </>
      )}
      {step !== 0 && !hideStep && (
        <Steps
          className={style.padding}
          maxSteps={maxSteps}
          activeStep={step}
        />
      )}
      {isRecruiter(role) ? (
        <RecruiterSignUp
          step={step}
          setStep={setStep}
          setHideStep={setHideStep}
        />
      ) : (
        <CandidateSignUp step={step} setStep={setStep} />
      )}
    </div>
  );
};
