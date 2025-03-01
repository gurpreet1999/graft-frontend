import style from "./profile.module.css";
import { AdminBasicInfo, ChangePassword } from "widgets";
import classNames from "classnames";

export const ProfilePageAdmin = () => {
  return (
    <div className={classNames(style.container, "profile")}>
      <div className={style.content__wrapper}>
        <div className={style.wrapper}>
          <AdminBasicInfo />
        </div>
        <div className={style.wrapper}>
          <ChangePassword />
        </div>
      </div>
    </div>
  );
};
