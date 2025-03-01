/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { Button, Card, CardHeader, TabButton } from "shared/ui";
import { Table } from "features/table";
import { JobApi } from "shared/api";
import { useGetSuggestions, usePageWidth } from "shared/hooks";
import { emptyState, getTableRows } from "./helpers";
import { COLUMNS, COLUMNS_CONSTRUCTION } from "./table.fields";
import jobsIcon from "assets/images/jobs/job-list.svg";
import style from "./jobTable.module.css";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { RecruiterSteps } from "features/walkthrough/recruiter";
import { jobsSteps } from "features/walkthrough/recruiter/steps";

interface IJobTableProps {
  isJobCreated: boolean;
  setIsJobCreated: (value: boolean) => void;
  hidePagination?: boolean;
  hideTabs?: boolean;
  handleSectorChange?: (sector: ISuggestion) => void;
}

export const JobTable = ({
  isJobCreated,
  setIsJobCreated,
  hidePagination,
  hideTabs,
  handleSectorChange,
}: IJobTableProps) => {
  const width = usePageWidth();
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [jobsRows, setJobsRows] = useState<JobRow[]>([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { experience, suggestions } = useGetSuggestions();
  const [currentTab, setCurrentTab] = useState<ISuggestion | null>(null);
  const [enabled, setEnabled] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    if (suggestions) {
      setCurrentTab(suggestions.sectors[0]);
    }
  }, [suggestions]);

  const handleDetails = useCallback(
    (id: string) => {
      nav(`/jobs/job-details/${id}`);
    },
    [nav]
  );

  const handleDelete = () => {};

  useEffect(() => {
    const fetchJobs = async (
      pageSize: number,
      currentPage: number,
      currentTab: ISuggestion
    ) => {
      if (!experience) return;
      let res = await JobApi.getJobsRecruiter(
        pageSize,
        currentPage,
        currentTab.id
      );
      if (hideTabs && hidePagination) {
        const secondSectorsId = suggestions?.sectors.filter(
          (sector) => sector.id !== currentTab.id
        );

        if (secondSectorsId) {
          await Promise.all(
            secondSectorsId.map((sector) =>
              JobApi.getJobsRecruiter(pageSize, currentPage, sector.id)
            )
          ).then((data) => {
            const newRes = data.reduce((acc, curr) => {
              return {
                jobs: [...acc.jobs, ...curr.jobs],
                total_count: acc.total_count + curr.total_count,
              };
            }, res);

            res = newRes;
          });
        }
      } else {
        setEnabled(true);
      }
      const rows = getTableRows({
        jobs: res.jobs,
        handleDelete,
        handleDetails,
        experience,
      });
      setJobsRows(rows);
      setTotalCount(res.total_count);
      setIsLoading(true);
    };
    if (currentTab) {
      fetchJobs(pageSize, currentPage, currentTab);
    }
  }, [
    pageSize,
    currentPage,
    currentTab,
    experience,
    handleDetails,
    isJobCreated,
  ]);

  const handlePageChange = (page: number, totalPage: number) => {
    if (page !== currentPage && page > 0 && page <= totalPage) {
      setCurrentPage(page);
    }
  };

  const handleChangePageSize = (size: number) => setPageSize(size);

  const commonProps = {
    pageSize,
    currentPage,
    handlePageChange,
    handleChangePageSize,
    totalItems: totalCount,
  };

  return (
    <>
      {enabled && (
        <>
          <div className={classNames(style.onboarding, "jobs")}></div>
          <RecruiterSteps steps={jobsSteps} identifier="jobs" />
        </>
      )}
      <Card
        className={classNames(
          style.container,
          hidePagination && hideTabs && style.small
        )}
      >
        <div className={style.header}>
          <CardHeader image={jobsIcon} title="Listed jobs" />
          {hidePagination && hideTabs && (
            <Button href="/jobs" variant="primary" className={style.button}>
              See more
            </Button>
          )}
        </div>
        {currentTab && suggestions && !hideTabs && (
          <div className={style.tabs__container}>
            {suggestions.sectors.map((sector) => (
              <TabButton
                key={sector.id}
                tabName={sector.value}
                currentTab={currentTab.value}
                changeTab={() => {
                  setCurrentTab(sector);
                  handleSectorChange && handleSectorChange(sector);
                }}
              >
                {sector.value}
              </TabButton>
            ))}
          </div>
        )}
        {isLoading && (
          <div className={style.table__container}>
            <Table
              columns={
                currentTab?.value === "Hospitality"
                  ? COLUMNS
                  : COLUMNS_CONSTRUCTION
              }
              data={jobsRows}
              className={classNames(
                hidePagination && hideTabs ? style.table__sm : style.table
              )}
              showPagination={!hidePagination}
              resultClassName={style.result}
              dropdownClassName={style.dropdown}
              paginationClassName={style.pagination}
              {...commonProps}
              direction={width < 768 ? "bottom" : "top"}
              emptyState={emptyState(isJobCreated, setIsJobCreated)}
            />
          </div>
        )}
      </Card>
    </>
  );
};
