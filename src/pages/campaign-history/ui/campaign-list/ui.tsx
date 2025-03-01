import { Heading } from "shared/ui";
import style from "./campaign.module.css";
import { Campaigns } from "widgets/campaigns";
import { RecruiterSteps } from "features/walkthrough/recruiter";
import { campaignSteps } from "features/walkthrough/recruiter/steps";
import classNames from "classnames";

export const CampaignList = () => {
  return (
    <div className={style.container}>
      <div className={classNames(style.onboarding, "campaign")}></div>
      <RecruiterSteps steps={campaignSteps} identifier="campaign" />
      <div className={style.header}>
        <Heading variant="h2">Campaign History</Heading>
        <p className={style.header__text}>
          Welcome to your Campaign History. Here you can see current and past
          campaigns.
        </p>
      </div>
      <Campaigns />
    </div>
  );
};
