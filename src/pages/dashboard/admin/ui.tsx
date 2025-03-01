import { Heading } from "shared/ui";
import style from "./style.module.css";
import { ClientsCount } from "widgets/clients-count";
import { CandidatesCount } from "widgets/candidates-count";
import { CampaignsCount } from "widgets/campaigns-count";
import { JobsCount } from "widgets/jobs-count";
import { useEffect, useState } from "react";
import { DashboardData, UserManagementApi } from "shared/api";
import { RevenueStatsChart } from "widgets/revenue";

const Layout = () => {
  const [data, setData] = useState<DashboardData>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await UserManagementApi.getDashboardData();
      setData(res);
    };
    fetchData();
  }, []);

  return (
    <div className={style.container}>
      <div className={style.header}>
        <Heading variant="h2">Dashboard</Heading>
        <div className={style.subtitle}>
          Here is what we have for you today:
        </div>
      </div>
      <div className={style.wrapper}>
        {data && <ClientsCount clients={data.clients} />}
        {data && (
          <CandidatesCount candidatePerSector={data.candidates_per_sector} />
        )}
      </div>
      <div className={style.wrapper}>
        {data && (
          <CampaignsCount campaignsPerSector={data.campaigns_per_sector} />
        )}
        {data && <JobsCount jobsPerSector={data.jobs_per_sector} />}
      </div>
      <RevenueStatsChart />
    </div>
  );
};

export const DashboardAdmin = () => {
  return <Layout />;
};
