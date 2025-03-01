import { useForm } from "./useForm";
import { useGetSuggestions } from "./useGetSuggestions";

export const useInitializeForm = <T>(
  initialData: Partial<T>,
  fields: FormField<T>[]
) => {
  const { suggestions } = useGetSuggestions();
  return useForm({
    initialData,
    fields,
    suggestions,
  });
};
