'use client';
import React, { useRef } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Box,
} from '@mui/material';
import Link from 'next/link';
import { useTheme } from '@mui/material/styles';
import { motion, useTransform, useScroll } from 'framer-motion';
import Image from 'next/image';

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
  const theme = useTheme();

  // Define your custom shadows
  const lightShadow = '0px 5px 15px rgba(0, 0, 0, 0.1)';
  const darkShadow = '0px 5px 15px rgba(0, 0, 0, 0.5)';

  // Choose the shadow based on the theme's mode
  const shadow = theme.palette.mode === 'dark' ? darkShadow : lightShadow;

  // Create a reference for the project element.
  const projectRef = useRef<HTMLElement>(null);

  // Use the useScroll hook to track scroll progress for animations.
  const { scrollYProgress } = useScroll({
    target: projectRef,
    offset: ['0 1', '1.33 1'],
  });

  // Define animations based on scroll progress.
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  return (
    <motion.article
      style={{
        scale: scaleProgress,
        opacity: opacityProgress,
      }}
      ref={projectRef}
      className='group'
    >
      <Card
        sx={{
          maxWidth: '800px',
          width: '100% ! important',
          borderRadius: '10px',
          boxShadow: shadow,
          backgroundColor: 'transparent',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
        }}
        className='bg-gray-100 border border-black/5 hover:bg-gray-200 transition dark:bg-white/10 dark:hover:bg-white/20 p-5'
      >
        <CardMedia
          component='img'
          image={project.image ?? project.placeholder}
          alt={project.title}
          sx={{ height: 200, maxWidth: { md: '50%' }, borderRadius: '10px' }}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: { md: '50%' },
          }}
        >
          <CardContent
            sx={{ overflow: 'hidden' }}
            className='flex flex-col gap-3'
          >
            <p className='text-xl font-bold'>{project.title}</p>
            <p>{project.description}</p>

            {/*  */}
            <ul className='flex flex-wrap mt-4 gap-2 sm:mt-auto'>
              {project.tags.map((tag: string, i: number) => (
                <li
                  key={`${project.title}-tags-${i}`}
                  className='bg-white px-2 py-1 text-white rounded-full outline-none text-center transition borderBlack dark:bg-violet-300/60'
                >
                  {tag}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardActions className='mt-4'>
            <Link
              className='bg-black/[0.7] px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white rounded-full dark:text-white/70'
              target='_blank'
              href={project.website as string}
              passHref
            >
              Website
            </Link>

            <Link
              className='bg-black/[0.7] px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white rounded-full dark:text-white/70'
              href={project.github as string}
              passHref
              target='_blank'
              rel='noopener noreferrer'
            >
              GitHub
            </Link>
          </CardActions>
        </Box>
      </Card>
    </motion.article>
  );
};

export default ProjectCard;
