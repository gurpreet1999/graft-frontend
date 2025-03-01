import style from "./SectorSwitcher.module.css";
import hospitalityIcon from "assets/images/sector-switcher/hospitality.svg";
import constructionIcon from "assets/images/sector-switcher/construction.svg";
import industrialIcon from "assets/images/sector-switcher/industrial.svg";
import classNames from "classnames";

interface IPasswordSwitcherProps {
  sector: ISuggestion;
  sectors: ISuggestion[];
  handleActive: (value: ISuggestion) => void;
}

const isHospitality = (active: string) =>
  active === "Hospitality" ? style.switch__button_active : undefined;
const isConstruction = (active: string) =>
  active === "Construction" ? style.switch__button_active : undefined;
const isIndustrial = (active: string) =>
  active === "Industrial & Driving" ? style.switch__button_active : undefined;

/**
 * Renders a component that allows switching between recruiter and candidate modes.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.role - The currently active mode ('recruiter' or 'candidate').
 * @param {Function} props.handleActive - The function to handle mode switching.
 * @returns The rendered component.
 */
export const SectorSwitcher = ({
  sector,
  sectors,
  handleActive,
}: IPasswordSwitcherProps) => {
  const constructionSector = sectors.find(
    (sector) => sector.value === "Construction"
  );

  const hospitalitySector = sectors.find(
    (sector) => sector.value === "Hospitality"
  );

  const industrialSector = sectors.find(
    (sector) => sector.value === "Industrial & Driving"
  );

  if (!constructionSector || !hospitalitySector || !industrialSector)
    return null;

  return (
    <div className={style.container}>
      <button
        className={classNames(
          isConstruction(sector.value),
          style.switch__button
        )}
        onClick={() => handleActive(constructionSector)}
      >
        <div className={style.switch__circle}>
          <div className={style.switch__circle_inner}>
            <img src={constructionIcon} alt="Construction" />
          </div>
        </div>
        <span className={style.switch__text}>{constructionSector.value}</span>
      </button>
      <button
        className={classNames(
          isHospitality(sector.value),
          style.switch__button
        )}
        onClick={() => handleActive(hospitalitySector)}
      >
        <div className={style.switch__circle}>
          <div className={style.switch__circle_inner}>
            <img src={hospitalityIcon} alt="Hospitality" />
          </div>
        </div>
        <span className={style.switch__text}>{hospitalitySector.value}</span>
      </button>
      <button
        className={classNames(isIndustrial(sector.value), style.switch__button)}
        onClick={() => handleActive(industrialSector)}
      >
        <div className={style.switch__circle}>
          <div className={style.switch__circle_inner}>
            <img src={industrialIcon} alt="Industrial" />
          </div>
        </div>
        <span className={style.switch__text}>{industrialSector.value}</span>
      </button>
    </div>
  );
};
