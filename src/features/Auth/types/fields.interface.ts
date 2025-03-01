/* eslint-disable @typescript-eslint/no-unused-vars */
interface ISuggestion {
  value: string;
  id: string;
  group?: string;
}

interface IDocumentType {
  name: string;
  id: string;
  value?: string;
}

type ValidatorBase<T, R> = {
  (value: T, suggestions?: IExperienceData): R;
};

type ValidatorAutocomplete = ValidatorBase<ISuggestion, string[]>;
type ValidatorInput = ValidatorBase<string, string[]>;
type ValidatorMulticomplete = ValidatorBase<ISuggestion[], string[]>;
type ValidatorInputOptional = ValidatorBase<string, string[] | undefined>;
type ValidatorAutocompleteOptional = ValidatorBase<
  ISuggestion,
  string[] | undefined
>;
type ValidatorMulticompleteOptional = ValidatorBase<
  ISuggestion[],
  string[] | undefined
>;

type ValidatorFunction =
  | ValidatorAutocomplete
  | ValidatorInput
  | ValidatorMulticomplete
  | ValidatorInputOptional
  | ValidatorAutocompleteOptional
  | ValidatorMulticompleteOptional;

interface IField {
  name: string;
  validator?: ValidatorFunction;
  placeholder: string;
  type: string;
  icon?: string;
  multiselect?: boolean;
  isPassword?: boolean;
  label?: string;
  labelIcon?: string;
  inputIcon?: string;
  allowAnyOption?: boolean;
  disabled?: boolean;
}

type FormField<T> = IField & { name: keyof T };
