import { useEffect, useState } from "react";
import { AdminDetails, UserManagementApi } from "shared/api";
import { Button, Heading, Modal } from "shared/ui";
import { SuspendUserModal } from "features/suspend-user-modal";

import style from "./style.module.css";
import suspendIcon from "assets/images/user-menu/suspendUser.svg";
import unsuspendIcon from "assets/images/user-menu/unsuspendUser.svg";
import classNames from "classnames";

interface IAdminDetailsModal {
  open: boolean;
  onClose: () => void;
  id?: string;
  updateTableData?: () => void;
}

const getSuspendButton = (
  status: string,
  setSuspendModalOpen: (value: boolean) => void,
  activateUser: () => void
) => {
  if (status === "ACTIVE") {
    return (
      <Button
        variant="red"
        className={style.button}
        onClick={() => {
          setSuspendModalOpen(true);
        }}
      >
        <img src={suspendIcon} alt="" /> Suspend
      </Button>
    );
  }
  return (
    <Button variant="primary" className={style.button} onClick={activateUser}>
      <img src={unsuspendIcon} alt="" /> Unsuspend User
    </Button>
  );
};

export const AdminDetailsModal = ({
  open,
  onClose,
  id,
  updateTableData,
}: IAdminDetailsModal) => {
  const [userData, setUserData] = useState<AdminDetails>();

  const [suspendModalOpen, setSuspendModalOpen] = useState(false);
  const [updateInfo, setUpdateInfo] = useState(false);

  useEffect(() => {
    if (!id || !open) return;

    const fetchAdminDetails = async () => {
      UserManagementApi.getAdminDetails(id).then((response) => {
        setUserData(response);
      });
    };

    fetchAdminDetails();
  }, [id, open, updateInfo]);

  const activateUser = async () => {
    if (!id) return;
    await UserManagementApi.activateUser(id);
    setUpdateInfo(!updateInfo);
    updateTableData && updateTableData();
  };

  return (
    <>
      <Modal
        open={open}
        className={style.modal}
        onClose={onClose}
        variant="side"
        title="Admin Details"
      >
        <div className={style.container}>
          <div className={style.header}>
            <span>
              {userData?.first_name} {userData?.last_name}
            </span>
          </div>
          <div className={style.body}>
            <div className={style.body__item}>
              <Heading variant="h4" className={style.item__header}>
                Main info
              </Heading>
              <div className={style.item}>
                <span className={style.item__name}>Email:</span>
                <span className={style.item__value}>{userData?.email}</span>
              </div>
              <div className={style.item}>
                <span className={style.item__name}>Phone:</span>
                <span className={style.item__value}>
                  {userData?.phone_number}
                </span>
              </div>
              <div className={style.item}>
                <span className={style.item__name}>Last activity:</span>
                <span className={style.item__value}>
                  {userData?.last_activity_date}
                </span>
              </div>
            </div>
          </div>
          <div className={style.buttons}>
            <Button
              variant="primary"
              onClick={onClose}
              className={classNames(style.button, style.back)}
            >
              Back
            </Button>
            {userData?.status &&
              // TODO: Add buttons for editing and saving user data
              getSuspendButton(
                userData.status,
                setSuspendModalOpen,
                activateUser
              )}
          </div>
        </div>
      </Modal>
      <SuspendUserModal
        suspendModalOpen={suspendModalOpen}
        onClose={() => setSuspendModalOpen(false)}
        suspendUserId={id}
        updateData={updateTableData}
      />
    </>
  );
};
