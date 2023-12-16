import { useTheme } from "@emotion/react";
import { Button, Typography } from "@mui/material";

export default function CustomButton() {
  const theme = useTheme();
  console.log("theme ", theme.statusss);
  console.log("theme rangila ", theme.rangila);
  return (
    <>
      <Typography
        style={{
          color: `${theme.statusss.danger}`,
        }}
      >
        danger
      </Typography>
      <Button
        style={{
          color: `${theme.palette.primary.main}`,
          background: `${theme.palette.primary.light}`,
        }}
      >
        click
      </Button>

      <br />
      <Button style={{ background: `${theme.palette.qwiqwi.light}` }}>
        click
      </Button>

      <br />
      <Button style={{ background: `${theme.palette.qwiqwi.bohotDark}` }}>
        click
      </Button>

      <br />
      <Button style={{ background: `${theme.statusss.danger}` }}>click</Button>

      <br />
      <Button style={{ background: `${theme.rangila.khatarnak}` }}>
        click
      </Button>
    </>
  );
}