import style from "../style.module.css";

export const FirstStep = () => {
  return (
    <div className={style.step__container}>
      <div className={style.heading}>
        <h1>Welcome to GRAFT!</h1>
      </div>
      <ul className={style.list}>
        <li>
          <h6 className={style.list__heading}>Easy to Use Job Search</h6>
          <span>Use our simple job search to find the perfect role.</span>
        </li>
        <li>
          <h6 className={style.list__heading}>Unrivalled Skill Matching</h6>
          <span>
            Employers will also contact you if they have a role that matches
            your skillset.
          </span>
        </li>
        <li>
          <h6 className={style.list__heading}>Only Relevant Positions</h6>
          <span>
            We’ll match your skills with relevant positions, never spamming you
            with jobs that are unsuitable.
          </span>
        </li>
      </ul>
    </div>
  );
};
