import style from "../style.module.css";
import creditsImg from "assets/images/onboarding/credits.png";

export const ThirdStep = () => {
  return (
    <div className={style.step__container}>
      <div className={style.heading}>
        <h1>Buy Credits</h1>
      </div>
      <p className={style.text}>
        Buy credits to contact more candidates and build campaigns.
      </p>
      <img src={creditsImg} alt="" />
    </div>
  );
};
