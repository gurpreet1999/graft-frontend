import { useEffect, useState } from "react";
import { Button, Checkbox, Heading, SnackBar } from "shared/ui";
import { Link } from "shared/ui/Link/Link";
import { renderInputs } from "features/renderInputs";
import arrow from "assets/images/sign-in/arrow.svg";
import { Validation } from "shared/validation";
import style from "../RecruiterSignUp.module.css";
import { FIELDS_SIGNUP } from "features/Auth/FieldsData/recruiter";
import { Auth } from "features/Auth/lib";

const FIELDS = FIELDS_SIGNUP.slice(5);

interface IRecruiterInfo {
  signUpForm: IRecruiterFormData;
  errorsState: ErrorState<IRecruiterFormData>;
  setErrorsState: (value: ErrorState<IRecruiterFormData>) => void;
  setStep: (value: number) => void;
  handleInputChange: (key: string, value: string) => void;
}

export const RecruiterInfo = ({
  signUpForm,
  errorsState,
  setErrorsState,
  setStep,
  handleInputChange,
}: IRecruiterInfo) => {
  const [changesWereAdopted, setChangesWereAdopted] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleNextStep = async () => {
    const { errorsState, areErrorsFound } = Validation.validateFields(
      FIELDS,
      signUpForm
    );
    setErrorsState(errorsState);

    if (areErrorsFound) {
      setChangesWereAdopted(true);
      SnackBar({ text: Object.values(errorsState).flat() });
      return;
    }

    if (!agreeToTerms) {
      SnackBar({
        text: "Agreement to our terms is required to use the platform",
      });
      return;
    }

    setChangesWereAdopted(false);
    const res = await Auth.signUp({ ...signUpForm, role: "RECRUITER" });
    if (!res) {
      return;
    }
    setStep(2);
  };

  useEffect(() => {
    if (changesWereAdopted) {
      const { errorsState } = Validation.validateFields(FIELDS, signUpForm);
      setErrorsState(errorsState);
    }
  }, [signUpForm]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className={style.container_step}>
        <div className={style.header}>
          <Heading variant="h1">Welcome!</Heading>
          <span className={style.subheader}>
            To continue please, select the employment sector
          </span>
        </div>
        <button
          className={style.back}
          onClick={() => {
            setStep(0);
          }}
        >
          <img src={arrow} alt="" />
        </button>
        <div className={style.inputs}>
          {renderInputs({
            fields: FIELDS,
            formState: signUpForm,
            errorsState,
            handleInputChange,
          })}
          <Checkbox
            checked={agreeToTerms}
            label={
              <div className={style.checkbox__inner}>
                I agree to the{" "}
                <Link
                  text="Terms of Service"
                  href="/terms"
                  className={style.link}
                />{" "}
                and{" "}
                <Link
                  text="Privacy Policy"
                  href="/privacy"
                  className={style.link}
                />
              </div>
            }
            handleCheck={() => setAgreeToTerms(!agreeToTerms)}
          />
        </div>
      </div>
      <Button type="button" onClick={handleNextStep}>
        Finish
      </Button>
    </>
  );
};
