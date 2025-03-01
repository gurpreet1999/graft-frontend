import classNames from "classnames";
import style from "./GradientCard.module.css";

interface IGradientCardProps {
  children: React.ReactNode;
  className?: string;
}

export const GradientCard = ({ children, className }: IGradientCardProps) => {
  return (
    <div className={classNames(style.gradientCard, className)}>{children}</div>
  );
};
