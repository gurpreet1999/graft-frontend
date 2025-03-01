import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import style from "./DateToggle.module.css";
import { Format } from "../LineGraph/LineGraph";
import { useClickOutside } from "shared/hooks";
import carretDown from "assets/images/table/CaretLeft.svg";

interface IDateToggle {
  onToggle: (date: Format) => void;
  currentDate: string;
  dates: string[];
  isSelect?: boolean;
}

export const DateToggle = ({
  onToggle,
  currentDate,
  dates,
  isSelect,
}: IDateToggle) => {
  const [activeStyle, setActiveStyle] = useState({});
  const containerRef = useRef<HTMLDivElement | null>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const activeIndex = dates.findIndex((date) => date === currentDate);
    const activeButton = buttonRefs.current[activeIndex];
    if (activeButton && containerRef.current) {
      const { offsetLeft, offsetWidth } = activeButton;
      setActiveStyle({
        left: offsetLeft,
        width: offsetWidth,
      });
    }
  }, [currentDate, dates]);

  // SELECT
  const [openSelect, setOpenSelect] = useState(false);
  const selectRef = useRef<HTMLButtonElement>(null);

  useClickOutside(selectRef, () => {
    setOpenSelect(false);
  });

  const handleButtonClick = () => {
    setOpenSelect(!openSelect);
  };
  if (isSelect) {
    return (
      <div className={style.select_container}>
        <button
          type="button"
          onClick={handleButtonClick}
          ref={selectRef}
          className={classNames(style.select, openSelect && style.openSelect)}
        >
          <span>
            {currentDate.charAt(0).toUpperCase() + currentDate.slice(1)}
          </span>
          <img src={carretDown} alt="" />
          <div
            className={classNames(style.dropdown, openSelect && style._open)}
          >
            {dates.map((date) => (
              <button
                key={date}
                onClick={() => {
                  onToggle(date as Format);
                  setOpenSelect(false);
                }}
                className={classNames(
                  currentDate === date && style.active,
                  style.toggle
                )}
              >
                <div className={style.toggle_inner}>
                  <span>{date.charAt(0).toUpperCase() + date.slice(1)}</span>
                </div>
              </button>
            ))}
          </div>
        </button>
      </div>
    );
  }

  // TOGGLE
  return (
    <div ref={containerRef} className={style.container}>
      <div className={style.activeIndicator} style={activeStyle}></div>
      {dates.map((date, index) => (
        <button
          key={date}
          ref={(el) => (buttonRefs.current[index] = el)}
          onClick={() => onToggle(date as Format)}
          className={classNames(
            currentDate === date && style.active,
            style.toggle
          )}
        >
          <div className={style.toggle_inner}>
            <span>{date.charAt(0).toUpperCase() + date.slice(1)}</span>
          </div>
        </button>
      ))}
    </div>
  );
};
