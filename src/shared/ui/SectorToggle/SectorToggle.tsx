import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import style from "./SectorToggle.module.css";

interface ISectorToggler {
  activeSector: ISuggestion;
  sectors: ISuggestion[];
  handleChangeSector: (sector: string) => void;
  className?: string;
}

export const SectorToggler = ({
  activeSector,
  sectors,
  handleChangeSector,
  className,
}: ISectorToggler) => {
  const [activeStyle, setActiveStyle] = useState({});
  const containerRef = useRef<HTMLDivElement | null>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const activeIndex = sectors.findIndex(
      (sector) => sector.value === activeSector.value
    );
    const activeButton = buttonRefs.current[activeIndex];
    if (activeButton && containerRef.current) {
      const { offsetLeft, offsetWidth } = activeButton;
      setActiveStyle({
        left: offsetLeft,
        width: offsetWidth,
      });
    }
  }, [activeSector, sectors]);

  return (
    <div ref={containerRef} className={classNames(style.container, className)}>
      <div className={style.activeIndicator} style={activeStyle}></div>
      {sectors.map((sector, index) => (
        <button
          key={sector.id}
          ref={(el) => (buttonRefs.current[index] = el)}
          onClick={() => handleChangeSector(sector.id)}
          className={classNames(
            activeSector.value === sector.value && style.active,
            style.toggle
          )}
        >
          <div className={style.toggle_inner}>
            <span>{sector.value}</span>
          </div>
        </button>
      ))}
    </div>
  );
};
