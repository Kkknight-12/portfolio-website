import Page from '@/components/ComponentWrapper';
import Loading from '@/components/Loading';
import { Projects } from '@/constants';
import { Box } from '@mui/system';
import { Suspense } from 'react';
import * as React from 'react';
import { Project } from './card';

const ProjectCard = React.lazy(
  () => import('@/components/Projects/ProjectCard')
);

const ProjectPage = () => {
  return (
    <Box sx={{ color: 'text.primary' }}>
      {Projects.map((project, index) => {
        if ('content' in project) {
          return (
            <Suspense key={index} fallback={<Loading />}>
              {project.type === 'info' && (
                <p className='text-4xl tracking-wide text-center mb-6'>
                  {project.content}
                </p>
              )}
            </Suspense>
          );
        } else {
          return (
            <Box
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'text.primary',
                p: 3,
                pb: 15,
                gap: 15,
              }}
            >
              {project.map((projectInfo, index) => (
                <Suspense key={index} fallback={<Loading />}>
                  <ProjectCard key={index} project={projectInfo} />
                </Suspense>
              ))}
            </Box>
          );
        }
      })}
    </Box>
  );
};

export default Page(ProjectPage);
