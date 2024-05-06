import * as React from 'react'
import { JobDetail } from '../components/Home/JobDetail'

export const navLinks = [
  {
    title: 'Home',
    path: '/',
  },
  // {
  //   title: 'About',
  //   path: '/about',
  // },
  {
    title: 'Projects',
    path: '/projects',
  },
  // {
  //   title: 'Contact',
  //   path: '/contact',
  // },
]

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
    },
  ],

  { type: 'info', content: 'These are my Old projects' },
  [
    {
      type: 'project',
      title: 'Task Manager Application ',
      description:
        'MERN stack app with CRUD operations, JWT login, Redux Toolkit, context API for state management, and dependencies on react-hook-form, yup\n' +
        'resolver, notistack, nprogress, Mui, conify, axios, react-router. Optimized with useMemo. Utilizes hooks including useRoutes, useNavigate, useRef,\n' +
        'useState, useEffect',
      website: 'https://task-manager-application-chi.vercel.app/',
      github: 'https://github.com/Kkknight-12/Task-Manager-Application/',
      image: '/task-manager.png',
      placeholder: 'https://via.placeholder.com/150',
    },
    {
      type: 'project',
      title: 'Drag And Drop Application',
      description:
        'MERN stack app with CRUD operations, JWT login, Redux for state management, and dependencies on Bootstrap and react-beautiful-dnd\n' +
        'enables users to add, drag-drop tasks, and edit. Backed by Node.js with MongoDB.',
      website: 'https://drag-drop-application.vercel.app/',
      github: 'https://github.com/Kkknight-12/Drag-Drop-Application',
      image: '/drag-drop.png',
      placeholder: 'https://via.placeholder.com/150',
    },
  ],
]

export const steps: {
  id: number
  label: string
  jobDetail: React.ReactNode
  description: {
    heading: string
    content: {
      detail: string
      link: string[]
    }[]
  }[]
}[] = [
  {
    id: 0,
    label: 'TechStuff Pvt Ltd',
    jobDetail: (
      <JobDetail location="Indore ( Remote Job )" period="2022 Nov - Present" />
    ),
    description: [
      {
        heading: 'Application Development & Coding',
        content: [
          {
            detail:
              'I have successfully delivered robust and scalable React applications, effectively collaborating with cross-functional teams and adhering to project deadlines.',
            link: [],
          },
        ],
      },
    ],
  },
  {
    id: 1,
    label: 'Mindnerves Pvt Ltd',
    jobDetail: (
      <JobDetail
        location="Pune ( Remote Job )"
        period="2023 April  - 2022 April"
      />
    ),
    description: [
      {
        heading: 'Application Development & Coding',
        content: [
          {
            detail:
              'Creatied tools and applications by producing clean & efficient code and supervising code testing & debugging.',
            link: [
              'https://compliancesutra.com/#/ ',
              'https://devvisn-customer.web.app/',
            ],
          },
        ],
      },
      {
        heading: 'Stakeholder Management & System Improvement',
        content: [
          {
            detail:
              'Collaborating with vendors and cross-functional teams to fix & improve products. ',
            link: ['https://compliancesutra.com/#/'],
          },
          {
            detail:
              'Documented development phases & monitoring systems and ensuring software is up-to-date with the latest technologies. ',
            link: [' http://b2b.adorn.digital/'],
          },
        ],
      },
    ],
  },
]