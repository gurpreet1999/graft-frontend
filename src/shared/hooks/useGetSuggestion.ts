import { useEffect, useState } from "react";
import { ExperienceApi } from "shared/api";

export const useGetSuggestions = () => {
  const [suggestions, setSuggestions] = useState<IExperienceData>();
  const [loading, setLoading] = useState(false);

  const getSuggestion = async () => {
    setLoading(true);
    ExperienceApi.getExperience().then((res) => {
      setSuggestions(res);
      setLoading(false);
    });
  };

  useEffect(() => {
    setLoading(true);
    getSuggestion();
  }, []);

  return { suggestions, loading, getSuggestion };
};
