"use client";

import * as React from "react";
import { PaletteMode } from "@mui/material";

interface ThemeContextProps {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

const ThemeContext = React.createContext<ThemeContextProps>({
  mode: "dark",
  toggleColorMode: () => {},
});
export default ThemeContext;

// type SettingContextProps = {
//   children: ReactNode;
// };
//
// export function SettingContext({ children }: SettingContextProps) {
//   const [mode, setMode] = React.useState<PaletteMode>("dark");
//
//   const toggleColorMode = () => {
//     setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
//   };
//
//   return (
//     <ThemeContext.Provider value={{ mode, toggleColorMode }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// }