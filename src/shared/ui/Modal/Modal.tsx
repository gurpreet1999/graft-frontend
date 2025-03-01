import classNames from "classnames";
import style from "./Modal.module.css";
import closeIcon from "assets/images/modal/close.svg";
import { ScrollArea } from "@radix-ui/themes";

export interface IModalProps {
  children: React.ReactNode;
  title?: React.ReactNode;
  open: boolean;
  variant?: "side" | "center";
  onClose: () => void;
  headerClassName?: string;
  className?: string;
}

export const Modal = ({
  children,
  title,
  open,
  variant,
  onClose,
  headerClassName,
  className,
}: IModalProps) => {
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCloseByKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  if (variant === "side") {
    return (
      <div
        onClick={handleOutsideClick}
        onKeyUp={handleCloseByKey}
        className={classNames(style.container, open && style.open, style.side)}
        role="button"
        tabIndex={0}
      >
        <div className={classNames(style.modal, className)}>
          <div className={classNames(style.modal__header, headerClassName)}>
            <div className={style.modal__title}>{title}</div>
            <button className={style.modal__close} onClick={onClose}>
              <img src={closeIcon} alt="close" />
            </button>
          </div>
          <div className={style.modal__body}>{children}</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={classNames(style.container, open && style.open)}
      onClick={handleOutsideClick}
      onKeyUp={handleCloseByKey}
      role="button"
      tabIndex={0}
    >
      <div className={classNames(style.modal, className)}>
        <div
          className={classNames(
            style.modal__header,
            headerClassName,
            title && style.header__border
          )}
        >
          <div className={style.modal__title}>{title}</div>
          <button className={style.modal__close} onClick={onClose}>
            <img src={closeIcon} alt="close" />
          </button>
        </div>
        <ScrollArea className={style.modal__body}>{children}</ScrollArea>
      </div>
    </div>
  );
};
