// import Page from '@/components/ComponentWrapper';
// import { Box } from '@mui/material';
// import Intro from './_components/intro';

// function HomePage() {
//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         color: 'text.primary',
//         p: 3,
//       }}
//     >
//       <Intro />
//     </Box>
//   );
// }

// export default Page(HomePage);

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Code2,
  Blocks,
  Users,
  Rocket,
} from 'lucide-react';
import { EXTRA_LINKS, OWNER_NAME } from '@/constants';
import { InteractiveTerminal } from './_components/interactiveTerminal';
import Hero from './_components/heroSection';

const statsData = [
  {
    icon: <Code2 className='w-5 h-5' />,
    value: '15+',
    label: 'Projects Completed',
  },
  { icon: <Blocks className='w-5 h-5' />, value: '5+', label: 'Tech Stack' },
  {
    icon: <Users className='w-5 h-5' />,
    value: '10+',
    label: 'Satisfied Clients',
  },
  {
    icon: <Rocket className='w-5 h-5' />,
    value: '2.5+',
    label: 'Years Experience',
  },
];

const achievements = [
  'Led development of 3 major web applications using React.js',
  'Reduced load time by 40% through performance optimization',
  'Implemented responsive designs for 15+ websites',
  'Mentored junior developers in React best practices',
];

export default function HomePage() {
  return (
    <div className='container mx-auto space-y-20'>
      {/* Hero Section */}
      <section className='grid md:grid-cols-2 gap-8 items-center pt-10'>
        {/* Terminal UI */}
        <InteractiveTerminal />

        {/* <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className='bg-[#1a1625]/80 backdrop-blur-lg rounded-lg border border-white/10 p-4'
        >
          <div className='font-mono space-y-2'>
            <div className='text-green-400'>~ whoami</div>
            <div className='text-gray-300 pl-4'>
              {`{
                name: "${OWNER_NAME}",
                role: "Frontend Developer",
                focus: ["React", "Next.js", "UI/UX"],
                passion: "Creating seamless web experiences"
              }`}
            </div>
          </div>
        </motion.div> */}

        {/* <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className='space-y-6'
        >
          <h1 className='text-4xl font-bold'>
            <span className='bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'>
              Building Modern Web Experiences
            </span>
          </h1>
          <b className='font-bold'>
            Hi, there I&apos;m {OWNER_NAME.split(' ')[0]}.
          </b>{' '}
          I&apos;m a <b className='font-bold'>front-end developer</b> with{' '}
          <b className='font-bold'>2.5+ years</b> of experience. I enjoy
          building <b className='italic'>websites</b>. I have worked on{' '}
          <b className='underline mr-3 text-purple-300'>React </b>
          <b className='underline mr-3 text-purple-300'>Next.js</b>
          <b className='underline text-purple-300'>Javascript</b>
          <b className='ml-2'>projects.</b>
          <p className='text-gray-300 text-lg'>
            Frontend developer specialized in crafting responsive and performant
            web applications
          </p>

          <div className='flex flex-wrap gap-4'>
            <Link
              href='/contact'
              className='flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 rounded-full font-medium hover:opacity-90 transition-opacity group'
            >
              Contact me
              <ArrowRight className='w-4 h-4 group-hover:translate-x-0.5 transition-transform' />
            </Link>
            <div className='flex gap-3'>
              <Link
                href={EXTRA_LINKS.github}
                target='_blank'
                className='bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors'
              >
                <Github className='w-5 h-5' />
              </Link>
              <Link
                href={EXTRA_LINKS.linkedin}
                target='_blank'
                className='bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors'
              >
                <Linkedin className='w-5 h-5' />
              </Link>
            </div>
          </div>
        </motion.div> */}
        <Hero />
      </section>

      {/* Stats Section */}
      <section className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        {statsData.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className='bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/10 transition-colors'
          >
            <div className='flex justify-center mb-2'>{stat.icon}</div>
            <div className='text-2xl font-bold text-purple-400'>
              {stat.value}
            </div>
            <div className='text-gray-400 text-sm'>{stat.label}</div>
          </motion.div>
        ))}
      </section>

      {/* Achievements Section */}
      <section className='grid md:grid-cols-2 gap-8'>
        <div>
          <h2 className='text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'>
            Key Achievements
          </h2>
          <div className='space-y-4'>
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className='flex items-center gap-3 bg-white/5 backdrop-blur-sm p-4 rounded-xl hover:bg-white/10 transition-colors'
              >
                <div className='h-2 w-2 rounded-full bg-purple-400' />
                {/* <p className='text-gray-300'>{achievement}</p> */}
                <p className='text-gray-200 text-lg leading-relaxed'>
                  {achievement}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Technologies */}
        <div className='space-y-6'>
          <h2 className='text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'>
            Core Technologies
          </h2>
          <div className='grid grid-cols-2 gap-4'>
            {[
              { name: 'React', proficiency: 90 },
              { name: 'Next.js', proficiency: 85 },
              { name: 'JavaScript', proficiency: 88 },
              { name: 'TypeScript', proficiency: 80 },
            ].map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className='bg-white/5 backdrop-blur-sm p-4 rounded-xl'
              >
                <div className='flex justify-between mb-2'>
                  <span className='text-gray-300 text-lg font-medium'>
                    {tech.name}
                  </span>
                  <span className='text-purple-400 font-bold'>
                    {tech.proficiency}%
                  </span>
                </div>
                <div className='h-2 bg-white/10 rounded-full overflow-hidden'>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${tech.proficiency}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className='h-full bg-gradient-to-r from-purple-500 to-pink-500'
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
