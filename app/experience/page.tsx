'use client';

import React from 'react';

import SectionHeading from '@/components/section-heading';
import { EXPERIENCES_DATA } from '@/constants';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';

import Page from '@/components/ComponentWrapper';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import 'react-vertical-timeline-component/style.min.css';
import Skills from './_components/skills';

const Experience = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{ color: 'text.primary' }}
      className='flex flex-col items-center text-center mt-16'
    >
      <Skills />
      <section id='experience' className='scroll-mt-28 mb-28 sm:mb-40'>
        <SectionHeading>My experience</SectionHeading>

        <VerticalTimeline lineColor=''>
          {EXPERIENCES_DATA.map((experience, i) => (
            <React.Fragment key={`experience-${i}`}>
              <VerticalTimelineElement
                visible={true}
                contentStyle={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  boxShadow: 'none',
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                  textAlign: 'left',
                  padding: '1.3rem 2rem',
                }}
                contentArrowStyle={{
                  borderRight: '0.4rem solid rgba(255, 255, 255, 0.5)',
                }}
                date={experience.date}
                icon={experience.icon}
                iconStyle={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  fontSize: '1.5rem',
                }}
              >
                <h3 className='font-semibold capitalize'>{experience.title}</h3>
                <p className='font-normal !mt-0'>{experience.location}</p>
                <p className='!mt-1 !font-normal text-gray-700 dark:text-white/75'>
                  {experience.description}
                </p>
              </VerticalTimelineElement>
            </React.Fragment>
          ))}
        </VerticalTimeline>
      </section>
    </Box>
  );
};

export default Page(Experience);
