import classNames from "classnames";
import style from "./JobDetailsDeleteCell.module.css";
// import deleteIcon from "assets/images/button/delete.svg";
import detailIcon from "assets/images/button/note.svg";

interface IJobDetailsDeleteCellProps {
  id: string;
  handleDetails: (id: string) => void;
  handleDelete?: (id: string) => void;
}

export const JobDetailsDeleteCell = ({
  id,
  // handleDelete,
  handleDetails,
}: IJobDetailsDeleteCellProps) => (
  <div className={classNames(style.container)}>
    <button
      onClick={() => handleDetails(id)}
      className={classNames(style.button, style.button__details)}
    >
      <img src={detailIcon} alt="" />
      Job details
    </button>
    {/* <button
      onClick={() => handleDelete(id)}
      className={classNames(style.button, style.button__delete)}
    >
      <img src={deleteIcon} alt="" />
    </button> */}
  </div>
);
