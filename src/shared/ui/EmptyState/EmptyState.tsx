import style from "./EmptyState.module.css";
import emptyStateLightAnimation from "assets/animation/crossDocLight.json";
import emptyStateDarkAnimation from "assets/animation/crossDocDark.json";
import { useTheme } from "shared/ui";
import Lottie from "react-lottie-player";

interface IEmptyState {
  text: JSX.Element | string;
  button?: JSX.Element;
  jsonAnimation?: any;
}

export const EmptyState = ({ text, button, jsonAnimation }: IEmptyState) => {
  const { theme } = useTheme();
  const getAnimation = () => {
    if (jsonAnimation) return jsonAnimation;
    return theme === "light"
      ? emptyStateLightAnimation
      : emptyStateDarkAnimation;
  };

  return (
    <div className={style.emptyState}>
      <Lottie
        loop={false}
        animationData={getAnimation()}
        play
        style={{ width: 150, height: 150 }}
        speed={0.7}
      />
      <p>{text}</p>
      <div className={style.button__container}>{button}</div>
    </div>
  );
};
