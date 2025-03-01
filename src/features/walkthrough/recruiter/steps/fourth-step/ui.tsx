import style from "../style.module.css";

export const FourthStep = () => {
  return (
    <div className={style.step__container}>
      <div className={style.heading}>
        <h1>Profile</h1>
      </div>
      <p className={style.text}>
        Edit your profile info, upgrade your pricing plan, and buy more credits.
      </p>
    </div>
  );
};
