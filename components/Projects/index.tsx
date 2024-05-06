import Page from '@/components/ComponentWrapper'
import Loading from '@/components/Loading'
import { Projects } from '@/constant'
import { Box } from '@mui/system'
import { Suspense } from 'react'
import * as React from 'react'

const ProjectCard = React.lazy(
  () => import('@/components/Projects/ProjectCard'),
)

const ProjectPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'center',
        alignItems: 'center',
        color: 'text.primary',
        p: 3,
        pb: 15,
        gap: 15,
      }}
    >
      {Projects.map((project, index) => (
        <Suspense key={index} fallback={<Loading />}>
          <ProjectCard key={index} project={project} />
        </Suspense>
      ))}
    </Box>
  )
}

export default Page(ProjectPage)