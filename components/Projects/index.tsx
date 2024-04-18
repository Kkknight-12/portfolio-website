import ProjectCard from '@/components/Projects/ProjectCard'
import Page from '@/components/ComponentWrapper'
import { Projects } from '@/constant'
import { Box } from '@mui/system'
import * as React from 'react'

const ProjectPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',

        justifyContent: 'center',
        alignItems: 'center',
        color: 'text.primary',
        p: 3,
        gap: 15,
      }}
    >
      {Projects.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
    </Box>
  )
}

export default Page(ProjectPage)