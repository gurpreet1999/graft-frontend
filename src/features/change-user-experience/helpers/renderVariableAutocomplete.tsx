import { suggestionsMap } from "features/renderInputs";
import { VariableAutocomplete } from "features/variable-autocomplete/ui";
import { SnackBar } from "shared/ui";

interface IRenderVariableInputProps<T> {
  fields: (IField & { name: keyof T })[];
  formState: Partial<T>;
  errorsState: Record<keyof Partial<T>, string[]> | undefined;
  handleAutocompleteChange?: (
    name: string,
    value: ISuggestion | ISuggestion[]
  ) => void;
  isEditing: boolean;
  suggestions?: IExperienceData;
  experience?: INormalizedExperienceData;
}

export function renderVariableAutocomplete<T>({
  fields,
  formState,
  errorsState,
  handleAutocompleteChange,
  isEditing,
  suggestions,
  experience,
}: IRenderVariableInputProps<T>): JSX.Element[] {
  const elements: JSX.Element[] = [];

  fields.forEach(({ name, placeholder, multiselect }) => {
    const value = formState[name];
    let error;
    if (errorsState) {
      error = errorsState[name];
    }

    const commonProps = {
      key: name,
      error,
      label: placeholder,
      placeholder,
    };

    const suggestionsType = suggestionsMap[name];
    const suggestionsArray = suggestions && suggestions[suggestionsType];

    const experienceArray = experience && experience[suggestionsType];

    if (!handleAutocompleteChange) {
      SnackBar({ text: "Something went wrong" });
      return;
    }

    if (!experienceArray) return;

    elements.push(
      <VariableAutocomplete
        {...commonProps}
        value={value as ISuggestion | ISuggestion[]}
        isEditing={isEditing}
        handleChange={(value) => handleAutocompleteChange(name, value)}
        error={error}
        multiselect={multiselect}
        suggestions={suggestionsArray}
        key={name}
        experience={experienceArray}
      />
    );
  });

  return elements;
}
