import { useEffect, useState } from "react";
import style from "./Input.module.css";
import showIcon from "assets/images/sign-in/login/show.svg";
import classNames from "classnames";

interface IInput {
  type: string;
  icon?: string;
  value?: string;
  placeholder: string;
  isPassword?: boolean;
  handleChange: (value: string) => void;
  error?: string | string[];
  className?: string;
  containerClassName?: string;
  label?: string;
  labelIcon?: string;
  inputIcon?: string;
  disabled?: boolean;
  withoutImgLine?: boolean;
  maxNumber?: number;
}

const getType = (
  isPassword: boolean | undefined,
  showPassword: boolean,
  type?: string
) => {
  if (isPassword) {
    return showPassword ? "text" : "password";
  }
  return type;
};

/**
 * Input component for user input.
 *
 * @param {Object} props - The props object.
 * @param {string} props.type - The type of input element.
 * @param {string} props.icon - The URL of the icon image.
 * @param {string} props.value - The current value of the input.
 * @param {string} props.placeholder - The placeholder text for the input.
 * @param {boolean} props.isPassword - Indicates whether the input is a password field.
 * @param {function} props.handleChange - The callback function to handle input changes.
 * @param {string} props.error - The error message to display, if any.
 * @returns The rendered input component.
 */
export const Input = ({
  type,
  icon,
  value,
  placeholder,
  isPassword,
  error,
  className,
  handleChange,
  label,
  labelIcon,
  inputIcon,
  disabled,
  withoutImgLine,
  maxNumber,
  containerClassName,
}: IInput) => {
  const [inputValue, setInputValue] = useState(value);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    handleChange(e.target.value);
  };

  return (
    <div className={classNames(disabled && style.disabled, containerClassName)}>
      {(label || labelIcon) && (
        <div className={style.label__container}>
          {labelIcon && <img src={labelIcon} alt="Icon" />}
          {label && <label className={style.label}>{label}</label>}
        </div>
      )}
      <div
        className={classNames(
          error?.length !== 0 && error !== undefined && style.error,
          className,
          style.container
        )}
      >
        <div className={style.wrapper}>
          {icon && (
            <>
              <img src={icon} alt="Icon" /> {!withoutImgLine && <span></span>}
            </>
          )}
          <input
            type={getType(isPassword, showPassword, type)}
            value={inputValue}
            onChange={handleChangeValue}
            className={style.input}
            placeholder={placeholder}
            disabled={disabled}
            max={maxNumber}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={style.showButton}
            >
              <img src={showIcon} alt="show" />
            </button>
          )}
          {inputIcon && (
            <img src={inputIcon} className={style.inputIcon} alt="show" />
          )}
        </div>
      </div>
      {error &&
        (error instanceof Array ? (
          <div className={style.error__container}>
            {error.map((err, index) => (
              <div key={index} className={style.error}>
                <p className={style.error__text}>{err}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className={style.error}>
            <p className={style.error__text}>{error}</p>
          </div>
        ))}
    </div>
  );
};
