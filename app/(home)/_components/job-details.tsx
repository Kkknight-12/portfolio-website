import { Stack } from '@mui/material';
import * as React from 'react';

type JobDetailProps = {
  period: string;
  location: string;
};

export const JobDetail: React.FC<JobDetailProps> = ({ period, location }) => {
  return (
    <Stack
      direction={'column'}
      justifyContent={'space-between'}
      sx={{
        flexDirection: { sm: 'row' },
        gap: { xs: 1 },
      }}
    >
      <div> Location: {location} </div>
      <div> {period} </div>
    </Stack>
  );
};
