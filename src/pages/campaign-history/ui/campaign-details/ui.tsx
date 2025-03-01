import style from "./campaign.module.css";
import { CandidatesTable, SmsList } from "widgets/campaign-small-tables";
import { CampaignDetails as Details } from "widgets/campaign-details";
import { CANDIDATES, SMS } from "./table.columns";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetSuggestions } from "shared/hooks";
import { CampaignApi } from "shared/api/campaign/lib";
import { normalizeCampaignDetails } from "widgets/campaign-details/helper";

export const CampaignDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [detailsData, setDetailsData] = useState<INormalizedCampaignData>();
  const { experience } = useGetSuggestions();
  const [isCampaignRepeated, setIsCampaignRepeated] = useState(false);
  const [update, setUpdate] = useState(false);
  const updateCampaignDetails = () => {
    setUpdate(!update);
  };

  useEffect(() => {
    const fetchDetails = async () => {
      if (!id || !experience) return;
      CampaignApi.getCampaignDetails(id).then((response) => {
        const normalized = normalizeCampaignDetails(response, experience);
        setDetailsData(normalized);
      });
    };
    fetchDetails();
  }, [id, experience, isCampaignRepeated, update, setIsCampaignRepeated]);

  return (
    <div className={style.container}>
      {detailsData && (
        <Details
          className={style.details__container}
          details={detailsData}
          setIsCampaignRepeated={setIsCampaignRepeated}
          isCampaignRepeated={isCampaignRepeated}
          updateCampaignDetails={updateCampaignDetails}
        />
      )}
      <div className={style.tables__container}>
        <CandidatesTable columns={CANDIDATES} />
        {detailsData && <SmsList columns={SMS} sms={detailsData.smsHistory} />}
      </div>
    </div>
  );
};
