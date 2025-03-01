import { renderVariableAutocomplete } from "./helpers/renderVariableAutocomplete";
import style from "./changeExperience.module.css";

export const ChangeUserExperience = ({
  isEditing,
  experienceData,
  handleAutocompleteChange,
  errorsState,
  suggestions,
  sectorName,
  fields,
  experience,
}: IChangeUsersDataProps<ICandidateExperience>) => {
  if (!experienceData || !fields) return null;
  if (sectorName === "Construction") {
    return (
      <>
        <div className={style.inputs__wrapper}>
          <div className={style.inputs}>
            {renderVariableAutocomplete({
              fields: fields.slice(0, 2),
              formState: experienceData,
              errorsState,
              handleAutocompleteChange,
              isEditing,
              suggestions,
              experience,
            })}
          </div>
          <div className={style.inputs}>
            {renderVariableAutocomplete({
              fields: fields.slice(2, 4),
              formState: experienceData,
              errorsState,
              handleAutocompleteChange,
              isEditing,
              suggestions,
              experience,
            })}
          </div>
        </div>
      </>
    );
  }

  if (sectorName == "Industrial & Driving") {
    return (
      <div className={style.inputs__wrapper}>
        <div className={style.inputs}>
          {renderVariableAutocomplete({
            fields: fields.slice(0, 2),
            formState: experienceData,
            errorsState,
            handleAutocompleteChange,
            isEditing,
            suggestions,
            experience,
          })}
        </div>
        <div className={style.inputs}>
          {renderVariableAutocomplete({
            fields: fields.slice(2, 4),
            formState: experienceData,
            errorsState,
            handleAutocompleteChange,
            isEditing,
            suggestions,
            experience,
          })}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={style.inputs__wrapper}>
        <div className={style.inputs}>
          {renderVariableAutocomplete({
            fields: fields.slice(0, 3),
            formState: experienceData,
            errorsState,
            handleAutocompleteChange,
            isEditing,
            suggestions,
            experience,
          })}
        </div>
        <div className={style.inputs}>
          {renderVariableAutocomplete({
            fields: fields.slice(3, 6),
            formState: experienceData,
            errorsState,
            handleAutocompleteChange,
            isEditing,
            suggestions,
            experience,
          })}
        </div>
      </div>
      {renderVariableAutocomplete({
        fields: fields.slice(6),
        formState: experienceData,
        errorsState,
        handleAutocompleteChange,
        isEditing,
        suggestions,
        experience,
      })}
    </>
  );
};
