import style from "../style.module.css";
import pricingImg from "assets/images/onboarding/pricing.png";

export const PricingStep = () => {
  return (
    <div className={style.step__container}>
      <div className={style.heading}>
        <h1>Pricing Plan</h1>
      </div>
      <p className={style.text}>
        Choose the pricing plan that best suits your company’s needs.
      </p>
      <img src={pricingImg} alt="" />
    </div>
  );
};
