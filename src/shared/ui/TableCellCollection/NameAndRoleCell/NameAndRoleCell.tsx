import classNames from "classnames";
import style from "./NameAndRoleCell.module.css";
import { useEffect, useRef, useState } from "react";

interface NameAndRoleCellProps {
  name: string;
  establishment?: string;
  role?: string;
  className?: string;
  lastName?: string;
  showTextOverflow?: boolean;
}

export const NameAndRoleCell = ({
  name,
  lastName,
  establishment,
  role,
  className,
  showTextOverflow,
}: NameAndRoleCellProps) => {
  const roleContainerRef = useRef<HTMLDivElement>(null);
  const [isOverflow, setIsOverflow] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const roleContainer = roleContainerRef.current;
      if (!roleContainer) return;
      const containerHeight = roleContainer.offsetHeight;
      const itemHeight = (roleContainer.firstChild as HTMLElement).offsetHeight;
      if (itemHeight === 0) return;
      setIsOverflow(containerHeight <= itemHeight);
    };
    window.addEventListener("resize", handleResize);

    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={classNames(
        style.container,
        !isOverflow && style.overflow,
        className
      )}
    >
      <p
        className={classNames(
          style.name,
          showTextOverflow && style.show__overflow
        )}
      >
        <span>{name}</span> {lastName && <span>{lastName}</span>}
      </p>
      <div className={style.role__container} ref={roleContainerRef}>
        {establishment && <span>{establishment}</span>}
        {role && <span>{role}</span>}
      </div>
    </div>
  );
};
