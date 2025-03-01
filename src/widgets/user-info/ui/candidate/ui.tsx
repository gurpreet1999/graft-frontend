import {
  Card,
  CardHeader,
  StatusChip,
  Status,
  Checkbox,
  useTheme,
  Button,
  getStatus,
  getStatusLabel,
} from "shared/ui";
import headerIcon from "assets/images/jobs/Notebook.svg";
import style from "./style.module.css";
import avatar from "assets/images/user-menu/avatar.png";
import avatarLight from "assets/images/user-menu/avatar-light.png";
import suspendIcon from "assets/images/user-menu/suspendUser.svg";
import unsuspendIcon from "assets/images/user-menu/unsuspendUser.svg";
import { SuspendUserModal } from "features/suspend-user-modal";
import { useState } from "react";
import { UserManagementApi } from "shared/api";

export const CandidateInfo = ({
  user,
  updateInfo,
}: {
  user: IUser;
  updateInfo: () => void;
}) => {
  const { theme } = useTheme();
  const [suspendModalOpen, setSuspendModalOpen] = useState(false);

  const avatarSrc = theme === "light" ? avatarLight : avatar;

  const activateUser = async () => {
    await UserManagementApi.activateUser(user.id);
    updateInfo();
  };

  const status = getStatus(
    user.candidate_data.verified,
    user.candidate_verification
  );

  return (
    <>
      {user.status === "ACTIVE" && (
        <SuspendUserModal
          suspendUserName={`${user.first_name} ${user.last_name}`}
          suspendUserId={user.id}
          suspendModalOpen={suspendModalOpen}
          onClose={() => {
            updateInfo();
            setSuspendModalOpen(false);
          }}
        />
      )}
      <Card className={style.container}>
        <div className={style.header}>
          <CardHeader
            className={style.title}
            image={headerIcon}
            title="Candidate Info"
          />
          {user.status === "ACTIVE" ? (
            <Button
              variant="primary"
              className={style.button}
              onClick={() => {
                setSuspendModalOpen(true);
              }}
            >
              <img src={suspendIcon} alt="" /> Suspend User
            </Button>
          ) : (
            <Button
              variant="primary"
              className={style.button}
              onClick={activateUser}
            >
              <img src={unsuspendIcon} alt="" /> Unsuspend User
            </Button>
          )}
        </div>
        <div className={style.user}>
          <div className={style.user__img}>
            <img src={avatarSrc} alt="user" />
          </div>
          <div className={style.user__name}>
            {user.first_name} {user.last_name}
          </div>
          <StatusChip
            className={style.status}
            status={
              user.candidate_data.verified ? Status.Active : Status.Pending
            }
            label={getStatusLabel(status)}
          />
        </div>
        <div className={style.info__container}>
          <div className={style.info__wrapper}>
            <div className={style.info__item}>
              <span className={style.info__label}>First Name</span>
              <span className={style.info__value}>{user.first_name}</span>
            </div>
            <div className={style.info__item}>
              <span className={style.info__label}>Last Name</span>
              <span className={style.info__value}>{user.last_name}</span>
            </div>
          </div>

          <div className={style.info__wrapper}>
            <div className={style.info__item}>
              <span className={style.info__label}>Mobile Number</span>
              <span className={style.info__value}>{user.phone_number}</span>
            </div>
            <div className={style.info__item}>
              <span className={style.info__label}>Email</span>
              <span className={style.info__value}>{user.email}</span>
            </div>
          </div>
          <div className={style.info__wrapper}>
            <div className={style.info__item}>
              <span className={style.info__label}>Postcode</span>
              <span className={style.info__value}>{user.postcode}</span>
            </div>
          </div>
        </div>
        <div className={style.info__checkbox}>
          <Checkbox
            checked={user.candidate_data.agreement_to_contact}
            disabled
            label="Willing to be contacted via SMS"
            className={style.checkbox}
          />
        </div>
      </Card>
    </>
  );
};
