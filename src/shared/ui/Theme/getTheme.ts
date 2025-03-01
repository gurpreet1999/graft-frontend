import { Theme } from "./ThemeContext";

export const getTheme = (StorageKey: string): Theme => {
  let theme = localStorage.getItem(StorageKey);

  if (!theme) {
    localStorage.setItem(StorageKey, "dark");
    theme = "dark";
  }

  return theme as Theme;
};
