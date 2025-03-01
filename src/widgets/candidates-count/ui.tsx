import { Card, CardHeader } from "shared/ui";
import headerIcon from "assets/images/dashboard/UserCount.svg";
import style from "./style.module.css";
import { ChartPie } from "shared/ui/chart-pie/ChartPie";
import { ItemsPerSector } from "shared/api";
import { useGetSuggestions } from "shared/hooks";
import { useEffect, useState } from "react";
import { UsersByRoleModal } from "features/users-by-role-modal";

export const CandidatesCount = ({
  candidatePerSector,
}: {
  candidatePerSector: ItemsPerSector[] | undefined;
}) => {
  const { experience } = useGetSuggestions();
  const [sectorForDetails, setSectorForDetails] = useState<string>("");
  const [candidatesCount, setCandidatesCount] = useState<number>(0);
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
  const [hospitalityCandidates, setHospitalityCandidates] = useState<number>(0);
  const [constructionCandidates, setConstructionCandidates] =
    useState<number>(0);
  const [industrialCandidates, setIndustrialCandidates] = useState<number>(0);

  useEffect(() => {
    candidatePerSector?.forEach((item) => {
      if (hospitalityCandidates && constructionCandidates) return;
      const sector = experience?.sectors[item.sector_id];
      if (sector?.value === "Hospitality") setHospitalityCandidates(item.count);
      if (sector?.value === "Construction")
        setConstructionCandidates(item.count);
      if (sector?.value === "Industrial & Driving")
        setIndustrialCandidates(item.count);
    });
  }, [candidatePerSector, experience]); // eslint-disable-line react-hooks/exhaustive-deps

  const openDetails = (sector: string) => {
    switch (sector) {
      case "Hospitality":
        setCandidatesCount(hospitalityCandidates);
        break;
      case "Construction":
        setCandidatesCount(constructionCandidates);
        break;
      case "Industrial & Driving":
        setCandidatesCount(industrialCandidates);
        break;
      default:
        break;
    }

    setSectorForDetails(sector);
    setIsDetailsOpen(true);
  };

  return (
    <Card className={style.container}>
      <div className={style.header}>
        <CardHeader
          className={style.title}
          image={headerIcon}
          title="Candidates"
        />
      </div>
      <ChartPie
        hospitalityNumber={hospitalityCandidates}
        constructionNumber={constructionCandidates}
        industrialNumber={industrialCandidates}
        detailsOnClick={openDetails}
      />
      <UsersByRoleModal
        sector={sectorForDetails}
        isOpen={isDetailsOpen}
        setIsOpen={() => setIsDetailsOpen(false)}
        totalCount={candidatesCount}
      />
    </Card>
  );
};
