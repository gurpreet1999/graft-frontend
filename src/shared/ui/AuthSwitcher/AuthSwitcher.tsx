import style from "./AuthSwitcher.module.css";
import recruiterIcon from "assets/images/auth-switcher/recruiter.svg";
import candidateIcon from "assets/images/auth-switcher/candidate.svg";
import classNames from "classnames";
import { isCandidate, isRecruiter } from "shared/helpers/getUserRole";

interface IAuthSwitcherProps {
  role: Role;
  handleActive: (value: Role) => void;
  className?: string;
}

/**
 * Renders a component that allows switching between recruiter and candidate modes.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.role - The currently active mode ('recruiter' or 'candidate').
 * @param {Function} props.handleActive - The function to handle mode switching.
 * @returns The rendered component.
 */
export const AuthSwitcher = ({
  role,
  handleActive,
  className,
}: IAuthSwitcherProps) => {
  return (
    <div className={classNames(style.container, className)}>
      <button
        className={classNames(
          isCandidate(role) && style.switch__button_active,
          style.switch__button
        )}
        onClick={() => handleActive("CANDIDATE")}
      >
        <div className={style.switch__circle}>
          <div className={style.switch__circle_inner}>
            <img src={recruiterIcon} alt="recruiter" />
          </div>
        </div>
        <span className={style.switch__text}>Find a job</span>
      </button>
      <button
        className={classNames(
          isRecruiter(role) && style.switch__button_active,
          style.switch__button
        )}
        onClick={() => handleActive("RECRUITER")}
      >
        <div className={style.switch__circle}>
          <div className={style.switch__circle_inner}>
            <img src={candidateIcon} alt="CANDIDATE" />
          </div>
        </div>
        <span className={style.switch__text}>Find people</span>
      </button>
    </div>
  );
};
