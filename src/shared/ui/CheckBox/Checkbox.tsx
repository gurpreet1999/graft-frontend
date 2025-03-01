import checkboxAuthTrue from "assets/images/sign-in/login/checkboxTrue.svg";
import checkboxAuthFalse from "assets/images/sign-in/login/checkboxFalse.svg";
import checkboxOutlineFalseDark from "assets/images/checkbox/CheckBoxOutlineDark.svg";
import checkboxOutlineTrueDark from "assets/images/checkbox/CheckBoxFilledDark.svg";
import checkboxOutlineFalseLight from "assets/images/checkbox/CheckBoxOutlineLight.svg";
import checkboxOutlineTrueLight from "assets/images/checkbox/CheckBoxFilledLight.svg";
import checkboxFillInner from "assets/images/checkbox/CheckBoxFillInnerDark.svg";
import style from "./Checkbox.module.css";
import { useTheme } from "../Theme/useThemes";
import classNames from "classnames";

interface ICheckbox {
  checked: boolean;
  label: JSX.Element | string;
  className?: string;
  handleCheck?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  filled?: boolean;
}

/**
 * Checkbox component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} props.checked - Indicates whether the checkbox is checked or not.
 * @param {string} props.label - The label text for the checkbox.
 * @param {Function} props.handleCheck - The function to handle checkbox state changes.
 * @returns The rendered Checkbox component.
 */
export const AuthCheckbox = ({ checked, label, handleCheck }: ICheckbox) => {
  return (
    <label className={style.container_auth}>
      <div className={style.checkbox__container_auth}>
        <input type="checkbox" checked={checked} onChange={handleCheck} />
        <img
          src={checked ? checkboxAuthTrue : checkboxAuthFalse}
          alt="checkbox"
        />
      </div>
      <span>{label}</span>
    </label>
  );
};

const getCheckboxTrue = (theme: string, filled?: boolean) => {
  if (filled) return checkboxFillInner;
  return theme === "light" ? checkboxOutlineTrueLight : checkboxOutlineTrueDark;
};

export const Checkbox = ({
  checked,
  label,
  handleCheck,
  className,
  disabled,
  filled,
}: ICheckbox) => {
  const { theme } = useTheme();
  const checkboxTrue = getCheckboxTrue(theme, filled);
  const checkboxFalse =
    theme === "light" ? checkboxOutlineFalseLight : checkboxOutlineFalseDark;

  return (
    <label
      className={classNames(
        style.container,
        className,
        disabled && style.disabled
      )}
    >
      <div className={style.checkbox__container}>
        <input
          type="checkbox"
          checked={checked}
          onChange={handleCheck}
          disabled={disabled}
        />
        <img src={checked ? checkboxTrue : checkboxFalse} alt="checkbox" />
      </div>
      <span className={style.primary}>{label}</span>
    </label>
  );
};
