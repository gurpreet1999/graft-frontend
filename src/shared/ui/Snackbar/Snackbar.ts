import { enqueueSnackbar } from "notistack";
import style from "./Snackbar.module.css";

interface ISnackBarProps {
  text: string | string[];
  variant?: "error" | "success" | "warning" | "info";
  vertical?: "top" | "bottom";
  horizontal?: "left" | "center" | "right";
}

export const SnackBar = ({
  text,
  variant = "error",
  vertical = "top",
  horizontal = "right",
}: ISnackBarProps) => {
  if (Array.isArray(text)) {
    text.forEach((message) => {
      enqueueSnackbar(message, {
        variant,
        anchorOrigin: {
          vertical: vertical,
          horizontal: horizontal,
        },
        className: style.snackbar,
        autoHideDuration: 3000,
      });
    });
    return;
  } else {
    enqueueSnackbar(text, {
      variant,
      anchorOrigin: {
        vertical: vertical,
        horizontal: horizontal,
      },
      autoHideDuration: 3000,
      className: style.snackbar,
    });
  }
};
