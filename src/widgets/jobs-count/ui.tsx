import { Card, CardHeader } from "shared/ui";
import headerIcon from "assets/images/jobs/job-list.svg";
import style from "./style.module.css";
import { ChartPie } from "shared/ui/chart-pie/ChartPie";
import { useState, useEffect } from "react";
import { ItemsPerSector } from "shared/api";
import { useGetSuggestions } from "shared/hooks";

export const JobsCount = ({
  jobsPerSector,
}: {
  jobsPerSector: ItemsPerSector[] | undefined;
}) => {
  const { experience } = useGetSuggestions();

  const [hospitalityJobs, setHospitalityJobs] = useState<number>(0);
  const [constructionJobs, setConstructionJobs] = useState<number>(0);
  const [industrialCandidates, setIndustrialCandidates] = useState<number>(0);

  useEffect(() => {
    jobsPerSector?.forEach((item) => {
      if (hospitalityJobs && constructionJobs) return;
      const sector = experience?.sectors[item.sector_id];
      if (sector?.value === "Hospitality") setHospitalityJobs(item.count);
      if (sector?.value === "Construction") setConstructionJobs(item.count);
      if (sector?.value === "Industrial & Driving")
        setIndustrialCandidates(item.count);
    });
  }, [jobsPerSector, experience]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Card className={style.container}>
      <div className={style.header}>
        <CardHeader className={style.title} image={headerIcon} title="Jobs" />
      </div>
      <ChartPie
        hospitalityNumber={hospitalityJobs}
        constructionNumber={constructionJobs}
        industrialNumber={industrialCandidates}
      />
    </Card>
  );
};
