import style from "../style.module.css";

export const FifthStep = () => {
  return (
    <div className={style.step__container}>
      <div className={style.heading}>
        <h1>Search Candidates</h1>
      </div>
      <p className={style.text}>
        Search for qualified candidates with the right skills and experience.
      </p>
    </div>
  );
};
