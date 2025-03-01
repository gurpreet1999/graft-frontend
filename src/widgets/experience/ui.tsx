import { Card, CardHeader, SnackBar } from "shared/ui";
import headerIcon from "assets/images/profile/experience.svg";
import style from "./experience.module.css";
import { ButtonEdit } from "features/button-edit";
import { useEffect, useState } from "react";
import {
  useForm,
  useGetCurrentUser,
  usePageWidth,
  useGetSuggestions,
} from "shared/hooks";
import { ChangeUserExperience } from "features/change-user-experience";
import { ExperienceChange } from "./lib";
import {
  HOSPITALITY_FIELDS_EXPERIENCE,
  CONSTRUCTION_FIELDS_EXPERIENCE,
  INDUSTRIAL_FIELDS_EXPERIENCE,
} from "./experience.data";

const getFields = (sector?: string) => {
  if (sector === "Hospitality") return HOSPITALITY_FIELDS_EXPERIENCE;
  if (sector === "Construction") return CONSTRUCTION_FIELDS_EXPERIENCE;
  return INDUSTRIAL_FIELDS_EXPERIENCE;
};

export const Experience: React.FC = () => {
  const width = usePageWidth();
  const { userData, status: userStatus } = useGetCurrentUser();
  const {
    suggestions,
    experience,
    status: suggestionStatus,
  } = useGetSuggestions();
  const [initialData, setInitialData] = useState<Partial<ICandidateExperience>>(
    {}
  );
  const [sector, setSector] = useState<ISuggestion>();
  const [fields, setFields] = useState<FormField<ICandidateExperience>[]>(
    getFields(sector?.value)
  );

  useEffect(() => {
    if (
      !userData ||
      !experience ||
      (userStatus || suggestionStatus) === "loading"
    )
      return;
    const experienceData = ExperienceChange.getCurrentExperience(
      userData,
      experience
    );
    if (!experienceData) return;
    setInitialData(experienceData?.userExperience);
    setSector(experienceData.sector);
    setFields(getFields(experienceData.sector.value));
  }, [userData, userStatus, suggestionStatus, experience]);

  const {
    formDataChange,
    normalizedData,
    errorsState,
    isEditing,
    handleAutocompleteChange,
    cancelSave,
    saveChanges,
  } = useForm({ initialData, fields, suggestions });

  const handleSaveChanges = async () => {
    if (!sector) return;
    try {
      await ExperienceChange.updateExperience(formDataChange, sector);
      saveChanges();
    } catch (error: any) {
      SnackBar({ text: error.message });
    }
  };

  return (
    <Card className={style.container}>
      <div className={style.header__container}>
        <CardHeader image={headerIcon} title="Work Experience" />
        {width > 768 && (
          <ButtonEdit
            isEditing={isEditing}
            saveChanges={handleSaveChanges}
            cancelSave={cancelSave}
          />
        )}
        {width <= 768 && !isEditing && (
          <ButtonEdit
            isEditing={isEditing}
            saveChanges={handleSaveChanges}
            cancelSave={cancelSave}
          />
        )}
      </div>
      {sector && suggestions && (
        <ChangeUserExperience
          isEditing={isEditing}
          experienceData={normalizedData}
          experience={experience}
          handleAutocompleteChange={handleAutocompleteChange}
          errorsState={errorsState}
          suggestions={suggestions}
          sectorName={sector.value}
          fields={getFields(sector.value)}
        />
      )}
      {width <= 768 && isEditing && (
        <ButtonEdit
          isEditing={isEditing}
          saveChanges={handleSaveChanges}
          cancelSave={cancelSave}
        />
      )}
    </Card>
  );
};
