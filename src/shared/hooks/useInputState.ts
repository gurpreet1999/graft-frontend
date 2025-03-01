import { useState } from "react";

type SetValue<T> = (value: T) => void;
type SetError = (error: string[]) => void;

export type Value = string | string[] | ISuggestion | ISuggestion[];
export type UseInputStateResult<T extends Value> = {
  value: T;
  error: string[];
  setValue: SetValue<T>;
  setErrorState: SetError;
};

export const useInputState = <T extends Value>(
  initialValue: T
): UseInputStateResult<T> => {
  const [value, setInputValue] = useState<T>(initialValue);
  const [error, setError] = useState<string[]>([]);

  const setValue: SetValue<T> = (value) => {
    setError([]);
    setInputValue(value);
  };

  const setErrorState: SetError = (error) => {
    setError(error);
  };

  return {
    value,
    error,
    setValue,
    setErrorState,
  };
};
