"use client";

import Page from "@/components/ComponentWrapper";
import VerticalLinearStepper from "@/components/Stepper";
import { useTheme } from "@mui/material/styles";
import { Box, Stack, Typography } from "@mui/material";
import { amber, green } from "@mui/material/colors";
import React from "react";

function HomePage() {
  const theme = useTheme();
  console.log("theme ", theme.palette.mode);
  return (
    // <div
    //   className='flex flex-col items-center justify-between p-24 '
    // >
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        // bgcolor: "background.default",
        color: "text.primary",
        p: 3,
        gap: 15,
        minHeight: "100vh",
      }}
    >
      <Stack alignItems={"center"} justifyContent={"center"} gap={5}>
        <Stack alignItems={"center"} justifyContent={"center"} gap={2}>
          <p className="text-6xl ">Mayank Sarasiya</p>
          <p className="text-4xl ">Frontend Developer</p>
        </Stack>

        <Stack alignItems={"center"} justifyContent={"center"} gap={1}>
          <Typography>
            I have 2 year of experience as a Frontend Developer
          </Typography>

          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={1}
          >
            <Typography>My stack is</Typography>
            <Typography
              style={{
                color: theme.palette.mode === "dark" ? green[500] : amber[900],
              }}
            >
              Javascript, React, Next, Svelte, Mui, Tailwind
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <VerticalLinearStepper />
    </Box>
    // </div>
  );
}

export default Page(HomePage);