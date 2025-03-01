import { createContext } from "react";

interface IThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  supportedThemes: typeof supportedThemes;
}

export const supportedThemes = {
  light: "light",
  dark: "dark",
};

export type Theme = keyof typeof supportedThemes;

export const ThemeContext = createContext<IThemeContextProps | undefined>(
  undefined
);
