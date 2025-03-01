import { Swiper, SwiperSlide } from "swiper/react";
import style from "./style.module.css";
import { Button, Card, CardHeader, Heading } from "shared/ui";
import { Navigation, Pagination } from "swiper/modules";
import { useEffect, useState } from "react";
import { BillingApi } from "shared/api";
import "swiper/css/navigation";

import free from "assets/images/profile/pricing/free.svg";
import small from "assets/images/profile/pricing/small.svg";
import medium from "assets/images/profile/pricing/medium.svg";
import big from "assets/images/profile/pricing/big.svg";
import check from "assets/images/profile/pricing/check.svg";
import classNames from "classnames";

const images = {
  free: free,
  small_crew: small,
  medium_crew: medium,
  big_house: big,
};

interface IPlansSlider {
  setPlanToBuy: (plan: IPlan) => void;
  setStep: (value: number) => void;
  setClientSecret: (value: string) => void;
  step: number;
}

export const PlansSlider = ({
  setStep,
  step,
  setPlanToBuy,
  setClientSecret,
}: IPlansSlider) => {
  const [plans, setPlans] = useState<IPlan[]>([]);
  const [choosedPlanIndex, setChoosedPlanIndex] = useState<number>(1);

  const handleChoosePlan = async () => {
    const planToBuy = plans[choosedPlanIndex];
    setPlanToBuy(planToBuy);
    BillingApi.getSetupIntentForTrial(planToBuy.id).then((res) => {
      if (res) setClientSecret(res.client_secret);
    });
    setStep(step + 1);
  };

  useEffect(() => {
    BillingApi.getBillingPlans().then((plans) => {
      setPlans(plans.filter((plan) => plan.value !== "free"));
    });
  }, []);

  return (
    <div className={style.container}>
      <Heading variant="h1" className={style.heading}>
        If you’re sick of using Facebook groups and Indeed to fill jobs, start
        your 7 day free trial today...
      </Heading>
      <Swiper
        slidesPerView={"auto"}
        className={classNames(style.swiper, "swiper-trial")}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Pagination, Navigation]}
        centeredSlides={true}
        initialSlide={choosedPlanIndex}
        onSlideChange={(swiper) => setChoosedPlanIndex(swiper.realIndex)}
      >
        {plans.map((plan) => {
          const {
            name,
            price,
            description,
            pricing_plan_features: features,
            credits_included: bonusCredits,
            price_per_credit: creditsPrice,
            value,
          } = plan;
          return (
            <SwiperSlide key={plan.name} className={style.slide__container}>
              {({ isActive }) => (
                <Card
                  className={classNames(
                    style.slide,
                    isActive && style.active__slide
                  )}
                >
                  <CardHeader
                    image={images[value]}
                    title={name}
                    className={style.header}
                  />
                  <div className={style.price}>
                    <span
                      className={classNames(
                        style.text__big,
                        style.text__big_decor
                      )}
                    >
                      {price}
                    </span>
                  </div>
                  <ul className={style.features}>
                    {bonusCredits && (
                      <li className={style.feature__item}>
                        <img src={check} alt="check" />
                        <span>{bonusCredits} Contacts included</span>
                      </li>
                    )}
                    {creditsPrice ? (
                      <li className={style.feature__item}>
                        <img src={check} alt="check" />
                        <span>{creditsPrice}£ Per Additional Contact</span>
                      </li>
                    ) : (
                      <li className={style.feature__item}>
                        <img src={check} alt="check" />
                        <span>Custom Bonus</span>
                      </li>
                    )}
                    {description && (
                      <li className={style.feature__item}>
                        <img src={check} alt="check" />
                        <span>{description}</span>
                      </li>
                    )}
                    {features &&
                      features.length > 0 &&
                      features.map((feature) => (
                        <li className={style.feature__item} key={`${feature}`}>
                          <img src={check} alt="check" />
                          <span>{feature}</span>
                        </li>
                      ))}
                  </ul>
                </Card>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className={style.button__container}>
        <Button type="button" onClick={handleChoosePlan}>
          Proceed to payment
        </Button>
        <ul className={style.list}>
          <li className={style.list__item}>
            * Free trial includes{" "}
            {plans ? plans[choosedPlanIndex]?.credits_included : "750"} credits.
          </li>
          <li className={style.list__item}>
            * Payment will be proceeded after free trial expires.
          </li>
        </ul>
      </div>
    </div>
  );
};
