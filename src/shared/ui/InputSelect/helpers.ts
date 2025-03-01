export const transformStatusOptions = (statuses: string[]) => {
  return statuses.map((status) => ({
    id: status,
    name: status.charAt(0) + status.slice(1).toLowerCase().replace("_", " "),
  }));
};
