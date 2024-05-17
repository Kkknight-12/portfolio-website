'use client';

import { motion } from 'framer-motion';

import SectionHeading from '../../components/section-heading';
import Page from '@/components/ComponentWrapper';
import { Box } from '@mui/material';

const About = () => {
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
      <motion.section
        id='about'
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.175 }}
        className='mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28'
      >
        {/* Display the section heading for "About me." */}
        <SectionHeading>About me</SectionHeading>

        <p className='text-xl'> Hello there! 👋</p>

        <div className='text-center flex flex-col gap-5 text-lg'>
          <p className=''>
            I&apos;m a{' '}
            <strong className='text-purple-300'>Frontend Developer</strong> with
            a unique blend of skills in{' '}
            <strong className='text-purple-300'>React</strong>,{' '}
            <strong className='text-purple-300'>Next.js</strong>, and{' '}
            <strong className='text-purple-300'>JavaScript</strong>. My journey
            into the world of coding is a bit unconventional but interesting.
          </p>

          <p className=''>
            I hold an <strong className='text-purple-300'>MBA</strong> in
            <strong className='text-purple-300'> Business Analytics</strong>,
            and it was during this time that I discovered my passion for coding.
            The analytical thinking and problem-solving skills I developed
            during my MBA naturally translated into a love for programming.
          </p>

          <p className=''>
            After completing my Mba, I embarked on a self-learning journey into
            the world of development. I dove deep into{' '}
            <strong className='text-purple-300'>React</strong> and{' '}
            <strong className='text-purple-300'>JavaScript</strong>, building
            projects, solving problems, and constantly learning new things.
            Today, I work as a{' '}
            <strong className='text-purple-300'>React Developer</strong>,
            turning designs into functional, user-friendly interfaces.
          </p>

          <p className=''>
            I believe in the power of clean, efficient code and always strive to
            write programs that are robust and easy to maintain. I&apos;m always
            eager to learn and grow, and I&apos;m excited about the endless
            possibilities that the future of web development holds.
          </p>

          <p>Thanks for stopping by!</p>
        </div>
      </motion.section>
    </Box>
  );
};

export default Page(About);
