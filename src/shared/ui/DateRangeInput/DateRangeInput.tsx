import React from "react";
import classNames from "classnames";
import style from "./DateRangeInput.module.css";
import calendarIcon from "assets/images/calendar.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface IInput {
  startDate?: Date;
  setStartDate: (date: Date) => void;
  endDate?: Date;
  setEndDate: (date: Date) => void;
  label: string;
  labelIcon?: string;
  className?: string;
}

export const DateRangeInput: React.FC<IInput> = ({
  label,
  labelIcon,
  className,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  return (
    <div className={classNames(style.container)}>
      {(label || labelIcon) && (
        <div className={style.label__container}>
          {labelIcon && <img src={labelIcon} alt="Icon" />}
          {label && <label className={style.label}>{label}</label>}
        </div>
      )}
      <div className={classNames(style.datepicker__container, className)}>
        <div className={style.datepicker}>
          <DatePicker
            selected={startDate}
            onChange={(date) => date && setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="From"
            className={style.datepicker__input}
          />
          <img src={calendarIcon} alt="Calendar Icon" />
        </div>
        <div className={style.datepicker}>
          <DatePicker
            selected={endDate}
            onChange={(date) => date && setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            placeholderText="To"
            className={style.datepicker__input}
          />
          <img src={calendarIcon} alt="Calendar Icon" />
        </div>
      </div>
    </div>
  );
};

export default DateRangeInput;
