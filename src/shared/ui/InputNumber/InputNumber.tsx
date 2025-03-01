import { useEffect, useState } from "react";
import style from "./InputNumber.module.css";
import classNames from "classnames";

interface InputNumber {
  type?: string;
  value?: string;
  placeholder: string;
  handleChange: (value: string) => void;
  className?: string;
  label?: string | JSX.Element;
  labelImg?: string;
  disabled?: boolean;
  error?: string[];
}

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
export const InputNumber = ({
  type = "number",
  value,
  placeholder,
  className,
  handleChange,
  label,
  labelImg,
  disabled,
  error,
}: InputNumber) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    handleChange(e.target.value);
  };

  return (
    <div className={style.container}>
      <label className={style.label}>
        {labelImg && <img src={labelImg} alt="icon" />}
        {label && <span>{label}</span>}
      </label>
      <div
        className={classNames(
          className,
          style.input__container,
          error?.length !== 0 && error !== undefined && style.error
        )}
      >
        <input
          type={type}
          value={inputValue}
          onChange={handleChangeValue}
          className={style.input}
          placeholder={placeholder}
          disabled={disabled}
        />
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
