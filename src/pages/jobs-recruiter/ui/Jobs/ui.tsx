import { Heading } from "shared/ui";
import style from "./jobs.module.css";
import { CreateJobsModal } from "widgets/create-job-modal";
import { JobTable } from "widgets/jobTable";
import { useState } from "react";

export const Jobs = () => {
  const [isJobCreated, setIsJobCreated] = useState(false);
  const [choosedSector, setChoosedSector] = useState<ISuggestion | undefined>();

  const handleSectorChange = (sector: ISuggestion) => {
    setChoosedSector(sector);
  };

  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.header__wrapper}>
          <div className={style.header__info}>
            <Heading variant="h2">Jobs</Heading>
            <div className={style.header__text}>
              Welcome to your Jobs page where you can post any vacancies you’re
              currently trying to fill. Just click ‘Add new job’ to get started.
            </div>
          </div>
          <CreateJobsModal
            setIsJobCreated={setIsJobCreated}
            isJobCreated={isJobCreated}
            choosedSector={choosedSector}
          />
        </div>
        <div className={style.header__text_mob}>
          Welcome to your Jobs page where you can post any vacancies you’re
          currently trying to fill. Just click ‘Add new job’ to get started.
        </div>
      </div>
      <JobTable
        isJobCreated={isJobCreated}
        setIsJobCreated={setIsJobCreated}
        handleSectorChange={handleSectorChange}
      />
    </div>
  );
};
