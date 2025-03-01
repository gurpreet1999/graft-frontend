import style from "./RangeInput.module.css";
import classNames from "classnames";
import { useRef, useState } from "react";
import { Range } from "react-range";
import arrow from "assets/images/arrow-down.svg";
import { useClickOutside } from "shared/hooks";

interface IRangeInput {
  className?: string;
  minValue: number;
  maxValue: number;
  value: number[];
  setValue: (value: number[]) => void;
  defaultText?: string;
}

export const RangeInput = ({
  minValue,
  maxValue,
  value,
  setValue,
  className,
  defaultText = "Any credits amount",
}: IRangeInput) => {
  const [values, setValues] = useState<number[]>(value);
  const [isFocused, setIsFocused] = useState(false);

  const selectRef = useRef<HTMLDivElement>(null);

  useClickOutside(selectRef, () => {
    setIsFocused(false);
  });

  const saveChanges = () => {
    setValue(values);
    setIsFocused(false);
  };

  const shouldOffsetLabel = (index: number) => {
    if (Math.abs(values[0] - values[1]) < 700) {
      if (index === 0) {
        if (values[0] < 300) {
          return classNames(style.offset_left_label, style.offset__left);
        }
        return values[1] > 2600
          ? classNames(style.offset_left_label, style.offset__top)
          : style.offset_left_label;
      }
      if (index === 1) {
        return values[1] > 2600
          ? classNames(style.offset_right_label, style.offset__top)
          : style.offset_right_label;
      }
    }
    return "";
  };

  return (
    <div className={style.container} ref={selectRef}>
      <button
        className={style.value__container}
        onClick={() => {
          setIsFocused(!isFocused);
        }}
      >
        {values[0] === minValue && values[1] === maxValue
          ? defaultText
          : values.join(" - ")}
        <img src={arrow} alt="arrow" />
      </button>
      {isFocused && (
        <div className={classNames(className, style.range__container)}>
          <div className={style.range}>
            <Range
              values={values}
              step={1}
              min={minValue}
              max={maxValue}
              onChange={(values) => setValues(values)}
              renderTrack={({ props, children }) => (
                <button
                  type="button"
                  onMouseDown={props.onMouseDown}
                  onTouchStart={props.onTouchStart}
                  className={style.track}
                >
                  <div
                    ref={props.ref}
                    style={{
                      height: "5px",
                      width: "100%",
                      borderRadius: "4px",
                      alignSelf: "center",
                    }}
                  >
                    {children}
                  </div>
                </button>
              )}
              renderThumb={({ index, props }) => (
                <div {...props}>
                  <div
                    className={classNames(
                      style.thumb__value,
                      index === 1 ? style.right : style.left,
                      shouldOffsetLabel(index)
                    )}
                  >
                    {values[index] === 3000 ? "3000+" : values[index].toFixed()}
                  </div>
                  <div className={style.thumb} />
                </div>
              )}
            />
          </div>
          <button
            type="button"
            className={style.apply__button}
            onClick={saveChanges}
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
};
