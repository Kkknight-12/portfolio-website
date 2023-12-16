import CircleIcon from "@mui/icons-material/Circle";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  useTheme,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { amber, green } from "@mui/material/colors";
import Step from "@mui/material/Step";
import StepContent from "@mui/material/StepContent";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { styled } from "@mui/system";

function StepIcon() {
  return <div />;
}

type JobDetailProps = {
  period: string;
  location: string;
};
const JobDetail: React.FC<JobDetailProps> = ({ period, location }) => {
  return (
    <Stack direction={"row"} justifyContent={"space-between"}>
      <Typography> Location: {location} </Typography>
      <Typography> {period} </Typography>
    </Stack>
  );
};

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.primary.main
      : theme.palette.secondary.main,
  color:
    theme.palette.mode === "dark"
      ? theme.palette.common.white
      : theme.palette.common.black,
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.primary.light
        : theme.palette.secondary.light,
  },
}));

const steps = [
  {
    id: 0,
    label: "TechStuff Pvt Ltd",
    jobDetail: (
      <JobDetail
        location={"Indore ( Remote Job )"}
        period={"2021 Nov - Present"}
      />
    ),
    description: [
      {
        heading: "Application Development & Coding",
        content: [
          {
            detail:
              "I have successfully delivered robust and scalable React applications, effectively collaborating with cross-functional teams and adhering to project deadlines.",
            link: [],
          },
        ],
      },
    ],
  },
  {
    id: 1,
    label: "Mindnerves Pvt Ltd",
    period: "2023 April  - 2022 April",
    jobDetail: (
      <JobDetail
        location={"Pune ( Remote Job )"}
        period={"2023 April  - 2022 April"}
      />
    ),
    description: [
      {
        heading: "Application Development & Coding",
        content: [
          {
            detail:
              "Creatied tools and applications by producing clean & efficient code and supervising code testing & debugging.",
            link: [
              "https://compliancesutra.com/#/ ",
              "https://devvisn-customer.web.app/",
            ],
          },
        ],
      },

      {
        heading: "Stakeholder Management & System Improvement",
        content: [
          {
            detail:
              "Collaborating with vendors and cross-functional teams to fix & improve products. ",
            link: ["https://compliancesutra.com/#/"],
          },
          {
            detail:
              "Documented development phases & monitoring systems and ensuring software is up-to-date with the latest technologies. ",
            link: [" http://b2b.adorn.digital/"],
          },
        ],
      },
    ],
  },
];

export default function VerticalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const theme = useTheme();
  console.log("theme )) ", theme.palette);
  const setCurrent = (id: number) => {
    setActiveStep(id);
  };
  return (
    <Box sx={{ maxWidth: 500 }}>
      <Stepper activeStep={activeStep} orientation="vertical" nonLinear>
        {steps.map((step) => (
          <Step key={step.id}>
            <StepLabel StepIconComponent={StepIcon}>
              <Button
                variant="contained"
                onClick={() => setCurrent(step.id)}
                sx={{
                  mt: 1,
                  mr: 1,
                  backgroundColor:
                    theme.palette.mode === "dark" ? green[700] : amber[700],
                  "&:hover": {
                    backgroundColor:
                      theme.palette.mode === "dark" ? green[500] : amber[900],
                  },
                }}
                // style={{
                //   backgroundColor:
                //     theme.palette.mode === "dark" ? green[500] : amber[900],
                // }}
              >
                {step.label}
              </Button>
              {/* <CustomButton>{step.label}</CustomButton> */}
            </StepLabel>
            <StepContent>
              <Stack gap={2} paddingBlock={2}>
                <Box>{step.jobDetail}</Box>

                {step.description.map((data) => {
                  return (
                    <Box key={data.heading}>
                      <Typography variant="h6">{data.heading}</Typography>
                      {data.content.map((content) => (
                        <ListItem key={content.detail}>
                          <ListItemIcon sx={{ fontSize: "small" }}>
                            <CircleIcon />
                          </ListItemIcon>
                          <ListItemText>
                            <Typography variant="body1">
                              {content.detail}
                            </Typography>
                            <Stack direction={"column"}>
                              {content.link.map((link, linkIndex) => (
                                <React.Fragment key={linkIndex}>
                                  <a
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {link}
                                  </a>
                                </React.Fragment>
                              ))}
                            </Stack>
                          </ListItemText>
                        </ListItem>
                      ))}
                    </Box>
                  );
                })}
              </Stack>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}