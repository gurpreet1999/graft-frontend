import { useState } from "react";
import style from "./UserLogin.module.css";
import { Button, Checkbox, Input, Link, SnackBar } from "shared/ui";
import mailIcon from "assets/images/sign-in/login/mail.svg";
import passwordIcon from "assets/images/sign-in/login/password.svg";
import { Validation } from "shared/validation";
import { AuthActions } from "entities/user";
import { store } from "entities/store";

export const LoginAdminForm = () => {
  const [rememberMe, setRememberMe] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorEmail, setErrorEmail] = useState<string[]>([]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailError = Validation.validateEmail(email);

    if (emailError.length > 0) {
      setErrorEmail(emailError);
      SnackBar({ text: "Please fill all fields" });
      return;
    }

    await store
      .dispatch(
        AuthActions.adminLogin({
          role: "ADMIN",
          email,
          password,
          rememberMe,
        })
      )
      .unwrap();
  };

  return (
    <form className={style.container} onSubmit={handleLogin}>
      <div className={style.inputs}>
        <div className={style.inputs}>
          <Input
            value={email}
            type="email"
            placeholder="Email"
            icon={mailIcon}
            handleChange={setEmail}
            error={errorEmail}
          />
          <Input
            value={password}
            type="password"
            placeholder="Password"
            icon={passwordIcon}
            isPassword
            handleChange={setPassword}
          />
        </div>
        <div className={style.additional}>
          <Checkbox
            label="Remember me"
            checked={rememberMe}
            className={style.checkbox}
            handleCheck={() => {
              setRememberMe(!rememberMe);
            }}
          />
          <Link text="Forgot password?" href="/auth/forgot-password?admin" />
        </div>
      </div>

      <div className={style.buttons}>
        <Button type="submit">
          <span>Log In</span>
        </Button>
      </div>
    </form>
  );
};
