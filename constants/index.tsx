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
      title: 'Blog Platform with Rich Text Editor',
      description:
        'Full-stack blogging platform with advanced rich text ' +
        'editing capabilities and custom annotation system. ' +
        'Features overlapping highlights, nested lists, interactive code ' +
        'blocks with Shiki syntax highlighting, and MongoDB schema with ' +
        'Mongoose discriminators for polymorphic content blocks.',
      website: 'https://devcanvas.vercel.app/',
      github: '#', // Update with your GitHub repository URL
      image: '/blog-platform.png', // Add your project image to public folder
      placeholder: 'https://via.placeholder.com/150',
      tags: ['Next.js', 'TipTap', 'MongoDB', 'Express', 'TypeScript'],
    },
    {
      type: 'project',
      title: 'Chrome Web Highlighter',
      description:
        'Production-ready Chrome extension with 10,000+ lines of enterprise-grade JavaScript. ' +
        'Features Redux Toolkit for cross-tab state synchronization, Shadow DOM isolation (3,944 lines) ' +
        'preventing CSS conflicts, comprehensive security with DOMPurify and CSP compliance. ' +
        'Optimized with DOM batching using RequestAnimationFrame for sub-100ms operations with 1,000+ highlights. ' +
        'Scalable architecture with 400+ error handlers ready for 100,000+ users.',
      website: 'https://chromewebstore.google.com/detail/nhbljcnbbmmjdmaimlnpdfknlkojbjji?utm_source=item-share-cb',
      github: '#', // Update with your GitHub repository URL
      image: '/chrome-highlighter.png', // Add your project image to public folder
      placeholder: 'https://via.placeholder.com/150',
      tags: ['JavaScript', 'Chrome Manifest V3', 'Redux Toolkit', 'Shadow DOM', 'DOMPurify'],
    },
    {
      type: 'project',
      title: 'Admin Dashboard Template',
      description:
        'Modern, responsive admin dashboard template with advanced theme system featuring 8 pre-built color schemes (Emerald, Blue, Purple, Orange, Rose, Teal, Indigo, Pink). ' +
        'Seamless dark mode with system preference detection, dynamic CSS variables, and persistent localStorage settings. ' +
        'Built with React 19, Tailwind CSS v4, Vite, and 45+ shadcn/ui components (Radix UI primitives). ' +
        'Features responsive mobile-first design, SEO optimization with meta tags and Open Graph, PWA-ready manifest, ' +
        'performance optimization with code splitting, and WCAG compliant accessibility.',
      website: 'https://admin-dashboard-template-knight.vercel.app/',
      github: '#', // Update with your GitHub repository URL
      image: '/admin-dashboard.png', // Add your project image to public folder
      placeholder: 'https://via.placeholder.com/150',
      tags: ['React 19', 'Tailwind CSS v4', 'Vite', 'Shadcn/UI', 'Radix UI', 'TypeScript'],
    },
    {
      type: 'project',
      title: 'React Theme System Kit',
      description:
        'Production-ready theme system solving 100+ hours of dark mode implementation pain. ' +
        'Features 8 production-ready themes (beyond just light/dark), 45+ pre-themed shadcn/ui components, ' +
        'and OKLCH color space for better consistency than RGB. Built with React 19 and Tailwind CSS v4. ' +
        'Eliminates theme flashing, ensures consistent colors across components, and exports themes in any format. ' +
        'Three weeks of development work, ready to use in five minutes.',
      website: 'https://react-theme-system-kit.vercel.app/',
      github: '#', // Update with your GitHub repository URL
      image: '/theme-system-kit.png', // Add your project image to public folder
      placeholder: 'https://via.placeholder.com/150',
      tags: ['React', 'Tailwind CSS', 'OKLCH', 'Shadcn/UI', 'TypeScript'],
    },
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
  'MongoDB',
  'Express',
  'Git',
  'Tailwind',
  'Redux',
] as const;

// Owner name
export const OWNER_NAME = 'Mayank Sarasiya';