import style from "../ForgotPassword.module.css";
import { Heading } from "shared/ui";
import envelopeIcon from "assets/images/sign-in/envelope.svg";
import { LinkBack } from "./LinkBack";

export const EmailConfirm = ({ email }: { email: string }) => {
  return (
    <div className={style.container}>
      <div className={style.text}>
        <div className={style.icon__container}>
          <img src={envelopeIcon} alt="envelope" />
        </div>
        <Heading variant="h1">Check your inbox</Heading>
        <span className={style.email__text}>
          Magic Link has been sent to email {email} with instructions how to
          reset your password. If it doesn’t arrive soon, check your spam folder
          or choose other method
        </span>
        <LinkBack>Back to Log In</LinkBack>
      </div>
    </div>
  );
};
