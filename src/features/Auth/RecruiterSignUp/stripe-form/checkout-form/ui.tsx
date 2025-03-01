import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import style from "./style.module.css";
import { Button, CardHeader, SnackBar } from "shared/ui";
import pricingIcon from "assets/images/profile/pricing.svg";
import classNames from "classnames";

interface ICheckoutForm {
  planToBuy: IPlan;
  setIsError: (value: boolean) => void;
}

export const CheckoutForm = ({ planToBuy, setIsError }: ICheckoutForm) => {
  const stripe = useStripe();
  const elements = useElements();
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 7);
  const futureDate = currentDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    try {
      const { error } = await stripe.confirmSetup({
        elements,
        confirmParams: {
          return_url: window.location.origin,
        },
      });

      if (error) {
        if (
          (error.type === "card_error" || error.type === "validation_error") &&
          error.message
        ) {
          SnackBar({ text: error.message });
        } else {
          SnackBar({ text: "An unexpected error occurred." });
        }
      } else {
        SnackBar({ text: "Payment confirmed.", variant: "success" });
      }
    } catch (error) {
      SnackBar({ text: "An unexpected error occurred." });
      setIsError(true);
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs" as const,
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <div className={style.plan}>
        <div className={style.plan__price}>
          <div className={style.price}>
            <CardHeader image={pricingIcon} title="Pricing Plan" />
            <span
              className={classNames(style.text__big, style.text__big_decor)}
            >
              {planToBuy.price}
            </span>
          </div>
        </div>
        <div className={style.plan__name}>
          <span>{planToBuy.name}</span>
        </div>
      </div>
      <Button type="submit" className={style.submitButton} disabled={isLoading}>
        Start free trial
      </Button>
      <div className={style.terms}>
        <p>
          * No payments due now. On {futureDate} you will be charged{" "}
          {planToBuy.price}£ automatically. Cancel any time
        </p>
      </div>
    </form>
  );
};
