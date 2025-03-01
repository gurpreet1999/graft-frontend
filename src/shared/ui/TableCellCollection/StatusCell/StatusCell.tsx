import classNames from "classnames";
import style from "./StatusCell.module.css";

export type StatusCellType =
  | "Available"
  | "Unavailable"
  | "Pending"
  | "Published"
  | "Draft"
  | "Verified"
  | "WaitingForSubmission"
  | "NonVerified";

interface IStatusCellProps {
  status: StatusCellType;
}

const statusColor = {
  Available: style.available,
  Unavailable: style.unavailable,
  Pending: style.pending,
  Published: style.published,
  Draft: style.draft,
  Verified: style.published,
  NonVerified: style.nonVerified,
  WaitingForSubmission: style.nonVerified,
};

const getStatusText = (status: StatusCellType) => {
  switch (status) {
    case "NonVerified":
      return "Non-Verified";
    case "WaitingForSubmission":
      return "Waiting for submission";
    default:
      return status;
  }
};

export const StatusCell = ({ status }: IStatusCellProps) => {
  return (
    <div className={classNames(style.status, statusColor[status])}>
      <span>{getStatusText(status)}</span>
    </div>
  );
};
