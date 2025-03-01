import style from "./SendEmailCell.module.css";
import envelopeIcon from "assets/images/jobs/Envelope.svg";

interface ISendEmailCell {
  handleEmail: (id: string) => void;
  id: string;
}

export const SendEmailCell = ({ handleEmail, id }: ISendEmailCell) => {
  return (
    <button className={style.button} onClick={() => handleEmail(id)}>
      <img src={envelopeIcon} alt="envelope" />
    </button>
  );
};
