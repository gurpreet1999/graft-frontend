import { Button } from "shared/ui";
import style from "./style.module.css";
import repeatIcon from "assets/images/campaign/Repeat.svg";
import createIcon from "assets/images/campaign/Create.svg";

export const getButtonText = (step: number) => {
  switch (step) {
    case 0:
      return "Next";
    case 1:
      return "Send Campaign";
    default:
      return "Create Campaign";
  }
};

export const CreateButton = ({
  from,
  onClick,
}: {
  from: From;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  if (from === "campaigns") {
    return (
      <Button
        variant="primaryBlue"
        onClick={onClick}
        className={style.button__repeat}
      >
        <img src={repeatIcon} alt="repeat" />
        Repeat Campaign
      </Button>
    );
  }
  return (
    <Button variant="primaryBlue" onClick={onClick}>
      <img src={createIcon} alt="repeat" />
      Create Campaign
    </Button>
  );
};
