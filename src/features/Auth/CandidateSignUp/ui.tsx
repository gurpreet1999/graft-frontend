import { useEffect, useState } from "react";
import style from "./CandidateSignUp.module.css";
import {
  basicInfoInitial,
  constructionInitialData,
  hospitalityInitialData,
  FIELDS_BASIC_INFO,
  FIELDS_CONSTRUCTION,
  FIELDS_HOSPITALITY,
  FIELDS_INDUSTRIAL,
  industrialInitialData,
} from "../FieldsData/candidate";
import arrow from "assets/images/sign-in/arrow.svg";
import { useScrollEffect } from "shared/hooks/useScrollEffect";
import { useForm, useGetSuggestions } from "shared/hooks";
import { BasicInfo } from "./steps/BasicInfo";
import { Sector } from "./steps/Sector";
import { Availability } from "./steps/Availability";
import { Auth } from "../lib";
import { SnackBar } from "shared/ui";

interface ICandidateSignUp {
  step: number;
  setStep: (value: number) => void;
}

export const CandidateSignUp = ({ step, setStep }: ICandidateSignUp) => {
  const { suggestions, experience } = useGetSuggestions();
  const [sector, setSector] = useState<ISuggestion>({ id: "", value: "" });

  useEffect(() => {
    if (suggestions) {
      setSector(suggestions.sectors[0]);
    }
  }, [suggestions]);

  const handleChangeSector = (value: ISuggestion) => {
    setSector(value);
  };

  const {
    formDataChange: basicInfoFormData,
    errorsState: basicInfoError,
    saveChanges: validateBasicInfoFormData,
    handleInputChange: handleBasicInfoInputChange,
  } = useForm({
    initialData: basicInfoInitial,
    fields: FIELDS_BASIC_INFO,
    suggestions,
    validateOnChange: true,
  });

  const {
    formDataChange: hospitalityFormData,
    errorsState: hospitalityError,
    saveChanges: validateHospitalityFormData,
    handleAutocompleteChange: handleHospitalityAutocompleteChange,
    handleCheckboxChange: handleHospitalityCheckboxChange,
    normalizedData: hospitalityData,
  } = useForm({
    initialData: hospitalityInitialData,
    fields: FIELDS_HOSPITALITY,
    suggestions,
    validateOnChange: true,
  });

  const {
    formDataChange: constructionFormData,
    errorsState: constructionError,
    saveChanges: validateConstructionFormData,
    handleAutocompleteChange: handleConstructionAutocompleteChange,
    handleCheckboxChange: handleConstructionCheckboxChange,
    normalizedData: constructionData,
  } = useForm({
    initialData: constructionInitialData,
    fields: FIELDS_CONSTRUCTION,
    suggestions,
    validateOnChange: true,
  });

  const {
    formDataChange: industrialFormData,
    errorsState: industrialError,
    saveChanges: validateIndustrialFormData,
    handleAutocompleteChange: handleIndustrialAutocompleteChange,
    handleCheckboxChange: handleIndustrialCheckboxChange,
    normalizedData: industrialData,
  } = useForm({
    initialData: industrialInitialData,
    fields: FIELDS_INDUSTRIAL,
    suggestions,
    validateOnChange: true,
  });

  useScrollEffect(basicInfoFormData.email);
  useScrollEffect(basicInfoFormData.postalCode, 300);

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleNextStep = async () => {
    if (step === 0) {
      const errors = validateBasicInfoFormData();

      if (errors) {
        SnackBar({ text: Object.values(errors).flat() });
        return;
      }
    }

    if (step === 1 && !sector) return;

    if (step === 2) {
      const userData = { ...basicInfoFormData, role: "CANDIDATE" };
      if (sector.value === "Hospitality") {
        const errors = validateHospitalityFormData();
        if (errors) {
          SnackBar({ text: Object.values(errors).flat() });
          return;
        }

        if (!hospitalityFormData.agreeToTerms) {
          SnackBar({
            text: "Agreement to our terms is required to use the platform",
          });
          return;
        }

        const success = await Auth.signUpCandidate({
          sector: sector,
          ...userData,
          ...hospitalityFormData,
        } as ICandidateHospitalityFormData);

        if (!success) return;
      }
      if (sector.value === "Construction") {
        const errors = validateConstructionFormData();
        if (errors) {
          SnackBar({ text: Object.values(errors).flat() });
          return;
        }

        if (!constructionFormData.agreeToTerms) {
          SnackBar({
            text: "Agreement to our terms is required to use the platform",
          });
          return;
        }

        const success = await Auth.signUpCandidate({
          sector: sector,
          ...userData,
          ...constructionFormData,
        } as ICandidateConstructionFormData);

        if (!success) return;
      }

      if (sector.value === "Industrial & Driving") {
        const errors = validateIndustrialFormData();
        if (errors) {
          SnackBar({ text: Object.values(errors).flat() });
          return;
        }

        if (!industrialFormData.agreeToTerms) {
          SnackBar({
            text: "Agreement to our terms is required to use the platform",
          });
          return;
        }

        const success = await Auth.signUpCandidate({
          sector: sector,
          ...userData,
          ...industrialFormData,
        } as ICandidateIndustrialFormData);

        if (!success) return;
      }
    }

    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const commonProps = experience && {
    experience,
    handleNextStep,
  };

  return (
    <form className={style.container} onSubmit={handleSignUp}>
      {step !== 0 && (
        <button className={style.back} onClick={handlePrevStep}>
          <img src={arrow} alt="" />
        </button>
      )}
      {step === 0 && (
        <BasicInfo
          basicInfoFormData={basicInfoFormData}
          errorsState={basicInfoError}
          handleInputChange={handleBasicInfoInputChange}
          handleNextStep={handleNextStep}
        />
      )}
      {step === 1 && suggestions && (
        <Sector
          sector={sector}
          sectors={suggestions.sectors}
          setSector={handleChangeSector}
          handleNextStep={handleNextStep}
        />
      )}
      {step === 2 &&
        suggestions &&
        sector.value === "Hospitality" &&
        hospitalityData &&
        commonProps && (
          <Availability
            fields={FIELDS_HOSPITALITY}
            formData={hospitalityData}
            errorsState={hospitalityError}
            suggestions={suggestions}
            handleCheckboxChange={handleHospitalityCheckboxChange}
            handleAutocompleteChange={handleHospitalityAutocompleteChange}
            {...commonProps}
          />
        )}
      {step === 2 &&
        suggestions &&
        sector.value === "Construction" &&
        constructionData &&
        commonProps && (
          <Availability
            fields={FIELDS_CONSTRUCTION}
            formData={constructionData}
            errorsState={constructionError}
            suggestions={suggestions}
            handleCheckboxChange={handleConstructionCheckboxChange}
            handleAutocompleteChange={handleConstructionAutocompleteChange}
            {...commonProps}
          />
        )}
      {step === 2 &&
        suggestions &&
        sector.value === "Industrial & Driving" &&
        industrialData &&
        commonProps && (
          <Availability
            fields={FIELDS_INDUSTRIAL}
            formData={industrialData}
            errorsState={industrialError}
            suggestions={suggestions}
            handleCheckboxChange={handleIndustrialCheckboxChange}
            handleAutocompleteChange={handleIndustrialAutocompleteChange}
            {...commonProps}
          />
        )}
    </form>
  );
};
