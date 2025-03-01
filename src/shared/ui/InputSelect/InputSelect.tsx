import { useRef, useState } from "react";
import style from "./InputSelect.module.css";
import classNames from "classnames";
import arrow from "assets/images/arrow-down.svg";
import { useClickOutside } from "shared/hooks/useClickOutside";

interface IInput {
  icon?: string;
  value?: IDocumentType;
  placeholder: string;
  options: IDocumentType[];
  handleChange: (value: IDocumentType) => void;
  label?: string;
  labelIcon?: string;
  className?: string;
  disabled?: boolean;
}

export const InputSelect = ({
  icon,
  value,
  placeholder,
  options,
  handleChange,
  label,
  labelIcon,
  className,
  disabled,
}: IInput) => {
  const [openSelect, setOpenSelect] = useState(false);
  const selectRef = useRef<HTMLButtonElement>(null);

  useClickOutside(selectRef, () => {
    setOpenSelect(false);
  });

  const handleButtonClick = () => {
    if (disabled) return;
    setOpenSelect(!openSelect);
  };

  const clearInput = () => {
    handleChange({ id: "", name: "" });
    setOpenSelect(false);
  };

  return (
    <div className={classNames(style.container, className)}>
      {(label || labelIcon) && (
        <div className={style.label__container}>
          {labelIcon && <img src={labelIcon} alt="Icon" />}
          {label && <label className={style.label}>{label}</label>}
        </div>
      )}
      <button
        type="button"
        onClick={handleButtonClick}
        ref={selectRef}
        className={classNames(
          style.input__container,
          disabled && style.disabled,
          openSelect && style.openSelect
        )}
      >
        {icon && <img src={icon} alt="Icon" />}
        <input
          type="text"
          value={value?.name || ""}
          className={style.input}
          placeholder={placeholder}
        />
        {!disabled && (
          <div className={style.arrow}>
            {value?.name !== "" ? (
              <button className={style.delete} onClick={clearInput} />
            ) : (
              <img src={arrow} alt="arrow" />
            )}
          </div>
        )}
        {openSelect && (
          <div className={classNames(style.select)}>
            {options.map((option) => (
              <button
                key={option.name}
                type="button"
                onClick={() => {
                  handleChange(option);
                  setOpenSelect(false);
                }}
                className={classNames(
                  value?.name === option.name ? style.active : undefined,
                  style.option
                )}
              >
                {option.name}
              </button>
            ))}
          </div>
        )}
      </button>
    </div>
  );
};
