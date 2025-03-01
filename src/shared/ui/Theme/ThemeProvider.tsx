import React, { useEffect, useState } from "react";
import style from "./Theme.module.css";
import { supportedThemes, ThemeContext, Theme } from "./ThemeContext";
import { useTheme } from "./useThemes";
import lightIcon from "assets/images/toggler/light.svg";
import darkIcon from "assets/images/toggler/dark.svg";
import { getTheme } from "./getTheme";
import classNames from "classnames";

interface IThemeProvider {
  children: React.ReactNode;
}

const StorageKey = "theme";

export const ThemeProvider = ({ children }: IThemeProvider) => {
  const [theme, setTheme] = useState<Theme>(getTheme(StorageKey));

  useEffect(() => {
    localStorage.setItem(StorageKey, theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        supportedThemes,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

type Size = "small" | "medium" | "large";

ThemeProvider.Toggler = function SimpleToggler({ size }: { size?: Size }) {
  const { theme, setTheme } = useTheme();

  const sizeStyles = {
    small: style.small,
    medium: style.medium,
    large: style.large,
  };

  const handleChangeTheme = (buttonTheme: string) => {
    if (size === "small") {
      buttonTheme === "light" ? setTheme("dark") : setTheme("light");
      return;
    }
    buttonTheme === "light" ? setTheme("light") : setTheme("dark");
  };

  return (
    <div className={classNames(style.container, size && sizeStyles[size])}>
      <button
        onClick={() => handleChangeTheme("light")}
        className={classNames(
          theme === "light" && style.active,
          style.toggle,
          style._light
        )}
      >
        <div className={style.toggle_inner}>
          <img src={lightIcon} alt="light" />
          <span>Light</span>
        </div>
      </button>
      <button
        onClick={() => handleChangeTheme("dark")}
        className={classNames(theme === "dark" && style.active, style.toggle)}
      >
        <div className={style.toggle_inner}>
          <img src={darkIcon} alt="dark" />
          <span>Dark</span>
        </div>
      </button>
    </div>
  );
};
