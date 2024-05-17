// 'use client'

// import { steps } from '@/constants'
// import CircleIcon from '@mui/icons-material/Circle'
// import { ListItem, ListItemIcon, ListItemText, Stack } from '@mui/material'
// import Box from '@mui/material/Box'
// import Button from '@mui/material/Button'
// import Step from '@mui/material/Step'
// import StepContent from '@mui/material/StepContent'
// import StepLabel from '@mui/material/StepLabel'
// import Stepper from '@mui/material/Stepper'
// import { Arima } from 'next/font/google'
// import * as React from 'react'

// const arima = Arima({ subsets: ['latin'] })

// function StepIcon() {
//   return <div />
// }

// export default function VerticalLinearStepper({ color }: { color: string }) {
//   const [activeStep, setActiveStep] = React.useState(0)

//   const setCurrent = (id: number) => {
//     setActiveStep(id)
//   }

//   return (
//     <Box sx={{ maxWidth: 500 }}>
//       <Stepper activeStep={activeStep} orientation="vertical" nonLinear>
//         {steps.map((step) => (
//           <Step key={step.id}>
//             <StepLabel StepIconComponent={StepIcon}>
//               <Button
//                 variant="contained"
//                 onClick={() => setCurrent(step.id)}
//                 sx={{
//                   mt: 1,
//                   mr: 1,
//                   backgroundColor: `${color} !important`,
//                   '&:hover': {
//                     backgroundColor: `${color} !important`,
//                   },
//                 }}
//               >
//                 {step.label}
//               </Button>
//               {/* <CustomButton>{step.label}</CustomButton> */}
//             </StepLabel>
//             <StepContent>
//               <Stack gap={2} paddingBlock={2}>
//                 <div>{step.jobDetail}</div>

//                 {step.description.map((data) => {
//                   return (
//                     <Box key={data.heading}>
//                       <p className=" tracking-wide">{data.heading}</p>
//                       {data.content.map((content) => (
//                         <ListItem key={content.detail}>
//                           <ListItemIcon
//                             sx={{
//                               fontSize: 'small',
//                               display: { xs: 'none', sm: 'block' },
//                             }}
//                           >
//                             <CircleIcon />
//                           </ListItemIcon>
//                           <ListItemText>
//                             <p
//                               className={`${arima.className} !font-arima tracking-wide`}
//                             >
//                               {content.detail}
//                             </p>
//                             <Stack direction={'column'}>
//                               {content.link.map((link, linkIndex) => (
//                                 <React.Fragment key={linkIndex}>
//                                   <a
//                                     href={link}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                   >
//                                     {link}
//                                   </a>
//                                 </React.Fragment>
//                               ))}
//                             </Stack>
//                           </ListItemText>
//                         </ListItem>
//                       ))}
//                     </Box>
//                   )
//                 })}
//               </Stack>
//             </StepContent>
//           </Step>
//         ))}
//       </Stepper>
//     </Box>
//   )
// }
