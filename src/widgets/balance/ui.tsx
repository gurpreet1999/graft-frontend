import { Card, CardHeader, Button, TextXl } from "shared/ui";
import balanceIcon from "assets/images/profile/balance.svg";
import buyIcon from "assets/images/profile/buy.svg";
import style from "./balance.module.css";
import { BuyCreditsModal } from "features/buy-credit-modal";
import { useEffect, useState } from "react";
import { AuthApi } from "shared/api";
import classNames from "classnames";

const getDaysUntilTrialEnds = (trialEndDate: string): number => {
  const trialEnd = new Date(trialEndDate);
  const today = new Date();
  const timeDifference = trialEnd.getTime() - today.getTime();
  return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
};

export const Balance = ({
  redirectRoute = "/profile",
  className,
}: {
  redirectRoute?: string;
  className?: string;
}) => {
  const [userData, setUserData] = useState<IUser | null>(null);

  const [daysUntilTrialEnds, setDaysUntilTrialEnds] = useState<number>(0);

  const [open, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(true);
  };

  useEffect(() => {
    AuthApi.fetchUser().then((res) => setUserData(res));
  }, []);

  useEffect(() => {
    if (!userData?.billing?.trial_ends_at) return;
    const days = getDaysUntilTrialEnds(userData.billing.trial_ends_at);
    setDaysUntilTrialEnds(days);
  }, [userData]);

  return (
    <Card className={classNames(style.container, className)}>
      <div className={style.content}>
        <div className={style.wrapper}>
          <CardHeader image={balanceIcon} title="Balance" />
        </div>
        <div className={style.wrapper}>
          <div className={style.description}>
            <div className={style.description__title}>
              <TextXl>{userData?.billing?.credits}</TextXl>
              <span>Credits</span>
            </div>
          </div>
        </div>
      </div>
      <div className={style.button}>
        {daysUntilTrialEnds !== null && daysUntilTrialEnds > 0 && (
          <div className={style.trial}>
            <span>{daysUntilTrialEnds} </span>
            <span>trial days left</span>
          </div>
        )}
        <Button variant="primary" onClick={handleOpenModal}>
          <img src={buyIcon} alt="plus" /> Buy credits
        </Button>
      </div>
      <BuyCreditsModal
        open={open}
        creditsMultiplier={userData?.billing.pricing_plan.price_per_credit}
        onClose={() => setOpen(false)}
        redirectRoute={redirectRoute}
      />
    </Card>
  );
};
