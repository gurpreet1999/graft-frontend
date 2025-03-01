import React from "react";
import style from "./CardHeader.module.css";
import classNames from "classnames";

interface CardHeaderProps {
  image: string;
  title: string;
  variant?: "default" | "big";
  className?: string;
}

export const CardHeader = ({
  image,
  title,
  variant,
  className,
}: CardHeaderProps) => {
  if (variant === "big") {
    return (
      <div className={classNames(style.containerBig, className)}>
        <div className={style.imageBig}>
          <img src={image} alt="card header" />
        </div>
        <h2>{title}</h2>
      </div>
    );
  }
  return (
    <div className={classNames(style.container, className)}>
      <div className={style.image}>
        <img src={image} alt="card header" />
      </div>
      <h2>{title}</h2>
    </div>
  );
};
