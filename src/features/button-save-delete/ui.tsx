import { Button } from "shared/ui";
import style from "./ButtonEditDelete.module.css";
import saveIcon from "assets/images/profile/save.svg";
import deleteIcon from "assets/images/profile/deleteIcon.svg";

interface ButtonEditDeleteProps {
  deleteItem: () => void;
  saveChanges: () => void;
}

export const ButtonSaveDelete = ({
  deleteItem,
  saveChanges,
}: ButtonEditDeleteProps) => {
  return (
    <div className={style.buttons}>
      <Button variant="red" onClick={deleteItem} className={style.edit__button}>
        <img src={deleteIcon} alt="edit" /> Delete Account
      </Button>
      <Button
        variant="primary"
        onClick={saveChanges}
        className={style.edit__button}
      >
        <img src={saveIcon} alt="edit" /> Save
      </Button>
    </div>
  );
};
