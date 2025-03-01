import { Button, SnackBar } from "shared/ui";
import { Link } from "shared/ui/Link/Link";
import { renderInputs } from "features/renderInputs";
import { ScrollArea } from "@radix-ui/themes";
import { Validation } from "shared/validation";
import style from "../RecruiterSignUp.module.css";
import { FIELDS_SIGNUP } from "features/Auth/FieldsData/recruiter";
import { useEffect, useState } from "react";

const FIRST_STEP_FIELDS = FIELDS_SIGNUP.slice(0, 5);

interface IBasicInfo {
  signUpForm: IRecruiterFormData;
  errorsState: ErrorState<IRecruiterFormData>;
  setErrorsState: (value: ErrorState<IRecruiterFormData>) => void;
  setStep: (value: number) => void;
  handleInputChange: (key: string, value: string) => void;
}

export const BasicInfo = ({
  signUpForm,
  errorsState,
  setErrorsState,
  setStep,
  handleInputChange,
}: IBasicInfo) => {
  const [changesWereAdopted, setChangesWereAdopted] = useState(false);

  const handleNextStep = () => {
    const { errorsState, areErrorsFound } = Validation.validateFields(
      FIRST_STEP_FIELDS,
      signUpForm
    );
    setErrorsState(errorsState);

    if (areErrorsFound) {
      setChangesWereAdopted(true);
      SnackBar({ text: Object.values(errorsState).flat() });
      return;
    } else {
      setChangesWereAdopted(false);
      setStep(1);
    }
  };

  useEffect(() => {
    if (changesWereAdopted) {
      const { errorsState } = Validation.validateFields(
        FIRST_STEP_FIELDS,
        signUpForm
      );
      setErrorsState(errorsState);
    }
  }, [signUpForm]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <ScrollArea className={style.scroll}>
        <div className={style.inputs}>
          {renderInputs({
            fields: FIRST_STEP_FIELDS,
            formState: signUpForm,
            errorsState,
            handleInputChange,
          })}
        </div>
      </ScrollArea>
      <div className={style.buttons}>
        <Button type="button" onClick={handleNextStep}>
          Sign Up
        </Button>
        <Link className={style.link} text="Log In" href="/auth/login" />
      </div>
    </>
  );
};
