import style from "../style.module.css";

export const FirstStep = () => {
  return (
    <div className={style.step__container}>
      <div className={style.heading}>
        <h1>Welcome to GRAFT!</h1>
      </div>
      <ul className={style.list}>
        <li>
          <h6 className={style.list__heading}>Find Candidates</h6>
          <span>
            Search our database to find people with the right skills and
            qualifications for your job.
          </span>
        </li>
        <li>
          <h6 className={style.list__heading}>Buy Credits</h6>
          <span>Buy credits to contact those people directly.</span>
        </li>
        <li>
          <h6 className={style.list__heading}>Create Campaigns</h6>
          <span>
            Create SMS campaigns to contact a group of skilled candidates in a
            specific area.
          </span>
        </li>
      </ul>
    </div>
  );
};
