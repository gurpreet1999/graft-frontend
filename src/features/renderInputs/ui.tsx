import { Input, AutocompleteInput } from "shared/ui";

export const suggestionsMap: Record<string, keyof IExperienceData> = {
  dailyJobUpdatePreference: "dailyJobUpdates",
  hospitalityFirstRole: "hospitalityRoles",
  hospitalitySecondRole: "hospitalityRoles",
  hospitalityMainEstablishment: "hospitalityEstablishments",
  hospitalitySecondEstablishment: "hospitalityEstablishments",
  constructionCardType: "constructionCardTypes",
  constructionRole: "constructionRoles",
  skills: "skills",
  yearsExperience: "yearsExperience",
  hospitalityRole: "hospitalityRoles",
  hospitalityEstablishment: "hospitalityEstablishments",
  occupation: "employmentTypes",
  location: "location",
  industrialRole: "industrialAndDrivingRoles",
  industrialLicence: "industrialAndDrivingLicences",
  industrialAvailability: "industrialAndDrivingAvailabilities",
};

interface IRenderInputsProps<T> {
  fields: (IField & { name: keyof T })[];
  formState: Partial<T>;
  errorsState?: Record<keyof Partial<T>, string[]>;
  handleInputChange?: (name: string, value: string) => void;
  handleAutocompleteChange?: (
    name: string,
    value: ISuggestion | ISuggestion[]
  ) => void;
  suggestions?: IExperienceData;
  experience?: INormalizedExperienceData;
}

export function renderInputs<T>({
  fields,
  formState,
  errorsState,
  experience,
  suggestions,
  handleInputChange,
  handleAutocompleteChange,
}: IRenderInputsProps<T>): JSX.Element[] {
  return fields.map(
    ({
      name,
      placeholder,
      type,
      icon,
      multiselect,
      isPassword,
      label,
      labelIcon,
      inputIcon,
      allowAnyOption,
      disabled,
    }) => {
      const value = formState[name];
      const error = errorsState && errorsState[name];
      const commonProps = {
        key: name,
        placeholder,
        icon,
        error,
        isPassword,
        label,
        labelIcon,
      };

      const suggestionsType = suggestionsMap[name];
      let suggestionsArray = suggestions && suggestions[suggestionsType];
      const experienceArray = experience && experience[suggestionsType];

      if (allowAnyOption && suggestionsArray && experienceArray) {
        if (suggestionsArray[0].id !== "any") {
          suggestionsArray = [{ id: "any", value: "Any" }, ...suggestionsArray];
        }
      }

      if (
        suggestionsArray &&
        experienceArray &&
        suggestionsArray.length > 0 &&
        handleAutocompleteChange
      ) {
        return (
          <AutocompleteInput
            {...commonProps}
            value={value as ISuggestion[]}
            multiselect={multiselect}
            handleChange={(value) => handleAutocompleteChange(name, value)}
            suggestions={suggestionsArray}
            key={name}
            experience={experienceArray}
            allowAnyOption={allowAnyOption}
          />
        );
      }

      if (typeof value === "string" && handleInputChange) {
        return (
          <Input
            {...commonProps}
            value={value}
            type={type}
            key={name}
            handleChange={(value) => handleInputChange(name, value)}
            inputIcon={inputIcon}
            disabled={disabled}
          />
        );
      }

      return <></>;
    }
  );
}
