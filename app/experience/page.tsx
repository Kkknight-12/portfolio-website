'use client';

import { motion } from 'framer-motion';
import { EXPERIENCES_DATA, SKILLS_DATA } from '@/constants';
import SectionHeading from '@/components/section-heading';
import { Building2, Calendar, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const fadeInAnimationVariants = {
  initial: { opacity: 0, y: 20 },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.05 * index },
  }),
};

export default function ExperiencePage() {
  return (
    <>
      {/* Skills Section */}
      <div className='space-y-8 mb-20'>
        <SectionHeading>Technical Expertise</SectionHeading>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-6 group'>
          <div className='col-span-2 space-y-4'>
            {/* <h3 className='text-2xl font-bold '>Frontend Development</h3> */}
            {/* <h2 className='text-2xl font-bold mb-4 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent'>
              Frontend Development
            </h2> */}
            <span className='inline-block text-2xl font-bold mb-4 text-white relative cursor-default'>
              Frontend Development
              <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300'></span>
            </span>

            <p className='text-gray-300'>
              Passionate about crafting beautiful, responsive user interfaces
              with modern technologies.
            </p>
          </div>

          <div className='col-span-2 flex flex-wrap gap-3 justify-end'>
            {SKILLS_DATA.map((skill, index) => (
              <motion.div
                key={skill}
                variants={fadeInAnimationVariants}
                initial='initial'
                whileInView='animate'
                viewport={{ once: true }}
                custom={index}
                className='group/item relative'
              >
                <div className='absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur-sm group-hover/item:blur-md transition-all' />
                <div className='relative bg-black px-5 py-3 rounded-xl text-white/80 hover:text-white border border-white/10 hover:border-white/20 transition-colors'>
                  {skill}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Experience Section */}
      <section className='relative mb-20 space-y-8'>
        <SectionHeading>Professional Journey</SectionHeading>

        <div className='space-y-8 relative before:absolute before:inset-0 before:ml-5 before:w-0.5 before:-translate-x-1/2 before:bg-gradient-to-b before:from-purple-500 before:to-pink-500 before:opacity-30'>
          {EXPERIENCES_DATA.map((experience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              viewport={{ once: true }}
              className='relative pl-8'
            >
              {/* Timeline Dot */}
              <div className='absolute left-0 w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full -translate-x-1/2 mt-6'>
                <div className='absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-ping opacity-75' />
              </div>
              {/* bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all duration-300 */}
              {/* <Card className='bg-black/40 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-colors'>
                <CardContent className='p-6'>
                  <div className='flex flex-col md:flex-row justify-between gap-4'>
                    <div className='space-y-2'>
                      <h3 className='text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'>
                        {experience.title}
                      </h3>
                      <div className='flex flex-wrap gap-4 text-gray-300'>
                        <div className='flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full'>
                          <Building2 className='h-4 w-4' />
                          <span>{experience.location.split('(')[0]}</span>
                        </div>
                        <div className='flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full'>
                          <MapPin className='h-4 w-4' />
                          <span>
                            {experience.location
                              .split('(')[1]
                              ?.replace(')', '')}
                          </span>
                        </div>
                        <div className='flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full'>
                          <Calendar className='h-4 w-4' />
                          <span>{experience.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className='mt-4 text-gray-300 leading-relaxed'>
                    {experience.description}
                  </p>
                </CardContent>
              </Card> */}

              <div className='bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 rounded-xl p-6 transition-all duration-300 hover:transform hover:scale-[1.02]'>
                <div className='space-y-4'>
                  {/* <h3 className='text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'>
                    {experience.title}
                  </h3> */}
                  <h2 className='text-2xl font-bold mb-4 bg-gradient-to-r from-purple-300 to-pink-00 bg-clip-text text-transparent'>
                    {experience.title}
                  </h2>

                  <div className='flex flex-wrap gap-4 text-gray-300'>
                    <div className='flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full'>
                      <Building2 className='h-4 w-4' />
                      <span>{experience.location.split('(')[0]}</span>
                    </div>
                    <div className='flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full'>
                      <MapPin className='h-4 w-4' />
                      <span>
                        {experience.location.split('(')[1]?.replace(')', '')}
                      </span>
                    </div>
                    <div className='flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full'>
                      <Calendar className='h-4 w-4' />
                      <span>{experience.date}</span>
                    </div>
                  </div>

                  <p className='text-gray-200 leading-relaxed'>
                    {experience.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
