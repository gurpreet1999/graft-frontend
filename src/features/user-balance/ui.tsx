import { Card, CardHeader, TextXl } from "shared/ui";
import balanceIcon from "assets/images/profile/balance.svg";
import style from "./style.module.css";

export const UserBalance = ({ user }: { user: IUser }) => {
  return (
    <Card className={style.container}>
      <div className={style.wrapper}>
        <CardHeader image={balanceIcon} title="Balance" />
      </div>
      <div className={style.wrapper}>
        <div className={style.description}>
          <div className={style.description__title}>
            <TextXl>{user.billing.credits}</TextXl>
            <span>Credits</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
