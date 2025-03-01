import style from "./style.module.css";
import { UserManagementApi } from "shared/api";
import { Button, Heading, Modal, useTheme } from "shared/ui";
import suspendIcon from "assets/images/user-menu/UserCircleMinus.svg";
import suspendLightIcon from "assets/images/user-menu/UserCircleMinusLight.svg";

interface ISuspendUserModal {
  suspendUserId?: string;
  suspendModalOpen: boolean;
  suspendUserName?: string;
  onClose: () => void;
  updateData?: () => void;
}

export const SuspendUserModal = ({
  suspendUserId,
  suspendModalOpen,
  suspendUserName,
  onClose,
  updateData,
}: ISuspendUserModal) => {
  const { theme } = useTheme();

  const suspendUser = async () => {
    if (!suspendUserId) return;
    await UserManagementApi.suspendUser(suspendUserId);
    updateData && updateData();
    onClose();
  };

  if (!suspendUserId) {
    return null;
  }

  return (
    <Modal
      open={suspendModalOpen}
      onClose={onClose}
      headerClassName={style.modal__header}
    >
      <div className={style.container}>
        <img
          src={theme === "dark" ? suspendIcon : suspendLightIcon}
          alt="suspend"
        />
        <Heading className={style.header} variant="h2">
          Are you sure?
        </Heading>
        <p>
          If you suspend <span>{suspendUserName}</span> then this candidate will
          no longer have access to the platform until you will grant it back.
        </p>
        <div className={style.button__container}>
          <Button
            className={style.button}
            variant="primaryBlue"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button className={style.button} variant="red" onClick={suspendUser}>
            Suspend
          </Button>
        </div>
      </div>
    </Modal>
  );
};
