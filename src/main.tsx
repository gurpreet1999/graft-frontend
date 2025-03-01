import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App";
import "./index.css";
import "@radix-ui/themes/styles.css";
import "./theme-config.css";
import { Theme as RadixTheme } from "@radix-ui/themes";
import { ThemeProvider } from "shared/ui";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "entities/store";
import { SnackbarProvider } from "notistack";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <SnackbarProvider maxSnack={6}>
    <ReduxProvider store={store}>
      <BrowserRouter>
        <RadixTheme>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </RadixTheme>
      </BrowserRouter>
    </ReduxProvider>
  </SnackbarProvider>
);
