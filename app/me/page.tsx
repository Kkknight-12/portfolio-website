// 'use client';

// import { motion } from 'framer-motion';

// import SectionHeading from '../../components/section-heading';
// import Page from '@/components/ComponentWrapper';
// import { Box } from '@mui/material';

// const About = () => {
//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         color: 'text.primary',
//         p: 3,
//         gap: 15,
//       }}
//     >
//       <motion.section
//         id='about'
//         initial={{ opacity: 0, y: 100 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.175 }}
//         className='mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28'
//       >
//         {/* Display the section heading for "About me." */}
//         <SectionHeading>About me</SectionHeading>

//         <p className='text-xl'> Hello there! 👋</p>

//         <div className='text-center flex flex-col gap-5 text-lg'>
//           <p className=''>
//             I&apos;m a{' '}
//             <strong className='text-purple-300'>Frontend Developer</strong> with
//             a unique blend of skills in{' '}
//             <strong className='text-purple-300'>React</strong>,{' '}
//             <strong className='text-purple-300'>Next.js</strong>, and{' '}
//             <strong className='text-purple-300'>JavaScript</strong>. My journey
//             into the world of coding is a bit unconventional but interesting.
//           </p>

//           <p className=''>
//             I hold an <strong className='text-purple-300'>MBA</strong> in
//             <strong className='text-purple-300'> Business Analytics</strong>,
//             and it was during this time that I discovered my passion for coding.
//             The analytical thinking and problem-solving skills I developed
//             during my MBA naturally translated into a love for programming.
//           </p>

//           <p className=''>
//             After completing my Mba, I embarked on a self-learning journey into
//             the world of development. I dove deep into{' '}
//             <strong className='text-purple-300'>React</strong> and{' '}
//             <strong className='text-purple-300'>JavaScript</strong>, building
//             projects, solving problems, and constantly learning new things.
//             Today, I work as a{' '}
//             <strong className='text-purple-300'>React Developer</strong>,
//             turning designs into functional, user-friendly interfaces.
//           </p>

//           <p className=''>
//             I believe in the power of clean, efficient code and always strive to
//             write programs that are robust and easy to maintain. I&apos;m always
//             eager to learn and grow, and I&apos;m excited about the endless
//             possibilities that the future of web development holds.
//           </p>

//           <p>Thanks for stopping by!</p>
//         </div>
//       </motion.section>
//     </Box>
//   );
// };

// export default Page(About);

'use client';

import { motion } from 'framer-motion';
import {
  Code2,
  Brain,
  Coffee,
  Book,
  Heart,
  Users,
  Lightbulb,
  Target,
} from 'lucide-react';

const personalValues = [
  {
    icon: <Code2 className='w-6 h-6' />,
    title: 'Clean Code Advocate',
    description:
      'I believe in writing maintainable, scalable, and well-documented code.',
  },
  {
    icon: <Brain className='w-6 h-6' />,
    title: 'Continuous Learner',
    description:
      'Always excited to learn new technologies and improve my skills.',
  },
  {
    icon: <Users className='w-6 h-6' />,
    title: 'Team Player',
    description:
      'I thrive in collaborative environments and enjoy mentoring others.',
  },
  {
    icon: <Lightbulb className='w-6 h-6' />,
    title: 'Problem Solver',
    description:
      'I enjoy tackling complex challenges and finding elegant solutions.',
  },
];

const interests = [
  {
    icon: <Coffee className='w-6 h-6' />,
    title: 'Coffee & Coding',
    description:
      'Love exploring new programming concepts while enjoying a good cup of coffee.',
  },
  {
    icon: <Book className='w-6 h-6' />,
    title: 'Tech Blogs',
    description:
      'Regular reader and occasional writer about web development trends.',
  },
  // Add more interests...
];

export default function AboutPage() {
  return (
    <div className='container mx-auto px-4 py-12 space-y-20'>
      {/* Hero Section */}
      <section className='text-center max-w-4xl mx-auto'>
        <motion.h1
          className='text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          About Me
        </motion.h1>
        <motion.p
          className='text-xl text-gray-300 leading-relaxed'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          From business analytics to frontend development, my journey has been
          driven by a passion for creating impactful user experiences and
          solving complex problems.
        </motion.p>
      </section>

      {/* Journey Highlights */}
      <section className='grid md:grid-cols-2 gap-8'>
        <motion.div
          className='bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all duration-300 group'
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Target className='w-8 h-8 text-purple-400 mb-4' />

          {/* <h2 className='text-2xl font-bold mb-4 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent'>
            My Journey
          </h2> */}
          <span className='inline-block text-2xl font-bold mb-4 text-white relative cursor-default'>
            My Journey
            <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300'></span>
          </span>
          <div className='space-y-4 text-gray-300'>
            <p className='leading-relaxed'>
              Started with an MBA in Business Analytics, where I discovered my
              passion for coding. This unique background gives me a different
              perspective in problem-solving and user experience design.
            </p>
            <p className='leading-relaxed'>
              Transitioned into frontend development, mastering React and modern
              web technologies. Now, I combine my analytical thinking with
              technical skills to create efficient and user-friendly
              applications.
            </p>
          </div>
        </motion.div>

        <motion.div
          className='bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all duration-300 group'
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Heart className='w-8 h-8 text-purple-400 mb-4' />
          {/* <h2 className='text-2xl font-bold mb-4'>What Drives Me</h2> */}
          {/* <h2 className='text-2xl font-bold mb-4 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent'>
            My Journey
          </h2> */}
          <span className='inline-block text-2xl font-bold mb-4 text-white relative cursor-default'>
            What Drives Me
            <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300'></span>
          </span>

          <div className='space-y-4 text-gray-300'>
            <p className='leading-relaxed'>
              I'm passionate about creating intuitive user interfaces that make
              a real difference. Every project is an opportunity to learn and
              improve.
            </p>
            <p className='leading-relaxed'>
              My goal is to build web applications that are not just functional,
              but also accessible, performant, and delightful to use.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Values */}
      <section>
        <h2 className='text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'>
          Personal Values
        </h2>
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {personalValues.map((value, index) => (
            <motion.div
              key={value.title}
              className='bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all duration-300'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className='text-purple-400 mb-4'>{value.icon}</div>
              <h3 className='text-xl font-semibold mb-2'>{value.title}</h3>
              <p className='text-gray-300'>{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interests */}
      <section>
        <h2 className='text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'>
          Beyond Coding
        </h2>
        <div className='grid md:grid-cols-2 gap-6'>
          {interests.map((interest, index) => (
            <motion.div
              key={interest.title}
              className='bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all duration-300'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className='text-purple-400 mb-4'>{interest.icon}</div>
              <h3 className='text-xl font-semibold mb-2'>{interest.title}</h3>
              <p className='text-gray-300'>{interest.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
