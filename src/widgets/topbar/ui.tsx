import style from "./topbar.module.css";
import { UserMenu } from "features/user-menu";

export const TopBar = () => {
  return (
    <div className={style.container}>
      {/* <div className={style.search__container}>
        <Search />
      </div> */}
      <div className={style.user__container}>
        {/* <div className={style.notification__container}>
          <Notification />
        </div> */}
        <div className={style.user__container}>
          <UserMenu />
        </div>
      </div>
    </div>
  );
};
