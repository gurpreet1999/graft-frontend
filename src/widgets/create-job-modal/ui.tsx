import { useEffect, useState } from "react";
import { Button, Modal, SnackBar } from "shared/ui";
import style from "./jobsModal.module.css";
import plusCircleIcon from "assets/images/campaign/PlusCircle.svg";
import {
  useGetCurrentUser,
  useGetSuggestions,
  useInitializeForm,
  usePageWidth,
} from "shared/hooks";
import { ChooseJobExperience } from "features/choose-job-experience";
import {
  HOSPITALITY_FIELDS,
  JOB_DETAILS_FIELDS,
  CONSTRUCTION_FIELDS,
  initialHospitalityData,
  initialConstructionData,
} from "./fields";
import { ChooseJobDetails } from "features/choose-job-details";
import { JobCreate } from "./lib";
import classNames from "classnames";
import {
  INDUSTRIAL_FIELDS,
  initialIndustrialData,
} from "./fields/industrial.fields";

interface ICreateJobsModalProps {
  isJobCreated: boolean;
  setIsJobCreated: (value: boolean) => void;
  className?: string;
  choosedSector?: ISuggestion;
}

export const CreateJobsModal = ({
  isJobCreated,
  setIsJobCreated,
  className,
  choosedSector,
}: ICreateJobsModalProps) => {
  const width = usePageWidth();
  const { userData, status } = useGetCurrentUser();
  const { suggestions, experience } = useGetSuggestions();
  const [openModal, setOpenModal] = useState(false);
  const [step, setStep] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [sector, setSector] = useState<ISuggestion>({ id: "", value: "" });

  const [initialJobDetailsData, setInitialJobDetailsData] =
    useState<IJobDetails>({
      companyName: "",
      rateOfPay: "",
      occupation: "",
      location: "",
      contactName: "",
      contactPhone: "",
      contactEmail: "",
    });

  const hospitalityForm = useInitializeForm(
    initialHospitalityData,
    HOSPITALITY_FIELDS
  );
  const constructionForm = useInitializeForm(
    initialConstructionData,
    CONSTRUCTION_FIELDS
  );
  const industrialForm = useInitializeForm(
    initialIndustrialData,
    INDUSTRIAL_FIELDS
  );

  const jobDetailsForm = useInitializeForm(
    initialJobDetailsData,
    JOB_DETAILS_FIELDS
  );

  const forms = {
    Hospitality: hospitalityForm,
    Construction: constructionForm,
    "Industrial & Driving": industrialForm,
  };

  const currentForm = forms[sector.value as keyof typeof forms] || {};

  useEffect(() => {
    if (!userData) return;
    setInitialJobDetailsData((prevData) => ({
      ...prevData,
      companyName: userData.recruiter_data.company_name,
      contactName: userData.first_name,
      contactPhone: userData.phone_number,
      contactEmail: userData.email,
    }));
  }, [userData, status, isJobCreated]);

  useEffect(() => {
    if (!suggestions) return;
    if (choosedSector) {
      return setSector(choosedSector);
    }
    setSector(suggestions.sectors[0]);
  }, [suggestions, choosedSector]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleGoBack = () => {
    if (step === 0) return handleCloseModal();
    setStep(step - 1);
  };

  const handleNextStep = async () => {
    if (buttonDisabled) return;
    setButtonDisabled(true);
    let errors;

    if (step === 0) {
      switch (sector.value) {
        case "Hospitality":
          errors = hospitalityForm.validateFields();
          break;
        case "Construction":
          errors = constructionForm.validateFields();
          break;
        case "Industrial & Driving":
          errors = industrialForm.validateFields();
          break;
        default:
          break;
      }

      setButtonDisabled(false);

      if (errors) return;

      return setStep(step + 1);
    }

    if (step === 1) {
      errors = jobDetailsForm.validateFields();
    }

    if (step !== 1) {
      setStep(step + 1);
      setButtonDisabled(false);
      return;
    }

    if (sector.value === "Hospitality") {
      try {
        await JobCreate.createJobHospitality(
          currentForm.formDataChange,
          jobDetailsForm.formDataChange,
          sector.id
        );
        handleCloseModal();
        setIsJobCreated(!isJobCreated);
        currentForm.clearForm();
        jobDetailsForm.clearForm();
        setButtonDisabled(false);
        setStep(0);
        SnackBar({ text: "Job created successfully", variant: "success" });
        return;
      } catch {
        setButtonDisabled(false);
        SnackBar({ text: "Something went wrong", variant: "error" });
      }
    }

    if (sector.value === "Construction") {
      try {
        await JobCreate.createJobConstruction(
          currentForm.formDataChange,
          jobDetailsForm.formDataChange,
          sector.id
        );
        handleCloseModal();
        setIsJobCreated(!isJobCreated);
        currentForm.clearForm();
        jobDetailsForm.clearForm();
        setButtonDisabled(false);
        setStep(0);
        SnackBar({ text: "Job created successfully", variant: "success" });
        return;
      } catch {
        setButtonDisabled(false);
        SnackBar({ text: "Something went wrong", variant: "error" });
      }
    }

    if (sector.value === "Industrial & Driving") {
      try {
        await JobCreate.createJobIndustrial(
          currentForm.formDataChange,
          jobDetailsForm.formDataChange,
          sector.id
        );
        handleCloseModal();
        setIsJobCreated(!isJobCreated);
        currentForm.clearForm();
        jobDetailsForm.clearForm();
        setButtonDisabled(false);
        setStep(0);
        SnackBar({ text: "Job created successfully", variant: "success" });
      } catch (error) {
        setButtonDisabled(false);
        SnackBar({ text: "Something went wrong", variant: "error" });
      }
    }
  };

  const commonProps = suggestions &&
    experience && {
      sector,
      setSector: setSector,
      suggestion: suggestions,
      experience,
      handleConfirm: handleNextStep,
      handleAbort: handleGoBack,
      disabled: buttonDisabled,
    };

  return (
    <>
      <Button
        variant="primaryBlue"
        onClick={handleOpenModal}
        className={classNames(style.button, className)}
      >
        <img src={plusCircleIcon} alt="" /> Add new job
      </Button>
      <Modal
        open={openModal}
        title="Add new job"
        variant={width > 768 ? "side" : "center"}
        onClose={handleCloseModal}
      >
        <div className={style.container}>
          {step === 0 &&
            commonProps &&
            currentForm.normalizedData &&
            currentForm.fields && (
              <ChooseJobExperience
                fields={currentForm.fields}
                formData={currentForm.normalizedData}
                handleInputChange={currentForm.handleInputChange}
                handleAutocompleteChange={currentForm.handleAutocompleteChange}
                errorsState={currentForm.errorsState}
                {...commonProps}
              />
            )}
          {step === 1 && commonProps && jobDetailsForm.normalizedData && (
            <ChooseJobDetails
              formData={jobDetailsForm.normalizedData}
              fields={jobDetailsForm.fields}
              errorsState={jobDetailsForm.errorsState}
              handleInputChange={jobDetailsForm.handleInputChange}
              handleAutocompleteChange={jobDetailsForm.handleAutocompleteChange}
              {...commonProps}
            />
          )}
        </div>
      </Modal>
    </>
  );
};
