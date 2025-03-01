import { Routes, Route } from "react-router-dom";
import style from "./campaign.module.css";
import { CampaignList } from "./campaign-list/ui";
import { CampaignDetails } from "./campaign-details/ui";
import { NotFoundPage } from "pages/NotFoundPage";

export const CampaignHistory = () => {
  return (
    <div className={style.container}>
      <Routes>
        <Route path="/" element={<CampaignList />} />
        <Route path="details/:id" element={<CampaignDetails />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};
