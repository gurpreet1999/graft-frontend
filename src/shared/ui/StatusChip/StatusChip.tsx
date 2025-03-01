import React from "react";
import style from "./StatusChip.module.css";
import classNames from "classnames";

export enum Status {
  Active = "active",
  Inactive = "inactive",
  Pending = "pending",
  NotVerified = "not-verified",
}

interface StatusChipProps {
  status: Status | boolean;
  className?: string;
  label?: string;
}

const STATUS_STYLES = {
  [Status.Active]: style.active,
  [Status.Inactive]: style.inactive,
  [Status.Pending]: style.pending,
  [Status.NotVerified]: style.notVerified,
};

export const isDocumentUploaded = (document: DocumentVerification) => {
  return (
    document.experience_document_status === "PENDING" ||
    document.personal_document_status === "PENDING"
  );
};

export const getStatus = (
  verified: boolean,
  document?: DocumentVerification
) => {
  if (!document) return Status.Inactive;
  if (isDocumentUploaded(document)) return Status.Pending;
  if (verified) return Status.Active;
  return Status.Inactive;
};

export const getStatusLabel = (status: Status) => {
  switch (status) {
    case Status.Pending:
      return "Waiting for submission";
    case Status.Active:
      return "Verified";
    case Status.Inactive:
      return "Non-Verified";
  }
};

export const StatusChip = ({ status, label, className }: StatusChipProps) => {
  const statusKey =
    typeof status === "boolean"
      ? status
        ? Status.Active
        : Status.Inactive
      : status;

  return (
    <div
      className={classNames(
        style.chip,
        STATUS_STYLES[statusKey],
        className,
        label === "Pending" && style.fit
      )}
    >
      {label}
    </div>
  );
};
