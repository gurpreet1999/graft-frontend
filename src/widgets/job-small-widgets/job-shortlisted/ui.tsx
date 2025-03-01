import { Button, Card, CardHeader, useTheme } from "shared/ui";
import style from "./jobShortlisted.module.css";
import userListIcon from "assets/images/jobs/user-list.svg";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetSuggestions } from "shared/hooks";
import { JobApi } from "shared/api";
import { Table } from "features/table";
import { getTableRows } from "../helper";
import { Column } from "react-table";
import { getNoShortlistedEmptyState } from "widgets/CandidatesLists/lib/helpers";
import emptyStateMatchesAnimation from "assets/animation/emptyShortlistedDark.json";
import emptyStateMatchesLightAnimation from "assets/animation/emptyShortlistedLight.json";

interface IJobShortlisted {
  columns: Column[];
}

export const JobShortlisted = ({ columns }: IJobShortlisted) => {
  const { id } = useParams<{ id: string }>();
  const { theme } = useTheme();
  const emptyAnimation =
    theme === "light"
      ? emptyStateMatchesLightAnimation
      : emptyStateMatchesAnimation;
  const [candidates, setCandidates] = useState<
    {
      nameAndRole: JSX.Element;
      yearsExperience: string;
      postcode: string;
      phone: JSX.Element;
    }[]
  >([]);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const { experience } = useGetSuggestions();

  useEffect(() => {
    if (!id || !experience) return;
    const fetchData = async () => {
      const res = await JobApi.getShortlistedCandidates(
        id,
        page,
        pageSize
      ).then((res) => {
        return {
          candidates: getTableRows({
            candidates: res.candidates,
            experience,
          }),
          totalCount: res.totalCount,
        };
      });
      if (!res || !res.candidates === null) return;
      const { candidates, totalCount } = res;
      setCandidates(candidates);
      setTotalItems(totalCount);
    };

    fetchData();
  }, [id, page, pageSize, experience]);

  return (
    <Card className={style.container}>
      <div className={style.header}>
        <CardHeader title="Shortlisted" image={userListIcon} />
        <div className={style.header__button}>
          <Link to={"candidates-list"}>
            <Button variant="primary" className={style.button}>
              See More
            </Button>
          </Link>
        </div>
      </div>
      <Table
        columns={columns}
        data={candidates}
        pageSize={pageSize}
        currentPage={page}
        totalItems={totalItems}
        handlePageChange={(selected) => {
          setPage(selected);
        }}
        handleChangePageSize={(size) => {
          setPageSize(size);
        }}
        showOnlyBullet={true}
        className={style.table}
        emptyState={getNoShortlistedEmptyState(emptyAnimation)}
      />
    </Card>
  );
};
