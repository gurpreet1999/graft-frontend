import classNames from "classnames";
import style from "./LongTextCell.module.css";

interface ILongTextCellProps {
  text: string;
  size?: "small" | "medium" | "large";
  className?: string;
}

const sizeClass = {
  small: style.small,
  medium: style.medium,
  large: style.large,
};

export const LongTextCell = ({ text, size, className }: ILongTextCellProps) => (
  <div
    className={classNames(style.container, className, size && sizeClass[size])}
  >
    <span>{text}</span>
  </div>
);
