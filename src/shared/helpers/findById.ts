export const findArrayNameById = (
  id: string[] | undefined,
  data: { [key: string]: { id: string; value: string }[] } | undefined
) => {
  const result: ISuggestion[] = [];

  if (!data || !id) {
    return [];
  }

  if (id.includes("any")) {
    return [{ id: "any", value: "Any" }];
  }

  for (const key in data) {
    data[key].forEach((item) => {
      if (id.includes(item.id)) {
        result.push({
          id: item.id,
          value: item.value,
        });
      }
    });
  }

  return result;
};

export const findNameById = (
  id: string | undefined,
  data: IExperienceData | undefined
) => {
  if (!data) {
    return id;
  }

  if (id === "any") {
    return { id: "any", value: "Any" };
  }

  for (const key in data) {
    const item = data[key].find((item) => item.id === id);
    if (item) {
      return {
        id: item.id,
        value: item.value,
      };
    }
  }

  return id;
};
