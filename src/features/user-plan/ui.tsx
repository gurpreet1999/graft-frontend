import pricingIcon from "assets/images/profile/pricing.svg";
import style from "./style.module.css";
import { CardHeader, TextXl, Card } from "shared/ui";
import { useEffect, useState } from "react";
import { BillingApi } from "shared/api";

export const UserPricingPlan = ({ user }: { user: IUser }) => {
  const { pricing_plan: currentPlan } = user.billing;
  const [pricingPlans, setPricingPlans] = useState<IPlan[]>([]);

  useEffect(() => {
    const fetchPricingPlans = async () => {
      const plans = await BillingApi.getBillingPlans();
      setPricingPlans(plans);
    };

    fetchPricingPlans();
  }, []);

  return (
    <Card className={style.container}>
      <div className={style.content}>
        <CardHeader image={pricingIcon} title="Pricing Plan" />
        <div className={style.description__wrapper}>
          <div className={style.description}>
            {user?.billing.pricing_plan.value !== "free" && (
              <div className={style.description__title}>
                <TextXl classname={style.text}>
                  {pricingPlans &&
                    pricingPlans.find(
                      (plan) => plan.value === currentPlan.value
                    )?.price}
                </TextXl>
              </div>
            )}
            <div className={style.description__text}>
              <span>{currentPlan.name}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
