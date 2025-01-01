// 'use client';

// import { useRef } from 'react';
// import Image from 'next/image';
// import { motion, useTransform } from 'framer-motion';
// import { useScroll } from 'framer-motion';

// import Link from 'next/link';

// export const Project = ({ project }: any) => {
//   const projectRef = useRef<HTMLElement>(null);

//   const { scrollYProgress } = useScroll({
//     target: projectRef,
//     offset: ['0 1', '1.33 1'],
//   });

//   const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
//   const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

//   return (
//     <motion.article
//       style={{
//         scale: scaleProgress,
//         opacity: opacityProgress,
//       }}
//       ref={projectRef}
//       className='group mb-3 sm:mb-8 last:mb-0'
//     >
//       <div className='bg-gray-100 max-w-[42rem] sm:group-even:pl-8 border border-black/5 overflow-hidden sm:pr-8 relative sm:h-[20rem] rounded-lg hover:bg-gray-200 transition dark:bg-white/10 dark:hover:bg-white/20'>
//         <div className='pt-4 pb-7 px-5 sm:pl-10 sm:pr-2 sm:pt-10 sm:max-w-[50%] flex flex-col h-full sm:group-even:ml-[18rem]'>
//           <h3 className='text-2xl font-semibold'>{project.title}</h3>
//           <p className='mt-2 leading-relaxed text-gray-700 dark:text-white/70'>
//             {project.description}
//           </p>

//           <ul className='flex flex-wrap mt-4 gap-2 sm:mt-auto'>
//             {project.tags.map((tag: string, i: number) => (
//               <li
//                 key={`${project.title}-tags-${i}`}
//                 className='bg-black/[0.7] px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white rounded-full dark:text-white/70'
//               >
//                 {tag}
//               </li>
//             ))}
//           </ul>
//         </div>
//         <Link
//           href={project.website}
//           target='_blank'
//           rel='noreferrer noopener'
//           title={`Go to Project: ${project.title}`}
//           className='group/project flex flex-col items-center'
//         >
//           <Image
//             src={project.image}
//             alt={project.title}
//             quality={95}
//             width={200}
//             height={200}
//             className='absolute hidden sm:block top-8 w-[28.25rem]
//             rounded-t-lg shadow-2xl
//             -right-40
//             group-even:right-[initial]
//             group-even:-left-40

//             group-focus/project:-translate-x-3
//             group-focus/project:translate-y-3
//             group-focus/project:-rotate-2
//             group-even:group-focus/project:translate-x-3
//             group-even:group-focus/project:translate-y-3
//             group-even:group-focus/project:rotate-2

//             group-focus/project:scale-[1.04]

//             group-hover:-translate-x-3
//             group-hover:translate-y-3
//             group-hover:-rotate-2
//             group-even:group-hover:translate-x-3
//             group-even:group-hover:translate-y-3
//             group-even:group-hover:rotate-2

//             group-hover:scale-[1.04] transition'
//           />
//         </Link>
//       </div>
//     </motion.article>
//   );
// };
