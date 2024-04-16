'use client'

import { ModeSwitchButton } from '@/components/Button/ModeSwitch'
import { navLinks } from '@/constant'
import { LogoIcon } from '@/Icons/LogoIcon'
import { AppBar } from '@mui/material'
import { Box, styled } from '@mui/system'
import Link from 'next/link'
import React from 'react'
import { useTheme } from '@mui/material/styles'

export default function Navbar() {
  const theme = useTheme()

  const PRIMARY_LIGHT = theme.palette.primary.light

  const PRIMARY_MAIN = theme.palette.primary.main

  const PRIMARY_DARK = theme.palette.primary.dark

  const obj = { PRIMARY_LIGHT, PRIMARY_MAIN, PRIMARY_DARK }

  const NavLink = styled(Link)(({ theme }) => ({
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  }))

  return (
    <AppBar position="sticky" sx={{ top: 0 }}>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          bgcolor: 'background.default',
          color: 'text.primary',
          borderRadius: 1,
          p: 3,
        }}
      >
        <Box sx={{ width: 40, height: 40 }}>
          <Link href="/">
            <LogoIcon {...obj} />
          </Link>
        </Box>

        <Box
          sx={{
            display: 'flex',

            alignItems: 'center',
          }}
          className="flex gap-x-5"
        >
          {navLinks.map((navLink) => (
            <NavLink href={navLink.path} key={navLink.title}>
              <p>{navLink.title}</p>
            </NavLink>
          ))}
          <ModeSwitchButton />
        </Box>
      </Box>
    </AppBar>
  )
}