import classNames from "classnames";
import style from "./PhoneActionCell.module.css";
import phoneIcon from "assets/images/jobs/PhoneCall.svg";

export const PhoneActionCell = ({ phone }: { phone: string }) => (
  <div className={classNames(style.container)}>
    <a href={`callto:${phone}`}>
      <img src={phoneIcon} alt="" />
    </a>
    <span>{phone}</span>
  </div>
);
