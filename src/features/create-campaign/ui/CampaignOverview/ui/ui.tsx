import { useGetSuggestions } from "shared/hooks";
import {
  renderCampaignInfo,
  renderHospitalityJobInfo,
  renderConstructionJobInfo,
  renderIndustrialJobInfo,
} from "./renderFunctions"; // Adjust path as per your file structure

interface ICampaignOverviewProps {
  searchFields?: {
    sector: ISuggestion;
    fields: Partial<ISearchForms>;
  };
  prevCampaign?: INormalizedCampaignData;
  companyName?: string;
}

export const CampaignOverview = ({
  searchFields,
  prevCampaign,
  companyName,
}: ICampaignOverviewProps) => {
  const { experience } = useGetSuggestions();
  return (
    <div>
      {companyName && renderCampaignInfo(prevCampaign, companyName)}
      {renderHospitalityJobInfo(searchFields, experience)}
      {renderConstructionJobInfo(searchFields, experience)}
      {renderIndustrialJobInfo(searchFields, experience)}
    </div>
  );
};
