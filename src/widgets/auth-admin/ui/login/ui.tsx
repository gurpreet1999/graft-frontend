import style from "./login.module.css";
import { Heading } from "shared/ui";
import userIcon from "assets/images/jobs/User.svg";
import { LoginAdminForm } from "features/login-admin-form";

export const AdminLogin = () => {
  return (
    <div className={style.container}>
      <div className={style.img}>
        <img src={userIcon} alt="login" />
      </div>
      <Heading variant="h1">Log in</Heading>
      <LoginAdminForm />
    </div>
  );
};
