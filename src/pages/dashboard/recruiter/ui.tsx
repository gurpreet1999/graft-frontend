import { Heading } from "shared/ui";
import style from "./style.module.css";
import { Balance } from "widgets/balance";
import { PricingPlan } from "widgets/plan";
import { JobTable } from "widgets/jobTable";
import classNames from "classnames";
import { InvoicesTable } from "widgets/invoices-table";
import { RecruiterSteps } from "features/walkthrough/recruiter";
import { dashboardSteps } from "features/walkthrough/recruiter/steps";

import { useState } from "react";

const Layout = () => {
  const [isJobCreated, setIsJobCreated] = useState(false);

  return (
    <div className={style.container}>
      <div className={classNames(style.highlight, "dashboard")} />
      <RecruiterSteps steps={dashboardSteps} identifier="dashboard" />
      <div className={style.header}>
        <Heading variant="h2">Dashboard</Heading>
        <div className={style.subtitle}>
          Welcome to your GRAFT dashboard. Here you’ll find the plan you’re on,
          the amount of credits you have, your listed jobs, and your invoices.
        </div>
      </div>
      <div className={style.wrapper}>
        <Balance redirectRoute="/" className="balance" />
        <PricingPlan className="pricing" />
      </div>
      <div className={classNames(style.wrapper, style.tables)}>
        <JobTable
          hidePagination
          hideTabs
          isJobCreated={isJobCreated}
          setIsJobCreated={setIsJobCreated}
        />
        <InvoicesTable hideFilters hideTabs hidePagination showTitle />
      </div>
    </div>
  );
};

export const DashboardRecruiter = () => {
  return <Layout />;
};
