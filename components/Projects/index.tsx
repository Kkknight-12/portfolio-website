// import Page from '@/components/ComponentWrapper';
// import Loading from '@/components/Loading';
// import { Projects } from '@/constants';
// import { Box } from '@mui/system';
// import { Suspense } from 'react';
// import * as React from 'react';
// import { Project } from './card';

// const ProjectCard = React.lazy(
//   () => import('@/components/Projects/ProjectCard')
// );

// const ProjectPage = () => {
//   return (
//     <Box sx={{ color: 'text.primary' }}>
//       {Projects.map((project, index) => {
//         if ('content' in project) {
//           return (
//             <Suspense key={index} fallback={<Loading />}>
//               {project.type === 'info' && (
//                 <p className='text-4xl tracking-wide text-center mb-6'>
//                   {project.content}
//                 </p>
//               )}
//             </Suspense>
//           );
//         } else {
//           return (
//             <Box
//               key={index}
//               sx={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 color: 'text.primary',
//                 p: 3,
//                 pb: 15,
//                 gap: 15,
//               }}
//             >
//               {project.map((projectInfo, index) => (
//                 <Suspense key={index} fallback={<Loading />}>
//                   <ProjectCard key={index} project={projectInfo} />
//                 </Suspense>
//               ))}
//             </Box>
//           );
//         }
//       })}
//     </Box>
//   );
// };

// export default Page(ProjectPage);

'use client';

import { motion } from 'framer-motion';
import { Projects as ProjectsData } from '@/constants';
import ProjectCard from './ProjectCard';
import { Code2, Rocket } from 'lucide-react';

export default function ProjectsPage() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const projectStats = [
    {
      icon: <Code2 className='w-6 h-6 text-purple-400' />,
      label: 'Projects Completed',
      value: ProjectsData.reduce(
        (acc, section) => ('content' in section ? acc : acc + section.length),
        0
      ),
    },
    {
      icon: <Rocket className='w-6 h-6 text-purple-400' />,
      label: 'Live Websites',
      value: ProjectsData.reduce(
        (acc, section) =>
          'content' in section
            ? acc
            : acc + section.filter((p: any) => p.website).length,
        0
      ),
    },
  ];

  return (
    <motion.div
      initial='hidden'
      animate='visible'
      variants={containerVariants}
      className='container mx-auto px-4 py-12'
    >
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='text-center mb-16'
      >
        <h1 className='text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'>
          My Projects
        </h1>
        <p className='text-gray-300 text-lg max-w-2xl mx-auto'>
          A collection of projects that showcase my skills in frontend
          development, from responsive websites to interactive applications.
        </p>

        {/* Project Stats */}
        <div className='flex justify-center gap-8 mt-8'>
          {projectStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className='text-center'
            >
              <div className='flex justify-center mb-2'>{stat.icon}</div>
              <div className='text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-1'>
                {stat.value}+
              </div>
              <div className='text-gray-400 text-sm'>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Filter Chips - Could be made functional */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className='flex flex-wrap justify-center gap-2 mb-12'
      >
        {['All', 'React', 'Next.js', 'TypeScript'].map((filter, index) => (
          <>
            {/* <motion.button
              key={filter}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${
                index === 0
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              {filter}
            </motion.button> */}
            <motion.div
              key={filter}
              variants={{
                initial: { opacity: 0, y: 20 },
                animate: (index: number) => ({
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.05 * index },
                }),
              }}
              initial='initial'
              whileInView='animate'
              viewport={{ once: true }}
              custom={index}
              className='group/item relative'
            >
              <div className='absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur-sm group-hover/item:blur-md transition-all' />
              <div
                className={`relative bg-black px-3 py-1.5 rounded-xl text-white/80 hover:text-white border border-white/10 hover:border-white/20 transition-colors  ${
                  index === 0
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'bg-black '
                }`}
              >
                {filter}
              </div>
            </motion.div>
          </>
        ))}
      </motion.div>

      {/* Projects Grid */}
      {ProjectsData.map((section, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 * index }}
          className='mb-16 last:mb-0'
        >
          {'content' in section ? (
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className='text-3xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-8'
            >
              {section.content}
            </motion.h2>
          ) : (
            <div className='grid gap-8'>
              {section.map((project: any) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          )}
        </motion.div>
      ))}

      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className='fixed bottom-8 right-8 bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow'
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg
          className='w-6 h-6 text-white'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M5 10l7-7m0 0l7 7m-7-7v18'
          />
        </svg>
      </motion.button>
    </motion.div>
  );
}
