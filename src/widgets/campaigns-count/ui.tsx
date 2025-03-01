import { Card, CardHeader } from "shared/ui";
import headerIcon from "assets/images/jobs/Notebook.svg";
import style from "./style.module.css";
import { ChartPie } from "shared/ui/chart-pie/ChartPie";
import { ItemsPerSector } from "shared/api";
import { useGetSuggestions } from "shared/hooks";
import { useEffect, useState } from "react";

export const CampaignsCount = ({
  campaignsPerSector,
}: {
  campaignsPerSector: ItemsPerSector[] | undefined;
}) => {
  const { experience } = useGetSuggestions();

  const [hospitalityCampaigns, setHospitalityCampaigns] = useState<number>(0);
  const [constructionCampaigns, setConstructionCampaigns] = useState<number>(0);
  const [industrialCandidates, setIndustrialCandidates] = useState<number>(0);

  useEffect(() => {
    campaignsPerSector?.forEach((item) => {
      if (hospitalityCampaigns && constructionCampaigns) return;
      const sector = experience?.sectors[item.sector_id];
      if (sector?.value === "Hospitality") setHospitalityCampaigns(item.count);
      if (sector?.value === "Construction")
        setConstructionCampaigns(item.count);
      if (sector?.value === "Industrial & Driving")
        setIndustrialCandidates(item.count);
    });
  }, [campaignsPerSector, experience]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Card className={style.container}>
      <div className={style.header}>
        <CardHeader
          className={style.title}
          image={headerIcon}
          title="Campaigns"
        />
      </div>
      <ChartPie
        hospitalityNumber={hospitalityCampaigns}
        constructionNumber={constructionCampaigns}
        industrialNumber={industrialCandidates}
      />
    </Card>
  );
};
