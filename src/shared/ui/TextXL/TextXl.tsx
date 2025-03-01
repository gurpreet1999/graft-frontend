import classNames from "classnames";
import style from "./TextXl.module.css";

interface TextXlProps {
  children: React.ReactNode;
  classname?: string;
}

export const TextXl = ({ children, classname }: TextXlProps) => {
  return <p className={classNames(style.text, classname)}>{children}</p>;
};
