import React from "react";
import style from "./Card.module.css";
import classNames from "classnames";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => {
  return (
    <div className={classNames(className, style.container)}>{children}</div>
  );
};
