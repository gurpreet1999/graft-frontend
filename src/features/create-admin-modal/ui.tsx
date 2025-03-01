import { Button, Modal, SnackBar } from "shared/ui";
import createIcon from "assets/images/user-menu/add-user.svg";
import style from "./style.module.css";
import { useInitializeForm } from "shared/hooks";
import { FIELDS, initialFormData } from "./admin.fields";
import { renderInputs } from "features/renderInputs";
import { UserManagementApi } from "shared/api";

interface ICreateAdminModalProps {
  open: boolean;
  onClose: () => void;
}

const ModalTitle = () => {
  return (
    <div className={style.title}>
      <img src={createIcon} alt="create-admin" />
      <span>Create Admin</span>
    </div>
  );
};

export const CreateAdminModal = ({ open, onClose }: ICreateAdminModalProps) => {
  const {
    formDataChange: formState,
    fields,
    errorsState,
    handleInputChange,
    validateFields,
  } = useInitializeForm(initialFormData, FIELDS);

  const handleSubmit = async () => {
    const error = validateFields(formState);
    if (error) {
      return;
    }

    await UserManagementApi.sendAdminInvite(
      formState.firstName,
      formState.lastName,
      formState.email
    );
    SnackBar({ text: "Admin invite sent successfully", variant: "success" });
    onClose();
  };

  return (
    <Modal
      open={open}
      className={style.modal}
      onClose={onClose}
      variant="side"
      title={<ModalTitle />}
    >
      <div className={style.container}>
        <div className={style.inputs}>
          {renderInputs({
            fields,
            formState,
            errorsState,
            handleInputChange,
          })}
        </div>
        <div className={style.buttons}>
          <Button variant="primary" className={style.button} onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primaryBlue"
            className={style.button}
            onClick={handleSubmit}
          >
            Send Invite
          </Button>
        </div>
      </div>
    </Modal>
  );
};
