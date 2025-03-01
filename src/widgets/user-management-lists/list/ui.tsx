import { GradientCard } from "shared/ui";
import style from "./style.module.css";
import classNames from "classnames";
import checkIcon from "assets/images/CheckCircle.svg";

const getRoleTitle = (sector: string) => {
  if (sector === "Hospitality") {
    return "1st Role Preference";
  }
  return "Role";
};

export const List = (listData: any) => {
  const { data, sector } = listData;
  return (
    <GradientCard className={style.container}>
      <div className={style.header}>
        {data.fullName}
        {data.status && data.status.props.status === "Verified" && (
          <img src={checkIcon} alt="verified" />
        )}
        <div className={style.actions}>{data.actions}</div>
      </div>
      <div className={style.body}>
        <div className={style.wrapper}>
          <div className={style.item}>
            <span>Email</span>
            {data.email}
          </div>
          {data.pricingPlan && (
            <div className={style.item}>
              <span>Phone Number</span>
              {data.phone}
            </div>
          )}
          {data.role && (
            <div className={style.item}>
              <span>Role</span>
              {data.role}
            </div>
          )}
        </div>
        {data.pricingPlan && (
          <div className={classNames(style.wrapper, style.footer)}>
            <div className={style.item}>
              <span>Pricing Plan</span>
              {data.pricingPlan}
            </div>
            <div className={style.item}>
              <span>Credits</span>
              {data.credits}
            </div>
            <div className={style.item}>
              <span>Jobs</span>
              {data.jobsPosted}
            </div>
          </div>
        )}
        {data.status && (
          <div className={classNames(style.wrapper, style.footer)}>
            <div className={style.item}>
              <span>Phone Number</span>
              {data.phone}
            </div>
            <div className={style.item}>
              <span>{getRoleTitle(sector)}</span>
              {data.firstJobPreference}
            </div>
          </div>
        )}
      </div>
    </GradientCard>
  );
};
