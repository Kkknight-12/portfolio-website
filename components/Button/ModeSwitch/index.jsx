'use client'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import IconButton from '@mui/material/IconButton'
import { useTheme } from '@mui/material/styles'
import * as React from 'react'
import ThemeContext from '../../../_context/ThemeContext'

export function ModeSwitchButton() {
  const theme = useTheme()
  const { toggleColorMode } = React.useContext(ThemeContext)
  return (
    <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
      {theme.palette.mode === 'dark' ? (
        <Brightness7Icon />
      ) : (
        <Brightness4Icon />
      )}
    </IconButton>
  )
}