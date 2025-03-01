import style from "../style.module.css";

export const SeventhStep = () => {
  return (
    <div className={style.step__container}>
      <div className={style.heading}>
        <h1>Campaign History</h1>
      </div>
      <p className={style.text}>
        View all the campaigns you’ve created previously.
      </p>
    </div>
  );
};
