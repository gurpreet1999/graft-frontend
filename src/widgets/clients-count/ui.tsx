import { Card, CardHeader, TextXl } from "shared/ui";
import headerIcon from "assets/images/dashboard/UserCount.svg";
import style from "./style.module.css";

export const ClientsCount = ({ clients }: { clients: number }) => {
  return (
    <Card className={style.container}>
      <div className={style.header}>
        <CardHeader
          className={style.title}
          image={headerIcon}
          title="Clients"
        />
      </div>
      <div className={style.text}>
        <TextXl classname={style.count}>{clients}</TextXl>
        <div className={style.count__text}>Clients</div>
      </div>
    </Card>
  );
};
