import { Card, CardHeader } from "shared/ui";
import style from "./Plan.module.css";
import classNames from "classnames";
import check from "assets/images/profile/pricing/check.svg";
import free from "assets/images/profile/pricing/free.svg";
import small from "assets/images/profile/pricing/small.svg";
import medium from "assets/images/profile/pricing/medium.svg";
import big from "assets/images/profile/pricing/big.svg";
import { renderButton } from "./lib/helpers";

interface IPlanProps {
  plan: IPlan;
  current?: IPlan;
  handleChoosePlan: (plan: IPlan) => void;
}

const images = {
  free: free,
  small_crew: small,
  medium_crew: medium,
  big_house: big,
};

export const Plan = ({ plan, current, handleChoosePlan }: IPlanProps) => {
  const {
    name,
    price,
    pricing_plan_features: features,
    credits_included: bonusCredits,
    price_per_credit: creditsPrice,
    value,
  } = plan;

  if (value === "free") return null;

  return (
    <Card className={style.container}>
      <div className={style.plan__info}>
        <CardHeader image={images[value]} title={name} />
        <div className={style.price}>
          <span className={classNames(style.text__big, style.text__big_decor)}>
            {price}
          </span>
        </div>
        <ul className={style.features}>
          {features &&
            features.length > 0 &&
            features.map((feature) => (
              <li className={style.feature__item} key={`${feature}`}>
                <img src={check} alt="check" />
                <span>{feature}</span>
              </li>
            ))}
          {bonusCredits && (
            <li className={style.feature__item}>
              <img src={check} alt="check" />
              <span>{bonusCredits} Credits included</span>
            </li>
          )}
          {creditsPrice ? (
            <li className={style.feature__item}>
              <img src={check} alt="check" />
              <span>{creditsPrice}£ Per Bonus Credit</span>
            </li>
          ) : (
            <li className={style.feature__item}>
              <img src={check} alt="check" />
              <span>Custom Bonus</span>
            </li>
          )}
        </ul>
      </div>
      <div className={style.button__container}>
        {renderButton(price, current, handleChoosePlan, plan, style)}
      </div>
    </Card>
  );
};
