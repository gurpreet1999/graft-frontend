import style from "../style.module.css";
import campaignsImg from "assets/images/onboarding/campaign.png";

export const SixthStep = () => {
  return (
    <div className={style.step__container}>
      <div className={style.heading}>
        <h1>Campaigns</h1>
      </div>
      <p className={style.text}>
        Contact qualified candidates quickly and easily with customisable SMS
        campaigns.
      </p>
      <img src={campaignsImg} alt="" />
    </div>
  );
};
