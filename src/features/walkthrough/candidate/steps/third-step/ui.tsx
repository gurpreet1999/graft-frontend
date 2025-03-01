import style from "../style.module.css";

export const ThirdStep = () => {
  return (
    <div className={style.step__container}>
      <div className={style.heading}>
        <h1>Jobs</h1>
      </div>
      <p className={style.text}>
        Search available jobs that match your skills to find the best roles for
        you.
      </p>
    </div>
  );
};
