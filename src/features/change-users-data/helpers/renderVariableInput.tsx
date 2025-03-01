import { VariableInput } from "features/variable-input/ui";

interface IRenderVariableInputProps<T> {
  fields: (IField & { name: keyof T })[];
  formState: Partial<T>;
  errorsState: Record<keyof Partial<T>, string[]> | undefined;
  handleInputChange?: (name: string, value: string) => void;
  isEditing: boolean;
}

export function renderVariableInput<T>({
  fields,
  formState,
  errorsState,
  handleInputChange,
  isEditing,
}: IRenderVariableInputProps<T>): JSX.Element[] {
  return fields.map(({ name, placeholder, type }) => {
    const value = formState[name];
    let error;
    if (errorsState) {
      error = errorsState[name];
    }

    const handleChange = (value: string) => {
      if (handleInputChange) {
        handleInputChange(name as string, value);
      }
    };

    return (
      <VariableInput
        key={name}
        label={placeholder}
        value={value as string}
        type={type}
        isEditing={isEditing}
        handleChange={handleChange}
        error={error}
      />
    );
  });
}
