/* eslint-disable @typescript-eslint/no-unused-vars */
type ErrorState<T> = Record<keyof T, string[]>;

type RecordType = Record<string, any>;

interface IChangeUsersDataProps<T extends RecordType> {
  isEditing: boolean;
  profileData?: Partial<T>;
  handleInputChange?: (key: string, value: string) => void;
  errorsState: ErrorState<T> | undefined;
  handleCheckboxChange?: (key: string) => void;
  handleAutocompleteChange?: (
    key: string,
    value: ISuggestion | ISuggestion[]
  ) => void;
  experienceData?: Partial<T>;
  suggestions?: IExperienceData;
  experience?: INormalizedExperienceData;
  sectorName?: string;
  fields?: (IField & { name: keyof T })[];
}
