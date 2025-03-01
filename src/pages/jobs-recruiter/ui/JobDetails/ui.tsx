import { JobHired } from "widgets/job-small-widgets/job-hired";
import style from "./jobsDetails.module.css";
import { JobDetails as Details } from "widgets/job-details";
import { JobShortlisted } from "widgets/job-small-widgets/job-shortlisted";
import { COLUMNS } from "./tables.field";

export const JobDetails = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.content__wrapper}>
        <Details />
        <JobHired columns={COLUMNS} />
      </div>
      <div className={style.shortlisted}>
        <JobShortlisted columns={COLUMNS} />
      </div>
    </div>
  );
};
