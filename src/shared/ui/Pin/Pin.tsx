import style from "./Pin.module.css";

interface IPin {
  children: React.ReactNode;
}

export const Pin = ({ children }: IPin) => {
  return <div className={style.pin}>{children}</div>;
};
