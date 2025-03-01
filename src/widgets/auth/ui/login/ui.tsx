import { useState } from "react";
import style from "./login.module.css";
import { Heading, AuthSwitcher } from "shared/ui";
import { UserLogin } from "features/Auth";

export const Login = () => {
  const [role, setRole] = useState<Role>("CANDIDATE");
  const handleActiveRole = (value: Role) => setRole(value);

  return (
    <div className={style.container}>
      <Heading variant="h1">Log in</Heading>
      <AuthSwitcher role={role} handleActive={handleActiveRole} />
      <UserLogin role={role} />
    </div>
  );
};
