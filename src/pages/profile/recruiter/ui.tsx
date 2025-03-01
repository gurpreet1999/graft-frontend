import { Balance } from "widgets/balance";
import style from "./profile.module.css";
import { ChangePassword, RecruiterBasicInfo } from "widgets";
import { PricingPlan } from "widgets/plan";
import classNames from "classnames";
import { RecruiterSteps } from "features/walkthrough/recruiter";
import { profileSteps } from "features/walkthrough/recruiter/steps";

export const ProfilePageRecruiter = () => {
  return (
    <div className={classNames(style.container, "profile")}>
      <RecruiterSteps steps={profileSteps} identifier="profile" />
      <div className={style.content__wrapper}>
        <div className={style.wrapper}>
          <RecruiterBasicInfo />
        </div>
        <div className={style.wrapper}>
          <ChangePassword />
        </div>
        <div className={style.wrapper}>
          <Balance />
        </div>
        <div className={style.wrapper}>
          <PricingPlan />
        </div>
      </div>
    </div>
  );
};
