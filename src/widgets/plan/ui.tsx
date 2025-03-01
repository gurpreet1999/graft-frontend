import { Card, CardHeader, Button, TextXl, Modal } from "shared/ui";
import pricingIcon from "assets/images/profile/pricing.svg";
import style from "./plan.module.css";
import { useEffect, useState } from "react";
import { Plan } from "features/plan";
import { useGetCurrentUser, usePageWidth } from "shared/hooks";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { BillingApi } from "shared/api";
import { Pricing } from "./lib";
import classNames from "classnames";

export const PricingPlan = ({ className }: { className?: string }) => {
  const { userData } = useGetCurrentUser();
  const width = usePageWidth();
  const [open, setOpen] = useState(false);
  const [plans, setPlans] = useState<IPlan[]>([]);
  const [currentPlan, setCurrentPlan] = useState<IPlan>();
  const [updateData, setUpdateData] = useState(false);

  useEffect(() => {
    if (!userData || !plans.length) return;
    setCurrentPlan(
      Pricing.getCurrentPlanInfo(userData?.billing.pricing_plan.name, plans)
    );
  }, [plans, userData, updateData]);

  const handleChoosePlan = async (planForBuy: IPlan) => {
    await Pricing.changePlan(planForBuy, currentPlan?.price);
    setUpdateData(!updateData);
  };

  useEffect(() => {
    BillingApi.getBillingPlans().then((plans) => {
      setPlans(plans);
    });
  }, []);

  const handleOpenModal = () => {
    setOpen(true);
  };

  return (
    <Card className={classNames(style.container, className)}>
      <div className={style.content}>
        <CardHeader image={pricingIcon} title="Pricing Plan" />
        <div className={style.description__wrapper}>
          <div className={style.description}>
            {userData?.billing.pricing_plan.value && (
              <div className={style.description__title}>
                {currentPlan && (
                  <TextXl classname={style.text}>{currentPlan.price}</TextXl>
                )}
              </div>
            )}
            <div className={style.description__text}>
              <span>{userData?.billing.pricing_plan.name}</span>
            </div>
            {userData && userData.billing.subscription_ends_at !== null && (
              <span className={style.renews}>
                Renews (
                {new Date(
                  userData.billing.subscription_ends_at
                ).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
                )
              </span>
            )}
          </div>
        </div>
      </div>
      <div className={style.button}>
        <Button variant="primary" onClick={handleOpenModal}>
          Update Plan
        </Button>
        <div className={style.description__title_sm}>
          <TextXl classname={style.text}>{currentPlan?.price}</TextXl>
        </div>
      </div>
      <Modal title="Upgrade Plan" open={open} onClose={() => setOpen(false)}>
        <ul className={style.plan__list}>
          {width > 1320 ? (
            plans.map((plan) => (
              <Plan
                plan={plan}
                current={currentPlan}
                handleChoosePlan={handleChoosePlan}
                key={plan.id}
              />
            ))
          ) : (
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              className={style.swiper}
              pagination={{ clickable: true }}
              modules={[Pagination]}
            >
              {plans.map((plan) => {
                if (plan.value === "free") return null;
                return (
                  <SwiperSlide key={plan.name}>
                    <Plan
                      plan={plan}
                      current={currentPlan}
                      handleChoosePlan={handleChoosePlan}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}
        </ul>
      </Modal>
    </Card>
  );
};
