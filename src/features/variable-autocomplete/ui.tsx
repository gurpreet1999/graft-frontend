import { AutocompleteInput } from "shared/ui";
import style from "./VariableAutocomplete.module.css";

interface VariableAutocompleteProps {
  label: string;
  placeholder: string;
  error: string[] | undefined;
  handleChange: (value: ISuggestion | ISuggestion[]) => void;
  multiselect?: boolean;
  value: ISuggestion | ISuggestion[];
  suggestions?: ISuggestion[];
  isEditing: boolean;
  experience: { [id: string]: ISuggestion };
}

export const VariableAutocomplete = ({
  label,
  value,
  isEditing,
  multiselect = false,
  suggestions,
  handleChange,
  error,
  experience,
}: VariableAutocompleteProps) => {
  return (
    <div className={style.container}>
      <div className={style.label}>{label}</div>
      {isEditing ? (
        <AutocompleteInput
          value={value}
          multiselect={multiselect}
          handleChange={handleChange}
          suggestions={suggestions}
          key={label}
          error={error}
          placeholder={label}
          experience={experience}
          className={style.input}
          onClick={() => handleChange({ id: "", value: "" })}
        />
      ) : (
        <div className={style.value}>
          {Array.isArray(value)
            ? value.map((item) => item.value).join(", ")
            : value?.value}
        </div>
      )}
    </div>
  );
};
