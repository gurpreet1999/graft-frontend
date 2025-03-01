import { Link } from "react-router-dom";
import style from "./Buttons.module.css";
import classNames from "classnames";

interface ButtonProps {
  className?: string;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
  disabled?: boolean;
  type?: "submit" | "button" | "reset";
  variant?: "primary" | "primaryBlue" | "red" | "default";
}

export const Button = ({
  className,
  onClick,
  href,
  children,
  disabled,
  type,
  variant = "default",
}: ButtonProps) => {
  let buttonClass;
  switch (variant) {
    case "primary":
      buttonClass = style.primaryButton;
      break;
    case "primaryBlue":
      buttonClass = style.primaryButtonBlue;
      break;
    case "red":
      buttonClass = style.buttonRed;
      break;
    default:
      buttonClass = style.button;
  }

  if (variant !== "default") {
    buttonClass = classNames(buttonClass, style.smallOnMobile);
  }

  const buttonComponent = href ? (
    <Link
      to={href}
      className={classNames(style.baseButton, buttonClass, className)}
    >
      {children}
    </Link>
  ) : (
    <button
      className={classNames(style.baseButton, buttonClass, className)}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );

  return buttonComponent;
};
