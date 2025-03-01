import { ExperienceActions } from "entities/experience";
import { AppDispatch, RootState } from "entities/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useFetchSuggestions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { experience, suggestions, status } = useSelector(
    (state: RootState) => state.experience
  );

  useEffect(() => {
    dispatch(ExperienceActions.getExperience());
  }, [dispatch]);

  return { experience, suggestions, status };
};
