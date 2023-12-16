import { ModeSwitchButton } from "@/components/Button/ModeSwitch";
import { AppBar } from "@mui/material";
import React from "react";

export default function Navbar() {
  return (
    <AppBar position="sticky" sx={{ top: 0 }}>
      <ModeSwitchButton />
    </AppBar>
  );
}