import carretRight from "assets/images/table/CaretRight.svg";
import style from "./PageDropdown.module.css";
import classNames from "classnames";
import { useEffect, useState } from "react";

interface IPropsDropdown {
  pageSize: number;
  pageDisplayArray?: number[];
  className?: string;
  handlePageSizeChange: (size: number) => void;
  direction?: "top" | "bottom";
}

export const PageDropdown = ({
  pageSize,
  className,
  pageDisplayArray = [5, 10, 15, 25, 50],
  handlePageSizeChange,
  direction = "bottom",
}: IPropsDropdown) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const openDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleChangePageSize = (size: number) => {
    handlePageSizeChange(size);
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        e.target instanceof HTMLElement &&
        !e.target.closest(`.${style.container}`)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={classNames(
        style.container,
        className,
        direction === "top" && style._top
      )}
    >
      <button className={style.button} onClick={openDropdown}>
        {pageSize}
        <img src={carretRight} alt="carretBottom" />
      </button>
      <div
        className={classNames(style.dropdown, isDropdownOpen && style._open)}
      >
        {direction === "bottom" &&
          pageDisplayArray.map((size) => (
            <button
              key={size}
              className={classNames(
                style.dropdown__item,
                pageSize === size && style._active
              )}
              onClick={() => handleChangePageSize(size)}
            >
              {size}
            </button>
          ))}
        {direction === "top" &&
          pageDisplayArray.reverse().map((size) => (
            <button
              key={size}
              className={classNames(
                style.dropdown__item,
                pageSize === size && style._active
              )}
              onClick={() => handleChangePageSize(size)}
            >
              {size}
            </button>
          ))}
      </div>
    </div>
  );
};
