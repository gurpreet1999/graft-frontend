import style from "./Heading.module.css";
import { createElement } from "react";
import classNames from "classnames";

interface IHeadingProps {
  variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
  children: React.ReactNode;
}

/**
 * Renders a heading element with the specified variant.
 *
 * @param variant - The variant of the heading element.
 * @param className - Additional CSS class names for the heading element.
 * @param children - The content of the heading element.
 * @returns The rendered heading element.
 */
export const Heading = ({ variant, className, children }: IHeadingProps) => {
  const headingVariants = ["h1", "h2", "h3", "h4", "h5", "h6"];

  if (headingVariants.includes(variant)) {
    return createElement(
      variant,
      { className: classNames(style[`heading_${variant}`], className) },
      children
    );
  }

  return null;
};
