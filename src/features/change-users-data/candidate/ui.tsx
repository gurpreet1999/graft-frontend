import { FIELDS_PERSONAL_DATA as FIELDS } from "../../../widgets/basic-info/PersonalData/candidate";
import { renderVariableInput } from "../helpers/renderVariableInput";
import style from "./CandidateData.module.css";

export const ChangeCandidateData = ({
  isEditing,
  profileData,
  handleInputChange,
  errorsState,
}: IChangeUsersDataProps<ICandidateFormPersonalData>) => {
  if (!profileData) return null;

  return (
    <>
      <div className={style.inputs__container}>
        <div className={style.inputs__wrapper}>
          {renderVariableInput({
            fields: FIELDS.slice(0, 3),
            formState: profileData,
            handleInputChange,
            errorsState,
            isEditing,
          })}
        </div>
        <div className={style.inputs__wrapper}>
          {renderVariableInput({
            fields: FIELDS.slice(3),
            formState: profileData,
            handleInputChange,
            errorsState,
            isEditing,
          })}
        </div>
      </div>
    </>
  );
};
