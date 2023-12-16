"use client";

import ThemeContext from "@/context/ThemeContext";
import { CacheProvider } from "@emotion/react";
import {
  CssBaseline,
  GlobalStyles,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material";
import { createTheme } from "@mui/material";
import { amber, grey } from "@mui/material/colors";
import { cache } from "@/app/createEmotionCache";
import React from "react";
import { ReactNode } from "react";

type ThemeProps = {
  children: ReactNode;
};

export default function Theme({ children }: ThemeProps) {
  const { mode } = React.useContext(ThemeContext);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                primary: amber,
                divider: amber[200],
                text: {
                  primary: grey[900],
                  secondary: grey[800],
                },
              }
            : {
                primary: grey,
                divider: grey[700],
                background: {
                  paper: grey[900],
                },
                text: {
                  primary: "#fff",
                  secondary: grey[500],
                },
              }),
        },
      }),
    [mode]
  );

  return (
    <CacheProvider value={cache}>
      <MUIThemeProvider theme={theme}>
        <GlobalStyles
          styles={{
            body: {
              backgroundColor:
                mode === "dark" && theme.palette.background.default,
            },
          }}
        />
        {/* <CssBaseline /> */}

        {children}
      </MUIThemeProvider>
    </CacheProvider>
  );
}