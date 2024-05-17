"use client";

import ThemeContext from "@/_context/ThemeContext";
import { CacheProvider } from "@emotion/react";
import { GlobalStyles, ThemeProvider as MUIThemeProvider } from "@mui/material";
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
                background: {
                  paper: grey[900],
                  default: grey[100],
                },
              }
            : {
                primary: grey,
                divider: grey[700],
                background: {
                  paper: grey[900],
                  default: "#111827",
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
              backgroundColor: theme.palette.background.default,
            },
          }}
        />
        {children}
      </MUIThemeProvider>
    </CacheProvider>
  );
}
