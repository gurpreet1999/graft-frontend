import { Button, Modal, InputNumber, SnackBar } from "shared/ui";
import style from "./BuyCreditsModal.module.css";
import coinsIcon from "assets/images/profile/coins.svg";
import coinIcon from "assets/images/profile/coin.svg";
import paymentIcon from "assets/images/profile/wallet.svg";
import stripe from "assets/images/profile/stripe.png";
import visaIcon from "assets/images/profile/visa.svg";
import mastercardIcon from "assets/images/profile/mastercard.svg";
import amexIcon from "assets/images/profile/amex.svg";
import maestroIcon from "assets/images/profile/maestro.svg";
import { useState } from "react";
import { useInputState } from "shared/hooks";
import { BuyCredits } from "./lib";

interface IBuyCreditsModal {
  open: boolean;
  onClose: () => void;
  creditsMultiplier?: number;
  redirectRoute: string;
}

export const BuyCreditsModal = ({
  open,
  onClose,
  creditsMultiplier,
  redirectRoute,
}: IBuyCreditsModal) => {
  const {
    value: credits,
    setValue: setCredits,
    error,
    setErrorState,
  } = useInputState<string>("");
  const [funds, setFunds] = useState<number>();

  const handleChangeCredits = (value: string) => {
    if (!/^[0-9]+$/.test(value)) {
      setErrorState(["Please enter a valid number of credits."]);
      return;
    }
    if (!creditsMultiplier) {
      SnackBar({ text: "Credits multiplier is not set." });
      return;
    }

    setCredits(value);
    setFunds(BuyCredits.getConverted(value, creditsMultiplier));
  };

  const handleBuyCredits = async () => {
    if (!credits || !funds) {
      setErrorState(["Please enter a valid number of credits."]);
      return;
    }
    if (error.length) return;
    window.location.href = await BuyCredits.getCheckoutUrl(
      Number(credits),
      redirectRoute
    );
  };

  return (
    <Modal title="Buy Credits" open={open} onClose={onClose}>
      <div className={style.main__container}>
        <InputNumber
          type="number"
          value={credits}
          labelImg={coinsIcon}
          label={"Amount of credits"}
          placeholder="0"
          handleChange={handleChangeCredits}
          error={error}
        />
        <InputNumber
          type="string"
          value={funds ? "£" + String(funds) : undefined}
          labelImg={coinIcon}
          label={"Total to pay"}
          placeholder="£0"
          handleChange={setCredits}
          disabled
        />
        <div className={style.payment}>
          <div className={style.payment__title}>
            <img src={paymentIcon} alt="" />
            <span>Payment method</span>
          </div>
          <div className={style.payment__methods}>
            <div className={style.payment__source}>
              <img src={stripe} alt="stripelogo" />
              <span>Stripe</span>
            </div>
            <ul className={style.payment__cards}>
              <li>
                <img src={visaIcon} alt="visa" />
              </li>
              <li>
                <img src={mastercardIcon} alt="mastercard" />
              </li>
              <li>
                <img src={amexIcon} alt="amex" />
              </li>
              <li>
                <img src={maestroIcon} alt="maestro" />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={style.button__container}>
        <Button variant="primaryBlue" onClick={handleBuyCredits}>
          Buy Credits
        </Button>
      </div>
    </Modal>
  );
};
