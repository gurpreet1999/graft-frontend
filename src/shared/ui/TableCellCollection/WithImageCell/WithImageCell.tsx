import classNames from "classnames";
import style from "./WithImageCell.module.css";

interface IWithImageCellProps {
  image?: string;
  text: string;
  notHideOverflow?: boolean;
}

export const WithImageCell = ({
  image,
  text,
  notHideOverflow,
}: IWithImageCellProps) => (
  <div className={classNames(style.container)}>
    {image && <img src={image} alt="icon" />}
    <span className={classNames(!notHideOverflow && style.hide)}>{text}</span>
  </div>
);
