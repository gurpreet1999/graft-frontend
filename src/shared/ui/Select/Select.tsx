import classNames from "classnames";
import style from "./Select.module.css";
import arrow from "assets/images/arrow-down.svg";
import { useRef, useState } from "react";
import { ScrollArea } from "@radix-ui/themes";
import { useClickOutside } from "shared/hooks/useClickOutside";

interface ISelectProps {
  options: ISuggestion[];
  value?: ISuggestion;
  onChange?: (id: string) => void;
  className?: string;
  onChangeObject?: (value: ISuggestion) => void;
  smallOnMobile?: boolean;
}

export const Select = ({
  options,
  value,
  onChange,
  className,
  onChangeObject,
  smallOnMobile,
}: ISelectProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const selectRef = useRef<HTMLButtonElement>(null);

  useClickOutside(selectRef, () => {
    setIsFocused(false);
  });

  return (
    <button
      className={classNames(
        style.select__container,
        className,
        isFocused && style.select__container_focused,
        smallOnMobile && style.select__container_small
      )}
      ref={selectRef}
      onClick={() => {
        setIsFocused(!isFocused);
      }}
    >
      <div className={style.current}>{value?.value}</div>
      {isFocused && (
        <div className={style.options}>
          <ScrollArea className={style.scroll} scrollbars="vertical">
            {options.map((option) => (
              <option
                key={option.id}
                value={option.value}
                className={classNames(style.select__option, {
                  [style.select__option_active]: option.value === value?.value,
                })}
                onClick={() => {
                  onChange && onChange(option.id);
                  setIsFocused(false);
                  onChangeObject && onChangeObject(option);
                }}
              >
                {option.value}
              </option>
            ))}
          </ScrollArea>
        </div>
      )}
      <img src={arrow} alt="arrow" />
    </button>
  );
};
