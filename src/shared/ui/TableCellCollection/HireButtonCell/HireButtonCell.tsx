import style from "./HireButtonCell.module.css";
import { Button } from "shared/ui/Buttons/Buttons";
import userIcon from "assets/images/jobs/UserPlus.svg";

export const HireButtonCell = ({ onClick }: { onClick: () => void }) => (
  <Button variant="primaryBlue" className={style.button} onClick={onClick}>
    <img src={userIcon} alt="user" />
    Hire
  </Button>
);
