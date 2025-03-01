import style from "./SearchInputs.module.css";
import { renderInputs } from "features/renderInputs";

interface ISearchInputsProps<T> {
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
  hideInputs?: boolean;
}

export const SearchInputs = <T,>({
  formData,
  suggestion,
  experience,
  fields,
  errorsState,
  handleInputChange,
  handleAutocompleteChange,
  hideInputs = false,
}: ISearchInputsProps<T>) => {
  return (
    <div className={style.container}>
      {!hideInputs && (
        <div className={style.inputs}>
          {renderInputs({
            fields,
            formState: formData,
            errorsState,
            suggestions: suggestion,
            handleInputChange,
            handleAutocompleteChange,
            experience: experience,
          })}
        </div>
      )}
    </div>
  );
};
