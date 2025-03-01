import { Card, CardHeader } from "shared/ui";
import style from "./SmsList.module.css";
import userListIcon from "assets/images/jobs/user-list.svg";
import { Table } from "features/table";
import { useEffect, useState } from "react";
import { Column } from "react-table";

interface ISmsListProps {
  columns: Column[];

  sms: ICampaignSmsHistory[];
}

const pageSize = 3;

export const SmsList = ({ columns, sms }: ISmsListProps) => {
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(sms.length);
  const [data, setData] = useState<ICampaignSmsHistory[]>([]);

  useEffect(() => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentPageData = sms.slice(startIndex, endIndex);
    setData(currentPageData);
    setTotalItems(sms.length);
  }, [sms, page]);

  return (
    <Card className={style.container}>
      <div className={style.header}>
        <CardHeader title="SMS history" image={userListIcon} />
      </div>
      <Table
        columns={columns}
        data={data}
        pageSize={pageSize}
        currentPage={page}
        totalItems={totalItems}
        handlePageChange={(selected) => {
          setPage(selected);
        }}
        handleChangePageSize={() => {}}
        showOnlyBullet={true}
        className={style.table}
        paginationClassName={style.pagination}
      />
    </Card>
  );
};
