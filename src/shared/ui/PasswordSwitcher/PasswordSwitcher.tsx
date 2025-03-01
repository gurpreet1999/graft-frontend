import style from "./PasswordSwitcher.module.css";
import mailIcon from "assets/images/sign-in/reset/mail.svg";
import smsIcon from "assets/images/sign-in/reset/sms.svg";
import classNames from "classnames";

interface IPasswordSwitcherProps {
  method: Method;
  handleActive: (value: Method) => void;
}

type Method = "Magic Link" | "SMS";

const isEmail = (active: string) =>
  active === "Magic Link" ? style.switch__button_active : undefined;
const isSMS = (active: string) =>
  active === "SMS" ? style.switch__button_active : undefined;

/**
 * Renders a component that allows switching between recruiter and candidate modes.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.role - The currently active mode ('recruiter' or 'candidate').
 * @param {Function} props.handleActive - The function to handle mode switching.
 * @returns The rendered component.
 */
export const PasswordSwitcher = ({
  method,
  handleActive,
}: IPasswordSwitcherProps) => {
  return (
    <div className={style.container}>
      <button
        className={classNames(isEmail(method), style.switch__button)}
        onClick={() => handleActive("Magic Link")}
      >
        <div className={style.switch__circle}>
          <div className={style.switch__circle_inner}>
            <img src={mailIcon} alt="Magic Link" />
          </div>
        </div>
        <span className={style.switch__text}>Magic Link</span>
      </button>
      <button
        className={classNames(isSMS(method), style.switch__button)}
        onClick={() => handleActive("SMS")}
      >
        <div className={style.switch__circle}>
          <div className={style.switch__circle_inner}>
            <img src={smsIcon} alt="candidate" />
          </div>
        </div>
        <span className={style.switch__text}>SMS</span>
      </button>
    </div>
  );
};
