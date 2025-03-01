import { Heading } from "shared/ui";
import style from "./style.module.css";
import arrow from "assets/images/sign-in/arrow.svg";

export const Header = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => (
  <div className={style.header}>
    <Heading variant="h1">{title}</Heading>
    {subtitle && <span className={style.subheader}>{subtitle}</span>}
  </div>
);

export const BackButton = ({ onClick }: { onClick: () => void }) => (
  <button className={style.back} onClick={onClick}>
    <img src={arrow} alt="Back" />
  </button>
);
