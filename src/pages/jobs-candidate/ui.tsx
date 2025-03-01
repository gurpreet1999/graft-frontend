import { Heading } from "shared/ui";
import style from "./jobsCandidate.module.css";
import { JobsList } from "widgets/jobs-list";

export const JobsCandidate = () => {
  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.header__wrapper}>
          <div className={style.header__info}>
            <Heading variant="h2">Jobs</Heading>
            <div className={style.header__text}>
              Welcome to your Job page. Here you can find all the open vacancies
              that match your skills and experience. If there aren’t any, don’t
              worry, employers will message you by SMS for suitable positions
            </div>
          </div>
        </div>
      </div>
      <JobsList />
    </div>
  );
};
