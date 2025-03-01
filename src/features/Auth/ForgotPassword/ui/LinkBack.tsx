import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import style from "../ForgotPassword.module.css";

export const LinkBack = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
  handleRequest?: RequestFunction;
}) => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/auth/login");
  };
  return (
    <button
      className={classNames(className, style.link__default)}
      onClick={handleBack}
    >
      {children}
    </button>
  );
};
