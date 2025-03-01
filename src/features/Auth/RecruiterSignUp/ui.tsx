import { useState } from "react";
import style from "./RecruiterSignUp.module.css";
import { useScrollEffect } from "shared/hooks/useScrollEffect";
import { PlansSlider } from "./plans-slider";
import { BasicInfo } from "./BasicInfo";
import { RecruiterInfo } from "./RecruiterInfo";
import { StripeForm } from "./stripe-form";
import arrow from "assets/images/sign-in/arrow.svg";
import { ScrollArea } from "@radix-ui/themes";

interface IUser {
  step: number;
  setStep: (value: number) => void;
  setHideStep: (value: boolean) => void;
}

type ErrorState = Record<keyof IRecruiterFormData, string[]>;

export const RecruiterSignUp = ({ step, setStep, setHideStep }: IUser) => {
  const [planToBuy, setPlanToBuy] = useState<IPlan>();
  const [clientSecret, setClientSecret] = useState<string>();
  const [signUpForm, setSignUpForm] = useState<IRecruiterFormData>({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    password: "",
    phone: "",
    postalCode: "",
  });

  const [errorsState, setErrorsState] = useState<ErrorState>({
    firstName: [],
    lastName: [],
    companyName: [],
    email: [],
    password: [],
    phone: [],
    postalCode: [],
  });

  useScrollEffect(signUpForm.companyName);

  const handleInputChange = (key: string, value: string) => {
    setSignUpForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className={style.container}>
      {step !== 0 && step !== 2 && (
        <button
          className={style.back}
          onClick={() => {
            setStep(step - 1);
          }}
        >
          <img src={arrow} alt="" />
        </button>
      )}
      {step === 0 && (
        <BasicInfo
          signUpForm={signUpForm}
          errorsState={errorsState}
          setErrorsState={setErrorsState}
          setStep={setStep}
          handleInputChange={handleInputChange}
        />
      )}
      {step === 1 && (
        <RecruiterInfo
          signUpForm={signUpForm}
          errorsState={errorsState}
          setErrorsState={setErrorsState}
          setStep={setStep}
          handleInputChange={handleInputChange}
        />
      )}
      {step === 2 && (
        <PlansSlider
          setStep={setStep}
          step={step}
          setPlanToBuy={setPlanToBuy}
          setClientSecret={setClientSecret}
        />
      )}
      {step === 3 && planToBuy && clientSecret && (
        <ScrollArea className={style.stripe} scrollbars="vertical">
          <StripeForm
            planToBuy={planToBuy}
            clientSecret={clientSecret}
            setHideStep={setHideStep}
          />
        </ScrollArea>
      )}
    </div>
  );
};
