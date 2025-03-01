import classNames from "classnames";
import style from "./DetailsAndSuspendCell.module.css";
import deleteIcon from "assets/images/user-menu/suspendUser.svg";
import unsuspendIcon from "assets/images/user-menu/unsuspendUser.svg";
import detailIcon from "assets/images/button/note.svg";

interface IJobDetailsDeleteCellProps {
  id: string;
  name: string;
  handleDetails: (id: string) => void;
  handleUnsuspend: (id: string) => void;
  handleSuspend: (id: string, name: string) => void;
  userStatus?: UserStatus;
}

export const DetailsAndSuspendCell = ({
  id,
  handleSuspend,
  handleUnsuspend,
  handleDetails,
  userStatus,
  name,
}: IJobDetailsDeleteCellProps) => (
  <div className={classNames(style.container)}>
    <button
      onClick={() => handleDetails(id)}
      className={classNames(style.button, style.button__details)}
    >
      <img src={detailIcon} alt="" />
      Details
    </button>
    {userStatus === "ACTIVE" && (
      <button
        onClick={() => handleSuspend(id, name)}
        className={classNames(style.button, style.button__delete)}
      >
        <img src={deleteIcon} alt="" />
      </button>
    )}
    {userStatus === "SUSPENDED" && (
      <button
        onClick={() => handleUnsuspend(id)}
        className={classNames(style.button, style.button__delete)}
      >
        <img src={unsuspendIcon} alt="" />
      </button>
    )}
  </div>
);
