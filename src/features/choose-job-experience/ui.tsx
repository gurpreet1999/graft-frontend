import { Button, SelectSuggestion } from "shared/ui";
import style from "./ChooseJobExperience.module.css";
import { renderInputs } from "features/renderInputs";
import { ScrollArea } from "@radix-ui/themes";
import sectorIcon from "assets/images/search/sectorIcon.svg";

interface IChooseJobExperienceProps<T> {
  sector?: ISuggestion;
  setSector: (value: ISuggestion) => void;
  formData: Partial<T>;
  suggestion: IExperienceData;
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

export const ChooseJobExperience = <T,>({
  sector,
  setSector,
  formData,
  suggestion,
  experience,
  handleConfirm,
  fields,
  errorsState,
  handleInputChange,
  handleAutocompleteChange,
  handleAbort,
}: IChooseJobExperienceProps<T>) => {
  return (
    <div className={style.container}>
      <ScrollArea scrollbars="vertical" className={style.scroll}>
        <div className={style.inputs}>
          <SelectSuggestion
            value={sector}
            handleChange={setSector}
            options={suggestion.sectors}
            placeholder="Select"
            label="Sector"
            labelIcon={sectorIcon}
            hideDelete
          />
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
          Cancel
        </Button>
        <Button
          variant="primaryBlue"
          className={style.button}
          onClick={handleConfirm}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
