export const getAppearance = (theme: string) =>
  ({
    theme: "stripe" as const,
    variables: {
      fontFamily: '"Inter", sans-serif',
      fontLineHeight: "1.5",
      borderRadius: "8px",
      colorPrimary: "#6366f1",
      colorBackground: theme === "dark" ? "#0f172a" : "#FFFFFF",
      colorText: theme === "dark" ? "#fff" : "#5A708B",
      colorTextPlaceholder: "#ADB9D7",
      spacingUnit: "4px",
      spacingGridRow: "16px",
      colorIconTabSelected: "#6366f1",
      colorIconCardBrand: theme === "dark" ? "#fff" : "#5A708B",
      colorIconCardCvc: theme === "dark" ? "#fff" : "#5A708B",
      colorIconCardExpiry: theme === "dark" ? "#fff" : "#5A708B",
      colorIconCardNumber: theme === "dark" ? "#fff" : "#5A708B",
    },
    rules: {
      ".Input": {
        padding: "16px",
        backgroundColor: theme === "dark" ? "#0f172a" : "#FFFFFF",
        borderColor: theme === "dark" ? "#1e293b" : "#5A708B",
        borderRadius: "8px",
        color: theme === "dark" ? "#fff" : "#5A708B",
        boxShadow: "none",
        outline: "none",
        borderWidth: theme === "dark" ? "2px" : "1px",
      },
      ".Input:focus": {
        borderColor: "#6366f1",
        outline: "none",
        boxShadow: "none",
      },
      ".Label": {
        color: "#ADB9D7",
      },
      ".Tab": {
        backgroundColor: theme === "dark" ? "#0f172a" : "#FFFFFF",
        borderColor: theme === "dark" ? "#1e293b" : "#5A708B",
        color: theme === "dark" ? "#fff" : "#5A708B",
      },
      ".Tab:hover": {
        backgroundColor: theme === "dark" ? "#1e293b" : "#5A708B",
      },
      ".Tab--selected": {
        backgroundColor: "#6366f1",
      },
      ".TabIcon": {
        color: theme === "dark" ? "#fff" : "#5A708B",
      },
      ".TabLabel": {
        color: theme === "dark" ? "#fff" : "#5A708B",
      },
    },
  }) as const;
