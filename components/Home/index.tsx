'use client'
import Page from '@/components/ComponentWrapper'
import VerticalLinearStepper from '@/components/Stepper'
import { Box, Stack } from '@mui/material'
import { amber, green } from '@mui/material/colors'
import { useTheme } from '@mui/material/styles'
import React from 'react'

function HomePage() {
  const theme = useTheme()
  const color = theme.palette.mode === 'dark' ? green[500] : amber[900]

  // const StyledTypography = ({ children, ...props }) => (
  //   <Typography
  //     style={{
  //       display: "inline-block",
  //       fontSize: "24px",
  //       color: props.color,
  //       padding: "5px",
  //     }}
  //   >
  //     {children}
  //   </Typography>
  // );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'text.primary',
        p: 3,
        gap: 15,
      }}
    >
      <Stack alignItems={'center'} justifyContent={'center'} gap={5}>
        <Stack
          alignItems={'center'}
          justifyContent={'center'}
          sx={{ textAlign: 'center' }}
          gap={2}
        >
          <p className="text-6xl tracking-wide">Mayank Sarasiya</p>
          <p className="text-4xl tracking-wide">Frontend Developer</p>
        </Stack>

        <Stack
          alignItems={'center'}
          justifyContent={'center'}
          gap={1}
          sx={{ textAlign: 'justify' }}
        >
          <p className="text-xl tracking-wide">
            I have{' '}
            <span className="text-xl inline-block font-bold"> 2 year </span> of
            experience as a{' '}
            <span className="text-xl inline-block font-bold">
              Frontend Developer
            </span>
          </p>

          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'start'}
            sx={{ textAlign: 'justify' }}
            gap={{ xs: 4, sm: 1 }}
          >
            <p className="text-base tracking-wide">
              <strong>My stack</strong>
            </p>
            <p
              style={{
                color,
              }}
              className="text-xl text-left tracking-wide"
            >
              Javascript, React, Next, Svelte, Mui, Tailwind
            </p>
          </Stack>
        </Stack>
      </Stack>
      <VerticalLinearStepper color={color} />
    </Box>
  )
}

export default Page(HomePage)