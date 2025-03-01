import { useEffect, useState } from "react";
import style from "./user-menu.module.css";
import avatar from "assets/images/user-menu/avatar.png";
import avatarLight from "assets/images/user-menu/avatar-light.png";
import profile from "assets/images/user-menu/profile.svg";
import signout from "assets/images/user-menu/signout.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthActions } from "entities/user";
import { useDispatch } from "react-redux";
import { AppDispatch } from "entities/store";
import { useGetCurrentUser } from "shared/hooks";
import { useTheme } from "shared/ui";

export const UserMenu = () => {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const { userData } = useGetCurrentUser();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const avatarSrc = theme === "light" ? avatarLight : avatar;

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(`.${style.container}`)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const handleLogout = async () => {
    dispatch(AuthActions.logout());
    navigate("/auth/login");
  };

  return (
    <div className={style.user}>
      <button
        className={style.container}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <img src={avatarSrc} alt="avatar" />
        <div className={style.user__info}>
          {userData && (
            <span className={style.user__name}>
              {userData.first_name} {userData.last_name}
            </span>
          )}
          <span className={style.user__role}>User</span>
        </div>
      </button>
      {open && (
        <div className={style.dropdown}>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? `${style.link} ${style.active}` : style.link
            }
          >
            <img src={profile} alt="" /> Profile
          </NavLink>
          {/* <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive ? `${style.link} ${style.active}` : style.link
            }
          >
            <img src={settings} alt="" /> Settings
          </NavLink> */}
          <button onClick={handleLogout} className={style.link}>
            <img src={signout} alt="" /> Logout
          </button>
        </div>
      )}
    </div>
  );
};
