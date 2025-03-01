import style from "./profile.module.css";
import {
  ChangePassword,
  Experience,
  Verification,
  CandidateBasicInfo,
} from "widgets";

export const ProfilePageCandidate = () => {
  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <CandidateBasicInfo />
      </div>
      <div className={style.wrapper}>
        <Experience />
      </div>
      <div className={style.wrapper}>
        <Verification />
      </div>
      <div className={style.wrapper}>
        <ChangePassword />
      </div>
    </div>
  );
};
