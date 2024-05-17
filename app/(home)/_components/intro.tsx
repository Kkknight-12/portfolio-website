'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { EXTRA_LINKS, OWNER_NAME } from '@/constants';
import { ArrowRight, Download, GithubIcon, LinkedinIcon } from 'lucide-react';

const Intro = () => {
  return (
    <section
      id='home'
      className=' max-w-[50rem] text-center sm:mb-0 scroll-mt-[100rem]'
    >
      <div className='flex items-center justify-center'>
        <div className='relative'>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: 'tween',
              duration: 0.2,
            }}
          >
            <Image
              src='/dev1.png'
              alt={`${OWNER_NAME.split(' ')[0]} portrait`}
              width={392}
              height={392}
              quality={95}
              priority={true}
              className='h-64 w-64 rounded-full object-cover border-[0.35rem] border-white shadow-xl'
            />
          </motion.div>
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 125,
              delay: 0.1,
              duration: 0.7,
            }}
            className='absolute text-2xl bottom-6 right-6'
          >
            👋
          </motion.span>
        </div>
      </div>

      <motion.h1
        className='mb-10 mt-4 px-4 text-2xl font-medium !leading-[1.5] sm:text-4xl'
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <b className='font-bold'>
          Hi, there I&apos;m {OWNER_NAME.split(' ')[0]}.
        </b>{' '}
        I&apos;m a <b className='font-bold'>front-end developer</b> with{' '}
        <b className='font-bold'>2.5+ years</b> of experience. I enjoy building{' '}
        <b className='italic'>websites</b>. I have worked on{' '}
        <b className='underline mr-3 text-purple-300'>React </b>
        <b className='underline mr-3 text-purple-300'>Next.js</b>
        <b className='underline text-purple-300'>Javascript</b>
        <b className='ml-2'>projects.</b>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className=' flex flex-col gap-y-4 sm:flex-row sm:gap-x-2 justify-center items-center '
      >
        <div className='flex gap-2 flex-col sm:flex-row text-lg font-medium'>
          <Link
            href='/contact'
            className='group bg-gray-900 text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-105 hover:scale-105 hover:bg-gray-950 active:scale-95 transition'
          >
            Contact me here{' '}
            <ArrowRight className='opacity-70 group-hover:translate-x-0.5 transition' />
          </Link>
          <a
            href={EXTRA_LINKS.resume}
            target='_blank'
            className='group bg-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-105 hover:scale-105 active:scale-95 transition borderBlack dark:bg-white/10 '
          >
            Download Resume{' '}
            <Download className='opacity-60 group-hover:translate-y-0.5 transition' />
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Intro;
