import { useRef, useState } from "react";
import style from "./InputSelectNumber.module.css";
import classNames from "classnames";
import arrow from "assets/images/arrow-down.svg";
import { useClickOutside } from "shared/hooks/useClickOutside";

interface IInput {
  icon?: string;
  value?: string;
  placeholder: string;
  handleChange: (value: string) => void;
  label?: string;
  labelIcon?: string;
  className?: string;
  useMaxOption?: boolean;
}

export const InputSelectNumber = ({
  icon,
  value,
  placeholder,
  handleChange,
  label,
  labelIcon,
  className,
  useMaxOption,
}: IInput) => {
  const [openSelect, setOpenSelect] = useState(false);
  const selectRef = useRef<HTMLButtonElement>(null);

  useClickOutside(selectRef, () => {
    setOpenSelect(false);
  });

  const handleButtonClick = () => {
    setOpenSelect(!openSelect);
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
        className={classNames(style.input__container)}
      >
        {icon && <img src={icon} alt="Icon" />}
        <input
          type="text"
          value={value || ""}
          className={style.input}
          placeholder={placeholder}
        />
        <img
          src={arrow}
          alt="arrow"
          className={classNames(style.arrow, openSelect && style.open)}
        />
        {openSelect && (
          <div className={classNames(style.select)}>
            {Array.from({ length: 11 }, (_, i) => i * 100).map((number) => (
              <button
                key={number}
                className={style.option}
                onClick={() => handleChange(number.toString())}
              >
                {number}
              </button>
            ))}
            {useMaxOption && (
              <button
                className={style.option}
                onClick={() => handleChange("max")}
              >
                Max
              </button>
            )}
          </div>
        )}
      </button>
    </div>
  );
};
