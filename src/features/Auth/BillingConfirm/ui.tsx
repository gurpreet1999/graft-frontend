import { useState } from "react";
import style from "../RecruiterSignUp/RecruiterSignUp.module.css";
import { PlansSlider } from "../RecruiterSignUp/plans-slider";
import { StripeForm } from "../RecruiterSignUp/stripe-form";
import arrow from "assets/images/sign-in/arrow.svg";
import { Steps } from "shared/ui";
import { ScrollArea } from "@radix-ui/themes";

export const BillingConfirm = () => {
  const [step, setStep] = useState<number>(1);
  const [planToBuy, setPlanToBuy] = useState<IPlan>();
  const [clientSecret, setClientSecret] = useState<string>();
  const [hide, setHide] = useState<boolean>(false);

  const showPlansSlider = step === 2 && planToBuy && clientSecret;

  return (
    <div className={style.container}>
      {!hide && <Steps maxSteps={2} activeStep={step} />}
      {step !== 1 && (
        <button
          className={style.back}
          onClick={() => {
            setStep(step - 1);
          }}
        >
          <img src={arrow} alt="" />
        </button>
      )}
      {step === 1 && (
        <PlansSlider
          setStep={setStep}
          step={step}
          setPlanToBuy={setPlanToBuy}
          setClientSecret={setClientSecret}
        />
      )}
      {showPlansSlider && (
        <ScrollArea className={style.stripe} scrollbars="vertical">
          <StripeForm
            clientSecret={clientSecret}
            planToBuy={planToBuy}
            setHideStep={setHide}
          />
        </ScrollArea>
      )}
    </div>
  );
};
