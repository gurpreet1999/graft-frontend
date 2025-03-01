import { FIELDS_PERSONAL_DATA as FIELDS } from "widgets/basic-info/PersonalData/admin";
import { renderVariableInput } from "../helpers/renderVariableInput";
import style from "./CandidateData.module.css";

export const ChangeAdminData = ({
  isEditing,
  profileData,
  handleInputChange,
  errorsState,
}: IChangeUsersDataProps<IAdminFormPersonalData>) => {
  if (!profileData) return null;
  return (
    <div className={style.inputs__container}>
      <div className={style.inputs__wrapper}>
        {renderVariableInput({
          fields: FIELDS.slice(0, 2),
          formState: profileData,
          handleInputChange,
          errorsState,
          isEditing,
        })}
      </div>
      <div className={style.inputs__wrapper}>
        {renderVariableInput({
          fields: FIELDS.slice(2),
          formState: profileData,
          handleInputChange,
          errorsState,
          isEditing,
        })}
      </div>
    </div>
  );
};
