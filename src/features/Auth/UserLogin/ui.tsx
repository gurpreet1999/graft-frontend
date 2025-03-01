import { useEffect, useState } from "react";
import style from "./UserLogin.module.css";
import { Button, Checkbox, Input, SnackBar } from "shared/ui";
import mailIcon from "assets/images/sign-in/login/mail.svg";
import passwordIcon from "assets/images/sign-in/login/password.svg";
import { Link } from "shared/ui/Link/Link";
import { Auth } from "../lib";
import { Validation } from "shared/validation";
import resetIcon from "assets/images/sign-in/login/resetPassword.png";

interface IUserLoginProps {
  role: string;
}

export const UserLogin = ({ role }: IUserLoginProps) => {
  const [rememberMe, setRememberMe] = useState(false);

  const [showMigrate, setShowMigrate] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkValidationOnChange, setCheckValidationOnChange] = useState(false);

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, [role]);

  const [errorEmail, setErrorEmail] = useState<string[]>([]);
  const [errorPassword, setErrorPassword] = useState<string[]>([]);

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (checkValidationOnChange) setErrorEmail(Validation.validateEmail(value));
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (checkValidationOnChange)
      setErrorPassword(Validation.validateLoginPassword(value));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailError = Validation.validateEmail(email);
    const passwordError = Validation.validateLoginPassword(password);

    setErrorEmail(emailError);
    setErrorPassword(passwordError);

    if (emailError.length > 0 || passwordError.length > 0) {
      setCheckValidationOnChange(true);
      SnackBar({ text: "Please fill all fields" });
      return;
    }

    try {
      await Auth.login({ role, email, password, rememberMe });
      setShowMigrate(false);
    } catch (error) {
      if (error === 400) {
        setShowMigrate(true);
      }
    }
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
            handleChange={handleEmailChange}
            error={errorEmail}
          />
          <Input
            value={password}
            type="password"
            placeholder="Password"
            icon={passwordIcon}
            isPassword
            handleChange={handlePasswordChange}
            error={errorPassword}
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
          <Link text="Forgot password?" href="/auth/forgot-password" />
        </div>
      </div>

      <div className={style.buttons}>
        {showMigrate && (
          <div className={style.migrate__container}>
            <div className={style.icon}>
              <img src={resetIcon} alt="reset" />
            </div>
            <div className={style.text}>
              <div className={style.info}>Used Graft sooner than others?</div>
              <Link
                className={style.link}
                text="Reset password"
                href="/auth/forgot-password"
              />
            </div>
          </div>
        )}
        <Button type="submit">
          <span>Log In</span>
        </Button>
        <Link text="Sign Up" className={style.link} href="/auth/signup" />
      </div>
    </form>
  );
};
