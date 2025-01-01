import { Computer, GraduationCapIcon } from 'lucide-react';
import * as React from 'react';

export const siteMetadata = {
  title: "Mayank's portfolio",
  description: 'Hi there 👋 My name is Mayank and I love build websites',
  siteName: 'Passionate developer',
  image: '',
  url: 'https://mayank-portfolio-seven.vercel.app',
};

export const navLinks = [
  {
    title: 'home',
    path: '/',
  },
  {
    title: 'me',
    path: '/me',
  },
  {
    title: 'experience',
    path: '/experience',
  },
  {
    title: 'projects',
    path: '/projects',
  },
  {
    title: 'blog',
    path: '/blog',
  },
  {
    title: 'Contact',
    path: '/contact',
  },
];

// External links
export const EXTRA_LINKS = {
  linkedin: 'https://www.linkedin.com/in/knight03/',
  github: 'https://github.com/Kkknight-12',
  resume: '/resume.pdf',
  source_code: '',
  email: 'mayanks365@gmail.com',
} as const;

export const Projects = [
  {
    type: 'info',
    content:
      'These are my recent projects' + ' which i' + ' am currently working on',
  },
  [
    {
      type: 'project',
      title: 'Editor Application',
      description:
        'This is a web editor which compiles your react' +
        ' code and show the preview. The application also' +
        ' have markdown to write notes',
      website: 'https://editor-knight.vercel.app/',
      github: 'https://github.com/Kkknight-12/notes_code_editor',
      image: '/editor.png',
      placeholder: 'https://via.placeholder.com/150',
      tags: ['React', 'TypeScript', 'Esbuild', 'Monaco Editor'],
    },
  ],

  { type: 'info', content: 'These are my Old projects' },
  [
    {
      type: 'project',
      title: 'Task Manager Application ',
      description:
        'MERN stack app with CRUD operations. User can add, edit, delete tasks. Backend is in Node.js and MongoDB.',
      website: 'https://task-manager-application-chi.vercel.app/',
      github: 'https://github.com/Kkknight-12/Task-Manager-Application/',
      image: '/task-manager.png',
      placeholder: 'https://via.placeholder.com/150',
      tags: ['React', 'Node.js', 'JWT', 'Express', 'MongoDB'],
    },
    {
      type: 'project',
      title: 'Drag And Drop Application',
      description:
        'MERN stack app with CRUD operations, ' +
        'enables users to add, drag-drop tasks, and edit. Backed is in Node.js and MongoDB.',
      website: 'https://drag-drop-application.vercel.app/',
      github: 'https://github.com/Kkknight-12/Drag-Drop-Application',
      image: '/drag-drop.png',
      placeholder: 'https://via.placeholder.com/150',
      tags: ['React', 'Node.js', 'JWT', 'Express', 'MongoDB'],
    },
  ],
];

// Data for work experience
export const EXPERIENCES_DATA = [
  {
    title: 'TechStuff Pvt Ltd',
    location: 'Indore ( Remote Job ), In',
    description:
      'I have successfully delivered robust and scalable React applications, effectively collaborating with cross-functional teams and adhering to project deadlines',
    icon: React.createElement(Computer),
    date: '2022 Nov - 2024 Feb',
  },
  {
    title: 'Mindnerves Pvt Ltd',
    location: 'Pune ( Remote Job ), In',
    description:
      'Creatied tools and applications by producing clean & efficient code and supervising code testing & debugging.',
    icon: React.createElement(Computer),
    date: '2021 April  - 2022 April',
  },
  {
    title: 'MBA in Business Analytics',
    location: 'Bhopal, IN',
    description: 'I hold an MBA in Business Analytics',
    icon: React.createElement(GraduationCapIcon),
    date: '2018 - 2020',
  },
] as const;

// Data for skills
export const SKILLS_DATA = [
  'HTML',
  'CSS',
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'Git',
  'Tailwind',
  'Redux',
] as const;

// Owner name
export const OWNER_NAME = 'Mayank Sarasiya';
