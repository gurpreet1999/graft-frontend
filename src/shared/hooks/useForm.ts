import { useCallback, useEffect, useState } from "react";
import { Validation } from "shared/validation";
import { findArrayNameById, findNameById } from "../helpers/findById";

type InitialData<T> = Partial<T>;

interface FormProps<T> {
  initialData: InitialData<T>;
  fields: (IField & { name: keyof T })[];
  suggestions?: IExperienceData | null;
  validateOnChange?: boolean;
}

export const useForm = <T extends RecordType>({
  initialData,
  fields,
  suggestions,
}: FormProps<T>) => {
  const [formData, setFormData] = useState(initialData);
  const [changesWereAdopted, setChangesWereAdopted] = useState(false);
  const [formDataChange, setFormDataChange] = useState(initialData);
  const [normalizedData, setNormalizedData] =
    useState<Partial<Record<keyof T, any>>>();
  const [errorsState, setErrorsState] = useState<ErrorState<T>>();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    setFormData(initialData);
    setFormDataChange(initialData);
  }, [initialData]);

  useEffect(() => {
    setFormDataChange(formData);
  }, [formData]);

  const handleInputChange = (key: string, value: string | string[]) => {
    setFormDataChange((prevData) => {
      const updatedData = { ...prevData, [key]: value };
      if (changesWereAdopted) {
        validateFields(updatedData);
      }
      return updatedData;
    });
  };

  const handleAutocompleteChange = (
    key: string,
    value: ISuggestion | ISuggestion[]
  ) => {
    setFormDataChange((prevData) => {
      const updatedData = Array.isArray(value)
        ? { ...prevData, [key]: value.map((v) => v.id) }
        : { ...prevData, [key]: value.id };
      if (changesWereAdopted) {
        validateFields(updatedData);
      }
      return updatedData;
    });
  };

  const handleSelectChange = (key: string, value: ISuggestion) => {
    setFormDataChange((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleCheckboxChange = (key: string) => {
    setFormDataChange((prevData) => ({
      ...prevData,
      [key]: !prevData[key],
    }));
  };

  const cancelSave = () => {
    setFormDataChange(formData);
    setIsEditing(!isEditing);
    setErrorsState(undefined);
    setChangesWereAdopted(false);
  };

  const clearForm = () => {
    const clearedData = Object.keys(formData).reduce(
      (acc, key) => {
        (acc as any)[key] = "";
        return acc;
      },
      {} as Partial<typeof formData>
    );

    setFormData(clearedData);
    setFormDataChange(clearedData);
    setErrorsState(undefined);
    setChangesWereAdopted(false);
  };

  const normalizeData = useCallback(
    (data: InitialData<T> | undefined): Partial<Record<keyof T, any>> => {
      if (!data) return {};
      const normalizedData: Partial<Record<keyof T, any>> = {};
      for (const key in data) {
        const value = data[key];
        if (!suggestions) return normalizedData;
        if (Array.isArray(value)) {
          normalizedData[key] = findArrayNameById(value, suggestions);
        } else {
          normalizedData[key] = findNameById(value, suggestions);
        }
      }
      return normalizedData;
    },
    [suggestions]
  );

  const validateFields = (
    updatedData: InitialData<T> | undefined = formDataChange
  ) => {
    if (!suggestions) return;
    const { errorsState, areErrorsFound } = Validation.validateFields<T>(
      fields,
      normalizeData(updatedData),
      suggestions
    );

    setErrorsState(errorsState);
    if (areErrorsFound) return errorsState;

    return null;
  };

  const saveChanges = (
    updatedData: InitialData<T> | undefined = formDataChange
  ) => {
    if (!suggestions) return;
    setChangesWereAdopted(true);
    const errors = validateFields(updatedData);
    if (errors) return errors;

    setFormData(updatedData);
    setIsEditing(!isEditing);
    return null;
  };

  useEffect(() => {
    setNormalizedData(normalizeData(formDataChange));
  }, [initialData, formDataChange, normalizeData]);

  return {
    formData,
    formDataChange,
    fields,
    normalizedData,
    errorsState,
    isEditing,
    handleInputChange,
    handleAutocompleteChange,
    handleCheckboxChange,
    handleSelectChange,
    cancelSave,
    saveChanges,
    validateFields,
    setFormData,
    clearForm,
  };
};
