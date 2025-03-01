import { Heading } from "shared/ui";
import style from "./style.module.css";
import { useGetCurrentUser, usePageWidth } from "shared/hooks";
import { JobsList } from "widgets/jobs-list";
import { CandidateBasicInfo } from "widgets";
import { useEffect, useState } from "react";
import { CandidateSteps } from "features/walkthrough/candidate";
import { dashboardSteps } from "features/walkthrough/candidate/steps";

export const DashboardCandidate = () => {
  return <Layout />;
};

export const Layout = () => {
  const width = usePageWidth();
  const { userData } = useGetCurrentUser();
  const [smallTable, setSmallTable] = useState(width > 1024);

  useEffect(() => {
    const handleResize = () => {
      setSmallTable(window.innerWidth > 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={style.container}>
      <CandidateSteps steps={dashboardSteps} identifier="dashboard" />
      <div className={style.header}>
        <Heading variant="h2">
          👋 Hi, {userData?.first_name} {userData?.last_name}
        </Heading>
        <div className={style.subtitle}>
          Here is what we have for you today:
        </div>
      </div>
      <div className={style.wrapper}>
        <div className={style.info}>
          <CandidateBasicInfo />
        </div>
        <div className={style.table}>
          <JobsList hideTabs smallTable={smallTable} />
        </div>
      </div>
    </div>
  );
};
