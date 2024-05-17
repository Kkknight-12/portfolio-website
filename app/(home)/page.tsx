'use client';

import Page from '@/components/ComponentWrapper';
import VerticalLinearStepper from '@/components/Stepper';
import { Box, Stack } from '@mui/material';
import { amber, green } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import Intro from './_components/intro';

function HomePage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'text.primary',
        p: 3,
      }}
    >
      <Intro />
    </Box>
  );
}

export default Page(HomePage);
