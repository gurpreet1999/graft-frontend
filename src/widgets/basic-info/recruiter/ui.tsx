import { Card, CardHeader, SnackBar, useTheme } from "shared/ui";
import headerIcon from "assets/images/profile/basic-info.svg";
import style from "./basic-info.module.css";
import avatar from "assets/images/user-menu/avatar.png";
import avatarLight from "assets/images/user-menu/avatar-light.png";
import { useEffect, useState } from "react";
import { ButtonEdit } from "features/button-edit";
import {
  useForm,
  useGetCurrentUser,
  useGetSuggestions,
  usePageWidth,
} from "shared/hooks";
import { FIELDS_PERSONAL_DATA as fields } from "../PersonalData/recruiter";
import { ChangeRecruiterData } from "features/change-users-data";
import { ChangeUserData } from "../lib";

export const RecruiterBasicInfo: React.FC = () => {
  const { theme } = useTheme();
  const width = usePageWidth();
  const { userData } = useGetCurrentUser();
  const { suggestions } = useGetSuggestions();
  const [initialData, setInitialData] = useState<IRecruiterPersonalData>({
    firstName: userData?.first_name || "",
    lastName: userData?.last_name || "",
    phone: userData?.phone_number || "",
    email: userData?.email || "",
    postcode: userData?.postcode || "",
    companyName: userData?.recruiter_data.company_name || "",
  });

  const avatarSrc = theme === "light" ? avatarLight : avatar;

  const {
    formData,
    formDataChange,
    errorsState,
    isEditing,
    handleInputChange,
    cancelSave,
    saveChanges,
    validateFields,
  } = useForm({ initialData, fields, suggestions });

  useEffect(() => {
    setInitialData({
      firstName: userData?.first_name || "",
      lastName: userData?.last_name || "",
      phone: userData?.phone_number || "",
      email: userData?.email || "",
      postcode: userData?.postcode || "",
      companyName: userData?.recruiter_data.company_name || "",
    });
  }, [userData]);

  const handleSaveChanges = async () => {
    const errors = validateFields();
    if (errors) return;
    await ChangeUserData.updateRecruiterData(formDataChange);
    SnackBar({ text: "Data updated successfully", variant: "success" });
    saveChanges();
  };

  return (
    <Card className={style.container}>
      <div className={style.header}>
        <CardHeader image={headerIcon} title="Basic Info" />
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
      <div className={style.user}>
        <div className={style.user__img}>
          <img src={avatarSrc} alt="user" />
        </div>
        <div className={style.user__name}>
          {formData.firstName} {formData.lastName}
        </div>
      </div>
      <ChangeRecruiterData
        isEditing={isEditing}
        profileData={formDataChange}
        handleInputChange={handleInputChange}
        errorsState={errorsState}
      />
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
