import style from "./jobs.module.css";
import { Jobs } from "./Jobs";
import { JobDetails } from "./JobDetails";
import { Route, Routes } from "react-router-dom";
import { NotFoundPage } from "pages/NotFoundPage";
import { CandidatesLists } from "widgets/CandidatesLists";

export const JobsRecruiter = () => {
  return (
    <>
      <div className={style.container}>
        <Routes>
          <Route path="/" element={<Jobs />} />
          <Route path="/job-details/:id" element={<JobDetails />} />
          <Route
            path="/job-details/:id/candidates-list"
            element={<CandidatesLists />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </>
  );
};
