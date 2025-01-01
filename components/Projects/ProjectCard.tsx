'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Globe, Github } from 'lucide-react';
import React, { useRef } from 'react';

type Project = {
  title: string;
  description: string;
  website: string;
  github: string;
  image: string;
  placeholder: string;
  tags: string[];
};

type ProjectCardProps = {
  project: Project;
};
const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  // Create a reference for the project element.
  const projectRef = useRef(null);

  // Use the useScroll hook to track scroll progress for animations.
  const { scrollYProgress } = useScroll({
    target: projectRef,
    offset: ['0 1', '1.33 1'],
  });

  // Define animations based on scroll progress.
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  return (
    <motion.div
      style={{
        scale: scaleProgress,
        opacity: opacityProgress,
      }}
      ref={projectRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='w-full max-w-5xl mx-auto'
    >
      {/* Backgound Color */}
      <div className='bg-gray-100 border border-black/5 hover:bg-gray-200 transition dark:bg-white/10 dark:hover:bg-white/20 p-5 rounded-xl group'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-center'>
          {/* Imaage Section */}
          <div className='rounded-xl overflow-hidden aspect-[16/10] relative flex items-center justify-center'>
            <Image
              src={project.image}
              alt={project.title}
              fill
              // className='object-cover transition-transform duration-500 group-hover:scale-105
              // !w-[80%] !h-[70%] !static rounded-2xl hover:scale-105'
              className='object-cover transform 
                transition duration-300 ease-in-out
                group-hover:scale-105 rounded-2xl md:!w-[80%] md:!h-[70%] overflow-hidden !static'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300' />
          </div>

          {/* Content Section */}
          <div className='space-y-6'>
            <h3 className='text-2xl font-bold text-white text-transparent'>
              {project.title}
            </h3>
            <p className='text-gray-300 text-lg leading-relaxed'>
              {project.description}
            </p>

            {/* Tech Stack */}
            <div className='flex flex-wrap gap-2'>
              {project.tags.map((tag, i) => (
                <span
                  key={`${project.title}-tags-${i}`}
                  // className='bg-white text-white rounded-full outline-none text-center transition borderBlack dark:bg-violet-300/60 px-3 py-1'
                  className='bg-white dark:bg-gray-700/50 px-3 py-1 text-sm text-gray-800 dark:text-gray-200 rounded-md '
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className='flex gap-4 pt-4'>
              {/* <Link
                href={project.website}
                target='_blank'
                className='inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-1 rounded-full transition-colors'
              >
                WEBSITE
              </Link>
              <Link
                href={project.github}
                target='_blank'
                className='inline-flex items-center gap-2 bg-[#1B1B1B] hover:bg-[#2B2B2B] text-white px-6 py-2 rounded-full transition-colors'
              >
                GITHUB
              </Link> */}

              <Link
                href={project.website}
                target='_blank'
                className='flex items-center gap-2 bg-purple-500 hover:bg-purple-600 px-4 py-2 text-sm text-white rounded-md transition-colors'
              >
                <Globe className='h-4 w-4' />
                Live Demo
              </Link>

              <Link
                href={project.github}
                target='_blank'
                className='flex items-center gap-2 bg-transparent border border-gray-300 dark:border-gray-600 hover:border-gray-400 px-4 py-2 text-sm rounded-md transition-colors'
              >
                <Github className='h-4 w-4' />
                Source Code
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
