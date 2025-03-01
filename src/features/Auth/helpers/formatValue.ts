export const formatValue = (value: string | string[]): string => {
  return Array.isArray(value) ? value.join(", ") : value;
};
