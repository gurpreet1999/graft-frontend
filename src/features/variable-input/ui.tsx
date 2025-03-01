import { Input } from "shared/ui";
import style from "./VariableInput.module.css";

interface VariableInputProps {
  label: string;
  value?: string;
  type: string;
  isEditing: boolean;
  handleChange: (value: string) => void;
  error?: string[] | string;
}

export const VariableInput = ({
  label,
  value,
  type,
  isEditing,
  handleChange,
  error,
}: VariableInputProps) => {
  return (
    <div className={style.container}>
      <div className={style.label}>{label}</div>
      {!isEditing ? (
        <>
          <span className={style.value}>{value}</span>
        </>
      ) : (
        <>
          <Input
            type={type}
            className={style.input}
            placeholder={label}
            value={value}
            handleChange={handleChange}
            error={error}
          />
        </>
      )}
    </div>
  );
};
