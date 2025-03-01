import { Button, Heading, ThemeProvider } from "shared/ui";
import style from "./NotFoungPage.module.css";
import bgDark from "assets/images/404/bg-dark.webp";
import bgLight from "assets/images/404/bg-light.webp";
import { useTheme } from "shared/ui/Theme/useThemes";

export const NotFoundPage = () => {
  const { theme } = useTheme();
  const bg = theme === "dark" ? bgDark : bgLight;

  return (
    <div className={style.container}>
      <div className={style.toggler}>
        <ThemeProvider.Toggler />
      </div>
      <div className={style.bg}>
        <img src={bg} alt="404" />
      </div>
      <div className={style.text__container}>
        <Heading variant="h1">Are you lost?</Heading>
        <p className={style.text}>
          Looks like the page you were looking for is not found.
        </p>
        <Button className={style.button} href="/">
          Go home
        </Button>
      </div>
    </div>
  );
};
