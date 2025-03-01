import { useRef, useState } from "react";
import style from "./SelectSuggestion.module.css";
import classNames from "classnames";
import arrow from "assets/images/arrow-down.svg";
import { useClickOutside } from "shared/hooks/useClickOutside";

interface ISelectSuggestion {
  icon?: string;
  value?: ISuggestion;
  placeholder: string;
  options: ISuggestion[];
  handleChange: (value: ISuggestion) => void;
  label?: string;
  labelIcon?: string;
  className?: string;
  disabled?: boolean;
  hideDelete?: boolean;
}

export const SelectSuggestion = ({
  icon,
  value,
  placeholder,
  options,
  handleChange,
  label,
  labelIcon,
  className,
  disabled,
  hideDelete,
}: ISelectSuggestion) => {
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
    handleChange({ id: "", value: "" });
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
          value={value?.value || ""}
          className={style.input}
          placeholder={placeholder}
        />
        {!disabled && (
          <div className={style.arrow}>
            {value?.value !== "" && !hideDelete ? (
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
                key={option.value}
                type="button"
                onClick={() => {
                  handleChange(option);
                  setOpenSelect(false);
                }}
                className={classNames(
                  value?.value === option.value ? style.active : undefined,
                  style.option
                )}
              >
                {option.value}
              </button>
            ))}
          </div>
        )}
      </button>
    </div>
  );
};
