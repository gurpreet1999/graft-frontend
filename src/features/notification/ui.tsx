import { useEffect, useState } from "react";
import style from "./notification.module.css";
import { useTheme } from "shared/ui/Theme/useThemes";
import notificationIconLight from "assets/images/notification/notigication-light.svg";
import notificationIconDark from "assets/images/notification/notification-dark.svg";
import example1 from "assets/images/notification/example1.png";
import example2 from "assets/images/notification/example2.png";
import example3 from "assets/images/notification/example3.png";

const notificationList = [
  {
    id: 1,
    img: example1,
    from: "Gustavo Lubin",
    occupation: "Just now",
    description: "Figma ipsum component",
  },
  {
    id: 2,
    img: example2,
    from: "Annette Black",
    occupation: "2 mins ago",
    description: "Figma ipsum component",
  },
  {
    id: 3,
    img: example3,
    from: "Kadin Press",
    occupation: "3 hours ago",
    description: "Figma ipsum component",
  },
];

export const Notification = () => {
  const [openNotification, setOpenNotification] = useState(false);
  const { theme } = useTheme();
  const notificationIcon =
    theme === "light" ? notificationIconLight : notificationIconDark;

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(`.${style.container}`)) {
        setOpenNotification(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className={style.container}>
      <button
        onClick={() => {
          setOpenNotification(!openNotification);
        }}
        className={`${style.notification__icon} ${openNotification && style.open}`}
      >
        <img src={notificationIcon} alt="notification" />
      </button>
      {openNotification && (
        <div className={style.notification__list}>
          <ul className={style.notification__container}>
            {notificationList.map((notification) => (
              <>
                <li key={notification.id} className={style.notification__item}>
                  <div className={style.notification__header}>
                    <img
                      src={notification.img}
                      alt="notification"
                      className={style.notification__img}
                    />
                    <p className={style.notification__from}>
                      {notification.from}
                    </p>
                    <p className={style.notification__time}>
                      {notification.occupation}
                    </p>
                  </div>
                  <p className={style.notification__description}>
                    {notification.description}
                  </p>
                </li>
                {notification.id !== notificationList.length && (
                  <span className={style.notification__divider} />
                )}
              </>
            ))}
          </ul>
          <button className={style.notification__read}>Mark all as read</button>
        </div>
      )}
    </div>
  );
};
