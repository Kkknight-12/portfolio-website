"use client";

import ThemeContext from "@/context/ThemeContext";
import { PaletteMode } from "@mui/material";
import * as React from "react";
import { ReactNode } from "react";

type SettingContextProps = {
  children: ReactNode;
};

export function SettingContext({ children }: SettingContextProps) {
  const [mode, setMode] = React.useState<PaletteMode>("dark");

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleColorMode }}>
      {children}
    </ThemeContext.Provider>
  );
}