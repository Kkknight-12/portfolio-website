import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { EXTRA_LINKS, OWNER_NAME } from '@/constants';

const Hero = () => {
  return (
    <section className='flex flex-col justify-center items-center text-center max-w-4xl mx-auto px-4'>
      <motion.h1
        className='text-4xl md:text-5xl lg:text-6xl font-bold mb-6'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className='block mb-4'>
          Hi there! I&apos;m{' '}
          <span className='bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text'>
            Mayank
          </span>
        </span>
      </motion.h1>

      <motion.p
        className='text-xl md:text-2xl text-gray-200 leading-relaxed mb-8'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        A front-end developer with{' '}
        <span className='font-semibold'>2.5+ years</span> of experience crafting
        delightful web experiences.
      </motion.p>

      <motion.div
        className='flex flex-wrap justify-center gap-4 text-lg !gap-y-6'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {['React', 'Next.js', 'TypeScript', 'JavaScript'].map((tech, index) => (
          <span
            key={tech}
            className='px-2 py-1 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-lg'
          >
            {tech}
          </span>
        ))}

        <div className='flex flex-wrap gap-4 items-center justify-center'>
          <div className='flex flex-wrap gap-4 items-center justify-center'>
            <Link
              href='/contact'
              className='flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-2 rounded-full font-medium hover:opacity-90 transition-opacity group'
            >
              Contact me
              <ArrowRight className='w-4 h-4 group-hover:translate-x-0.5 transition-transform' />
            </Link>

            <Link
              href={EXTRA_LINKS.resume}
              target='_blank'
              className='flex items-center gap-2 bg-white/10 px-5 py-3 rounded-full font-medium hover:bg-white/20 transition-colors'
            >
              Download CV
              <Download className='w-4 h-4' />
            </Link>
          </div>
          <div className='flex gap-3 max-h-fit'>
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
      </motion.div>
    </section>
  );
};

export default Hero;
