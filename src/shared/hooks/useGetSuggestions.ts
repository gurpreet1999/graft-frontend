import { RootState } from "entities/store";
import { useSelector } from "react-redux";

export const useGetSuggestions = () => {
  const { experience, suggestions, status } = useSelector(
    (state: RootState) => state.experience
  );

  return { suggestions, experience, status };
};
