import { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../../shared/ui/Theme/useThemes";
import { ThemeProvider } from "../../shared/ui/Theme/ThemeProvider";
import LogoLight from "assets/images/logo-light.svg";
import LogoDark from "assets/images/logo-dark.svg";
import style from "./SideNav.module.css";
import { usePageWidth } from "shared/hooks";

interface ISideNav {
  routes: IRoute[];
}

export interface IRoute {
  path: string;
  name: string;
  icon?: string;
  showInSidebar?: boolean;
  element?: () => JSX.Element;
}

export const SideNav = ({ routes }: ISideNav) => {
  const width = usePageWidth();
  const [openBurger, setOpenBurger] = useState(false);
  const { theme } = useTheme();
  const logo = theme === "light" ? LogoLight : LogoDark;

  const sidebarRoutes = useMemo(
    () => routes.filter((route) => route.showInSidebar),
    [routes]
  );

  return (
    <>
      <div className={`${style.container} ${openBurger && style.open}`}>
        <div className={style.container__inner}>
          <nav className={style.nav}>
            <a className={style.nav__logo} href="https://www.onthegraft.co.uk/">
              <img src={logo} alt="logo" />
            </a>
            <ul className={style.nav__list}>
              {sidebarRoutes.map((route, index) => (
                <li key={index} className={style.nav__item}>
                  <NavLink
                    to={route.path}
                    onClick={() => {
                      setOpenBurger(false);
                    }}
                    className={({ isActive }) =>
                      isActive
                        ? `${style.nav__link} ${style.active}`
                        : style.nav__link
                    }
                  >
                    <img src={route.icon} alt="icon" />
                    <span>{route.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className={style.toggler}>
            <ThemeProvider.Toggler
              size={width <= 1440 && width > 768 ? "small" : "large"}
            />
          </div>
        </div>
      </div>
      <button
        className={style.burger}
        onClick={() => {
          setOpenBurger(!openBurger);
        }}
      >
        <span></span>
      </button>
    </>
  );
};
