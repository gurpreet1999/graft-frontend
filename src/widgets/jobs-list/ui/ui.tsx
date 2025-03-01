import {
  Button,
  Card,
  CardHeader,
  EmptyState,
  SnackBar,
  TabButton,
  useTheme,
} from "shared/ui";
import style from "./jobs-list.module.css";
import { useCallback, useEffect, useState } from "react";
import { JobApi } from "shared/api";
import { JobDetailsModal } from "features/job-details";
import emptyStateAppliedAnimation from "assets/animation/AppliedJobsDark.json";
import emptyStateAppliedLightAnimation from "assets/animation/AppliedJobsLight.json";
import jobIcon from "assets/images/jobs/job-list.svg";
import classNames from "classnames";
import { CandidateSteps } from "features/walkthrough/candidate";
import { jobsSteps } from "features/walkthrough/candidate/steps";
import { Table } from "features/table";
import { JobCard } from "features/job-card/JobCard";
import { usePageWidth } from "shared/hooks";

type TabCurrent = "Listed" | "Applied";

const fetchJobFunction = async (
  currentTab: TabCurrent,
  page: number,
  rowsPerPage: number
) => {
  switch (currentTab) {
    case "Listed":
      return await JobApi.getJobsCandidate(page, rowsPerPage);
    case "Applied":
      return await JobApi.getAppliedJobs(page, rowsPerPage);
    default:
      return;
  }
};

interface IJobsList {
  hideTabs?: boolean;
  smallTable?: boolean;
}

export const JobsList = ({ hideTabs, smallTable }: IJobsList) => {
  const { theme } = useTheme();
  const width = usePageWidth();
  const [selectedJob, setSelectedJob] = useState<string>();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState<TabCurrent>("Listed");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(smallTable ? 3 : 8);
  const [jobs, setJobs] = useState<[]>();
  const [totalCount, setTotalCount] = useState(0);

  const emptyAnimation =
    theme === "light"
      ? emptyStateAppliedLightAnimation
      : emptyStateAppliedAnimation;

  const [updateFlag, setUpdateFlag] = useState(false);

  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!hideTabs && jobs) {
      setEnabled(true);
    }
  }, [jobs, hideTabs]);

  const handleShowDetails = (id: string) => {
    setSelectedJob(id);
    setDetailsOpen(true);
  };

  const applyForJob = useCallback(async (id: string) => {
    await JobApi.applyForJob(id);
    SnackBar({
      text: "You have successfully applied for the job",
      variant: "success",
    });
    setUpdateFlag((prev) => !prev);
  }, []);

  const disableApply = useCallback(async (id: string) => {
    await JobApi.declineApplication(id);
    SnackBar({
      text: "You have successfully declined the application",
      variant: "success",
    });
    setUpdateFlag((prev) => !prev);
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await fetchJobFunction(currentTab, page, rowsPerPage);
      setJobs(res.jobs || res.applications);
      setTotalCount(res.total_count);
    };
    fetchJobs();
  }, [page, rowsPerPage, currentTab, updateFlag]);

  return (
    <>
      <Card className={style.container}>
        {enabled && <CandidateSteps steps={jobsSteps} identifier="jobs" />}
        {width < 768 && (
          <CardHeader
            image={jobIcon}
            title="Results"
            className={style.header}
          />
        )}
        {hideTabs && (
          <div className={style.title}>
            <CardHeader image={jobIcon} title="Listed jobs" />
            <Button href="/jobs" variant="primary" className={style.button}>
              See more
            </Button>
          </div>
        )}
        {!hideTabs && (
          <div className={classNames(style.tabs__container, "jobsSteps")}>
            <TabButton
              tabName="Listed"
              currentTab={currentTab}
              changeTab={setCurrentTab}
              className={style.tab}
            >
              Listed jobs
            </TabButton>
            <TabButton
              tabName="Applied"
              currentTab={currentTab}
              changeTab={setCurrentTab}
              className={style.tab}
            >
              Applied jobs
            </TabButton>
          </div>
        )}
        <div className={style.tab__container}>
          {jobs && jobs.length ? (
            <Table
              data={jobs}
              currentPage={page}
              totalItems={totalCount}
              pageSize={rowsPerPage}
              handlePageChange={setPage}
              handleChangePageSize={setRowsPerPage}
              ListView={JobCard}
              columns={[]}
              className={style.table}
              showOnlyBullet={smallTable}
              resultClassName={style.result}
              additionalProps={{
                handleShowDetails,
                smallCard: smallTable,
                handleApply: applyForJob,
              }}
              dropdownClassName={style.dropdown}
              direction="bottom"
            />
          ) : (
            <>
              {currentTab === "Listed" && (
                <EmptyState
                  text={
                    <>
                      <p className="empty__bold empty__big">Hmm...</p>
                      <p>It seems like there are no open jobs for you now. </p>
                      <p className="empty__bold">Try again later.</p>
                    </>
                  }
                />
              )}
              {currentTab === "Applied" && (
                <EmptyState
                  jsonAnimation={emptyAnimation}
                  text={
                    <>
                      <p>You haven&apos;t applied to any Job posting yet. </p>
                      <p className="empty__bold">
                        Try to apply from &quot;Listed jobs&quot; tab.
                      </p>
                    </>
                  }
                />
              )}
            </>
          )}
        </div>
      </Card>
      {selectedJob && (
        <JobDetailsModal
          id={selectedJob}
          isOpen={detailsOpen}
          handleClose={() => setDetailsOpen(false)}
          handleApply={applyForJob}
          handleDecline={disableApply}
          isApply={currentTab === "Listed" ? false : true}
        />
      )}
    </>
  );
};
