import style from "../style.module.css";

export const SecondStep = () => {
  return (
    <div className={style.step__container}>
      <div className={style.heading}>
        <h1>Dashboard</h1>
      </div>
      <p className={style.text}>
        Get easy access to the amount of credits you have, jobs you have listed,
        pricing plan upgrades, and invoices.
      </p>
    </div>
  );
};
