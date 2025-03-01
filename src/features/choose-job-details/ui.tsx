import { Button } from "shared/ui";
import style from "./ChooseJobDetails.module.css";
import { renderInputs } from "features/renderInputs";
import { ScrollArea } from "@radix-ui/themes";

interface IChooseJobDetailsProps<T> {
  formData: Partial<T>;
  suggestion?: IExperienceData;
  experience: INormalizedExperienceData;
  handleConfirm: () => void;
  fields: FormField<T>[];
  errorsState?: ErrorState<T>;
  handleInputChange: (name: string, value: string) => void;
  handleAutocompleteChange: (
    name: string,
    value: ISuggestion | ISuggestion[]
  ) => void;
  handleAbort: () => void;
  buttonDisabled?: boolean;
}

export const ChooseJobDetails = <T,>({
  formData,
  suggestion,
  experience,
  handleConfirm,
  fields,
  errorsState,
  handleInputChange,
  handleAutocompleteChange,
  handleAbort,
  buttonDisabled,
}: IChooseJobDetailsProps<T>) => {
  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.heading}>Job description</div>
        <div className={style.text}>
          Please fill in all necessary fields to create the job description.
        </div>
      </div>
      <ScrollArea scrollbars="vertical" className={style.scroll}>
        <div className={style.inputs}>
          {renderInputs({
            fields,
            formState: formData,
            errorsState,
            suggestions: suggestion,
            handleInputChange,
            handleAutocompleteChange,
            experience,
          })}
        </div>
      </ScrollArea>
      <div className={style.buttons}>
        <Button
          variant="primary"
          className={style.button}
          onClick={handleAbort}
        >
          Back
        </Button>
        <Button
          variant="primaryBlue"
          className={style.button}
          onClick={handleConfirm}
          disabled={buttonDisabled}
        >
          Add new job
        </Button>
      </div>
    </div>
  );
};
