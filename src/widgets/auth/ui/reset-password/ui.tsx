import { ResetPassword as ResetPasswordFlow } from "features/Auth";
import { useParams } from "react-router-dom";
import { Heading } from "shared/ui";
import style from "./ResetPassword.module.css";
import { useCheckToken } from "shared/hooks";
import { Link } from "shared/ui/Link/Link";

type Method = "email" | "phone";

export const ResetPassword = ({ method }: { method: Method }) => {
  const passwordResetToken = useParams().id || "";
  const { isValid, loading, error } = useCheckToken(passwordResetToken);

  if (method === "email") {
    if (loading) {
      return (
        <div className={style.container}>
          <div className={style.text}>
            <Heading variant="h1">Loading...</Heading>
          </div>
        </div>
      );
    }

    if (!isValid) {
      return (
        <div className={style.container}>
          <div className={style.text}>
            <Heading variant="h1">Invalid token</Heading>
            <span>
              {error ||
                "The token is invalid or has expired. Please try again."}
            </span>
          </div>
          <Link href="/auth/forgot-password" text="Request a new token" />
        </div>
      );
    }
  }

  return (
    <div className={style.container}>
      <div className={style.text}>
        <Heading variant="h1">Create new password</Heading>
        <span>Set the new password for your account</span>
      </div>
      <div className={style.inputs}>
        <ResetPasswordFlow passwordResetToken={passwordResetToken} />
      </div>
    </div>
  );
};
