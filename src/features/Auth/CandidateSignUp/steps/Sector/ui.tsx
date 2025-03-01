import { Button, Heading, SectorSwitcher } from "shared/ui";
import style from "./style.module.css";

interface IBasicInfoProps {
  sector: ISuggestion;
  sectors: ISuggestion[];
  setSector: (value: ISuggestion) => void;
  handleNextStep: () => void;
}

export const Sector = ({
  sector,
  sectors,
  setSector,
  handleNextStep,
}: IBasicInfoProps) => {
  return (
    <div className={style.container}>
      <div className={style.header}>
        <Heading variant="h1">Welcome!</Heading>
        <span className={style.subheader}>
          To continue please, select the employment sector
        </span>
      </div>
      <div className={style.switcher}>
        <SectorSwitcher
          sector={sector}
          handleActive={setSector}
          sectors={sectors}
        />
        <Button
          variant="default"
          onClick={handleNextStep}
          className={style.button}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
