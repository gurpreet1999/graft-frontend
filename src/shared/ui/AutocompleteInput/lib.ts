import { useMemo } from "react";

export const isISuggestion = (obj: any): obj is ISuggestion => {
  return obj && typeof obj === "object" && "id" in obj && "value" in obj;
};

export const useFilteredSuggestions = (
  fieldValue: ISuggestion,
  suggestions?: ISuggestion[]
) => {
  return useMemo(() => {
    if (suggestions && fieldValue && typeof fieldValue.value === "string") {
      const query = fieldValue.value.toLowerCase();
      return [...suggestions]
        .sort((a, b) => a.value.localeCompare(b.value))
        .filter((suggestion) => suggestion.value.toLowerCase().includes(query));
    }
    return suggestions;
  }, [fieldValue, suggestions]);
};
