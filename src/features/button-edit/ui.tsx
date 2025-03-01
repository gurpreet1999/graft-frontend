import { Button } from "shared/ui";
import style from "./ButtonEdit.module.css";
import editIcon from "assets/images/profile/editIcon.svg";
import cancelIcon from "assets/images/profile/cancel.svg";
import saveIcon from "assets/images/profile/save-white.svg";
import classNames from "classnames";

interface ButtonEditProps {
  isEditing: boolean;
  cancelSave: () => void;
  saveChanges: () => void;
  className?: string;
  classNameButton?: string;
}

export const ButtonEdit = ({
  isEditing,
  cancelSave,
  saveChanges,
  className,
  classNameButton,
}: ButtonEditProps) => {
  if (!isEditing) {
    return (
      <div className={classNames(style.buttons, className)}>
        <Button
          variant="primary"
          className={classNameButton}
          onClick={cancelSave}
        >
          <img src={editIcon} alt="edit" /> Edit
        </Button>
      </div>
    );
  } else {
    return (
      <div className={classNames(style.buttons, className)}>
        <Button
          variant="primary"
          onClick={cancelSave}
          className={classNameButton}
        >
          <img src={cancelIcon} alt="edit" /> Cancel
        </Button>
        <Button
          onClick={saveChanges}
          className={classNames(classNameButton, style.edit__button)}
        >
          <img src={saveIcon} alt="edit" /> Save
        </Button>
      </div>
    );
  }
};
