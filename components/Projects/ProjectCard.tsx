'use client'
import React from 'react'
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
} from '@mui/material'
import Link from 'next/link'
import { useTheme } from '@mui/material/styles'

type Project = {
  title: string
  description: string
  website: string
  github: string
  image: string
  placeholder: string
}

type ProjectCardProps = {
  project: Project
}
const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const theme = useTheme()

  // Define your custom shadows
  const lightShadow = '0px 5px 15px rgba(0, 0, 0, 0.1)'
  const darkShadow = '0px 5px 15px rgba(0, 0, 0, 0.5)'

  // Choose the shadow based on the theme's mode
  const shadow = theme.palette.mode === 'dark' ? darkShadow : lightShadow

  return (
    <Card
      sx={{
        maxWidth: 345,
        width: '100%',
        height: '100%',
        borderRadius: '10px',
        boxShadow: shadow,
      }}
      className="shadow-lg"
    >
      <CardMedia
        component="img"
        image={project.image ?? project.placeholder}
        alt={project.title}
        sx={{ height: 200 }}
      />
      <CardContent
        sx={{ height: 200, overflow: 'hidden' }}
        className="flex flex-col gap-3"
      >
        <p className="text-xl font-bold">{project.title}</p>
        <p>{project.description}</p>
      </CardContent>
      <CardActions className="mt-4">
        <Button size="small" color="primary">
          <Link target="_blank" href={project.website as string} passHref>
            Website
          </Link>
        </Button>
        <Button size="small" color="primary">
          <Link
            href={project.github as string}
            passHref
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </Link>
        </Button>
      </CardActions>
    </Card>
  )
}

export default ProjectCard