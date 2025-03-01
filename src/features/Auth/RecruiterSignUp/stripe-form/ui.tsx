import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "./checkout-form";
import { getAppearance } from "./appearance.style";
import { Button, Heading, useTheme } from "shared/ui";
import { useEffect, useState } from "react";
import errorImage from "assets/images/sign-in/Illustration.png";
import style from "./style.module.css";

interface IStripeForm {
  planToBuy: IPlan;
  clientSecret: string;
  setHideStep: (value: boolean) => void;
}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export const StripeForm = ({
  planToBuy,
  clientSecret,
  setHideStep,
}: IStripeForm) => {
  const { theme } = useTheme();
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    if (isError) setHideStep(true);
  }, [isError]); // eslint-disable-line react-hooks/exhaustive-deps

  const options = clientSecret && {
    clientSecret,
    appearance: getAppearance(theme),
    paymentMethodOrder: ["card", "google_pay", "uk_bank_account"],
  };

  return (
    <div>
      {!isError && options && clientSecret && (
        <Elements options={options} stripe={stripePromise} key={clientSecret}>
          <CheckoutForm planToBuy={planToBuy} setIsError={setIsError} />
        </Elements>
      )}
      {isError && (
        <div className={style.container}>
          <img src={errorImage} alt="" />
          <div className={style.header}>
            <Heading variant="h1">Payment Declined</Heading>
            <p>
              Oops! It looks like there was an issue processing your payment for
              accessing this platform feature after your free trial. Please
              update your payment information to continue using this feature or
              contact support for assistance.
            </p>
          </div>
          <div className={style.buttons}>
            <Button
              className={style.button}
              onClick={() => {
                setIsError(false);
                setHideStep(false);
              }}
            >
              Update payment information
            </Button>
            <Button
              className={style.button}
              variant="primary"
              href="/auth/login"
            >
              Back to login
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
