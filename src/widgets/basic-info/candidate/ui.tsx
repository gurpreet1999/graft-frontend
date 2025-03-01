import {
  Card,
  CardHeader,
  StatusChip,
  Status,
  Checkbox,
  SnackBar,
  useTheme,
} from "shared/ui";
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
import classNames from "classnames";
import { ChangeCandidateData } from "features/change-users-data";
import { FIELDS_PERSONAL_DATA as fields } from "../PersonalData/candidate";
import { ChangeUserData } from "../lib";

export const CandidateBasicInfo: React.FC = () => {
  const { theme } = useTheme();
  const width = usePageWidth();
  const { userData, status } = useGetCurrentUser();
  const [agreeToBeContacted, setAgreeToBeContacted] = useState<boolean>(
    userData?.candidate_data.agreement_to_contact || false
  );

  const { suggestions } = useGetSuggestions();

  const avatarSrc = theme === "light" ? avatarLight : avatar;

  const [initialData, setInitialData] = useState<ICandidatePersonalData>({
    firstName: userData?.first_name || "",
    lastName: userData?.last_name || "",
    phone: userData?.phone_number || "",
    email: userData?.email || "",
    postcode: userData?.postcode || "",
  });

  const {
    formData,
    formDataChange,
    errorsState,
    isEditing,
    handleInputChange,
    handleCheckboxChange,
    cancelSave,
    saveChanges,
    validateFields,
  } = useForm({ initialData, fields, suggestions, validateOnChange: true });

  const handleSaveChanges = async () => {
    const errors = validateFields();
    if (errors) return;
    await ChangeUserData.updateCandidateData(
      formDataChange,
      agreeToBeContacted
    );
    SnackBar({ text: "Data updated successfully", variant: "success" });
    saveChanges();
  };

  const handleAgreToBeContactedChange = async () => {
    await ChangeUserData.updateCandidateData(formData, !agreeToBeContacted);
    SnackBar({ text: "Agreement updated successfully", variant: "success" });
    setAgreeToBeContacted(!agreeToBeContacted);
  };

  useEffect(() => {
    if (status === "succeeded") {
      setInitialData({
        firstName: userData?.first_name || "",
        lastName: userData?.last_name || "",
        phone: userData?.phone_number || "",
        email: userData?.email || "",
        postcode: userData?.postcode || "",
      });
    }
  }, [userData, status]);

  return (
    <Card
      className={classNames(
        style.container,
        status === "loading" && style.loading
      )}
    >
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
        <StatusChip
          status={
            userData?.candidate_data.verified
              ? Status.Active
              : Status.NotVerified
          }
          label={
            userData?.candidate_data.verified ? "Verified" : "Non-Verified"
          }
        />
      </div>
      <ChangeCandidateData
        isEditing={isEditing}
        profileData={formDataChange}
        handleInputChange={handleInputChange}
        errorsState={errorsState}
        handleCheckboxChange={handleCheckboxChange}
      />
      <div className={style.checkbox__wrapper}>
        <Checkbox
          handleCheck={handleAgreToBeContactedChange}
          checked={agreeToBeContacted}
          label="Receive notifications about new jobs"
          className={style.checkbox}
          disabled={!isEditing}
          filled={true}
        />
      </div>
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
