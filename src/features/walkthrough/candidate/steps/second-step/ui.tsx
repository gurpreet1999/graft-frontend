import style from "../style.module.css";

export const SecondStep = () => {
  return (
    <div className={style.step__container}>
      <div className={style.heading}>
        <h1>Verification</h1>
      </div>
      <p className={style.text}>
        Upload 2x official documents to become a verified candidate such as
        passport and any other relevant qualifications or accreditations.
      </p>
    </div>
  );
};
