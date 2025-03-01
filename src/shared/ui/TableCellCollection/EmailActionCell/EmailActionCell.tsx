import classNames from "classnames";
import style from "./EmailActionCell.module.css";
import phoneIcon from "assets/images/jobs/Envelope.svg";

export const EmailActionCell = ({ email }: { email: string }) => (
  <div className={classNames(style.container)}>
    <a href={`mailto:${email}`}>
      <img src={phoneIcon} alt="" />
    </a>
    <span>{email}</span>
  </div>
);
