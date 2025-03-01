import { ScrollArea } from "@radix-ui/themes";
import { renderInputs } from "features/renderInputs";
import style from "./style.module.css";
import { Button, Checkbox, Heading, Link } from "shared/ui";

interface IAvailabilityProps<T> {
  fields: FormField<T>[];
  errorsState?: ErrorState<T>;
  formData: Partial<T>;
  suggestions?: IExperienceData;
  experience: INormalizedExperienceData;
  handleAutocompleteChange: (
    name: string,
    value: ISuggestion | ISuggestion[]
  ) => void;
  handleCheckboxChange: (key: string) => void;
  handleNextStep: () => void;
}

export const Availability = <T extends Partial<IFormData>>({
  fields,
  errorsState,
  formData,
  suggestions,
  experience,
  handleAutocompleteChange,
  handleCheckboxChange,
  handleNextStep,
}: IAvailabilityProps<T>) => {
  return (
    <div className={style.container}>
      <div className={style.header}>
        <Heading variant="h1">Almost done!</Heading>
        <span className={style.subheader}>
          To complete registration, please enter the information below{" "}
        </span>
      </div>
      <ScrollArea className={style.scroll}>
        <div className={style.inputs}>
          {renderInputs({
            fields,
            formState: formData,
            errorsState,
            handleAutocompleteChange,
            suggestions,
            experience,
          })}
        </div>
        <div className={style.checkbox__container}>
          <Checkbox
            checked={formData.agreeToBeContacted as boolean}
            label={
              <div className={style.checkbox__inner}>
                Wish to be contacted via SMS/Email{" "}
              </div>
            }
            handleCheck={() => handleCheckboxChange("agreeToBeContacted")}
          />
          <Checkbox
            checked={formData.agreeToTerms as boolean}
            label={
              <div className={style.checkbox__inner}>
                I agree to the{" "}
                <Link
                  text="Terms of Service"
                  href="https://www.onthegraft.co.uk/privacy-policy"
                  className={style.link}
                />{" "}
                and{" "}
                <Link
                  text="Privacy Policy"
                  href="https://www.onthegraft.co.uk/privacy-policy"
                  className={style.link}
                />
              </div>
            }
            handleCheck={() => handleCheckboxChange("agreeToTerms")}
          />
        </div>
      </ScrollArea>
      <div className={style.button}>
        <Button onClick={handleNextStep}>
          <span>Finish</span>
        </Button>
      </div>
    </div>
  );
};
