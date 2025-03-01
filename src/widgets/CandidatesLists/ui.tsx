import { Card, CardHeader, TabButton, useTheme } from "shared/ui";
import style from "./CandidatesList.module.css";
import { useEffect, useState } from "react";
import headerIcon from "assets/images/jobs/user-list.svg";
import { Table } from "features/table";
import { CandidatesData, CandidatesTabs } from "./lib/lib";
import { useParams } from "react-router-dom";
import { useGetSuggestions, usePageWidth } from "shared/hooks";
import { getColumns } from "./lib/table.list";
import { JobDetailsClass } from "features/job-details";
import { CreateCampaign } from "features/create-campaign/ui/ui";
import classNames from "classnames";
import { getEmptyState } from "./lib/helpers";

export const CandidatesLists = () => {
  const width = usePageWidth();
  const { theme } = useTheme();
  const [currentTab, setCurrentTab] = useState<CandidatesTabs>("Matches");
  const [candidates, setCandidates] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [job, setJob] = useState<INormalizedJobData>();

  const { experience } = useGetSuggestions();

  const { id: jobId } = useParams<{ id: string }>();

  const handlePageChange = (page: number, totalPage: number) => {
    if (page > totalPage) return;
    setCurrentPage(page);
  };

  useEffect(() => {
    if (!jobId || !experience) return;
    const fetchData = async () => {
      const res: INormalizedJobData = await JobDetailsClass.getJobDetailsData(
        jobId,
        experience
      );
      setJob(res);
    };

    fetchData();
  }, [jobId, experience]);

  useEffect(() => {
    const fetchData = async () => {
      if (!jobId || !experience || !job) return;
      const res = await CandidatesData.getCandidatesCells(
        jobId,
        currentTab,
        pageSize,
        currentPage,
        experience,
        job,
        fetchData
      );
      const { candidates, totalCount } = res;
      setCandidates(candidates);
      setTotalCount(totalCount);
    };
    fetchData();
  }, [currentTab, jobId, experience, pageSize, currentPage, job]);

  return (
    <Card className={style.container}>
      <div className={style.header}>
        <CardHeader image={headerIcon} title="Candidates list" />
      </div>
      <div className={style.action__buttons}>
        <div className={style.tabs__container}>
          <TabButton
            tabName="Matches"
            currentTab={currentTab}
            changeTab={setCurrentTab}
          >
            Matches
          </TabButton>
          <TabButton
            tabName="Applied"
            currentTab={currentTab}
            changeTab={setCurrentTab}
          >
            Applied
          </TabButton>
          <TabButton
            tabName="Shortlisted"
            currentTab={currentTab}
            changeTab={setCurrentTab}
          >
            Shortlisted
          </TabButton>
          <TabButton
            tabName="Hired"
            currentTab={currentTab}
            changeTab={setCurrentTab}
          >
            Hired
          </TabButton>
        </div>
        <CreateCampaign
          from="jobs"
          jobId={jobId}
          candidatesFound={totalCount}
          jobVariant={currentTab}
        />
      </div>
      {job && (
        <Table
          columns={getColumns(job?.sector)[currentTab]}
          data={candidates}
          pageSize={pageSize}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          handleChangePageSize={setPageSize}
          totalItems={totalCount}
          className={style.table}
          resultClassName={classNames(
            style.result__container,
            currentTab === "Hired" && style._hired
          )}
          dropdownClassName={classNames(
            style.dropdown,
            currentTab === "Hired" && style._hired
          )}
          direction={width < 768 ? "bottom" : "top"}
          emptyState={getEmptyState(currentTab, theme)}
        />
      )}
    </Card>
  );
};
