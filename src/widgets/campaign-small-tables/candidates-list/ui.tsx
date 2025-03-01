import { Card, CardHeader, useTheme } from "shared/ui";
import style from "./canidatesList.module.css";
import userListIcon from "assets/images/jobs/user-list.svg";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CampaignApi } from "shared/api/campaign/lib";
import { Table } from "features/table";
import { getTableRows } from "../helper";
import { useGetSuggestions } from "shared/hooks";
import { Column } from "react-table";
import { getNoMatchesEmptyState } from "widgets/CandidatesLists/lib/helpers";
import emptyStateMatchesAnimation from "assets/animation/emptyShortlistedDark.json";
import emptyStateMatchesLightAnimation from "assets/animation/emptyShortlistedLight.json";

interface ICandidatesTableProps {
  columns: Column[];
}

type CandidateRow = {
  nameAndRole: JSX.Element;
  yearsExperience: string;
  establishment: string;
  postcode: string;
};

export const CandidatesTable = ({ columns }: ICandidatesTableProps) => {
  const { id } = useParams<{ id: string }>();
  const { experience } = useGetSuggestions();
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [candidates, setCandidates] = useState<CandidateRow[]>([]);
  const { theme } = useTheme();
  const emptyAnimation =
    theme === "light"
      ? emptyStateMatchesLightAnimation
      : emptyStateMatchesAnimation;

  useEffect(() => {
    if (!id || !experience) return;
    const fetchData = async () => {
      const res = await CampaignApi.getCampaignCandidates(id, page, 5);
      setCandidates(
        getTableRows({
          candidates: res.candidates,
          experience,
        })
      );
      setTotalItems(res.total_count);
    };

    fetchData();
  }, [id, experience, page]);

  return (
    <Card className={style.container}>
      <div className={style.header}>
        <CardHeader title="Candidates List" image={userListIcon} />
      </div>
      <Table
        columns={columns}
        data={candidates}
        pageSize={5}
        currentPage={page}
        totalItems={totalItems}
        handlePageChange={(selected) => {
          setPage(selected);
        }}
        handleChangePageSize={() => {}}
        showOnlyBullet={true}
        className={style.table}
        paginationClassName={style.pagination}
        emptyState={getNoMatchesEmptyState(emptyAnimation)}
      />
    </Card>
  );
};
