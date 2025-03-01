import style from "./Link.module.css";
import { Link as RouterLink } from "react-router-dom";
import classNames from "classnames";

interface ILink {
  text: string;
  href: string;
  className?: string;
}

/**
 * Renders a link component.
 *
 * @param {ILink} props - The props for the Link component.
 * @param {string} props.text - The text to be displayed as the link.
 * @param {string} props.href - The URL that the link should navigate to.
 * @param {string} props.className - The additional CSS class name for the link.
 * @returns {JSX.Element} The rendered Link component.
 */
export const Link = ({ text, href, className }: ILink) => {
  return (
    <RouterLink to={href} className={classNames(style.link, className)}>
      {text}
    </RouterLink>
  );
};
