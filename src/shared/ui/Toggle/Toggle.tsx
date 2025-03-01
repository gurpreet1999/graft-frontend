import style from "./Toggle.module.css";

interface IToggle {
  checked: boolean;
  handleCheck: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Toggle = ({ checked, handleCheck }: IToggle) => {
  return (
    <div
      className={`${style.container} ${checked ? style.checked : style.unchecked}`}
    >
      <input
        type="checkbox"
        className={style.input}
        checked={checked}
        onChange={handleCheck}
      />
    </div>
  );
};
