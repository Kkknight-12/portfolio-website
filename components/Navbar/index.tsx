// 'use client';

// import { ModeSwitchButton } from '@/components/Button/ModeSwitch';
// import { navLinks } from '@/constants';
// import { LogoIcon } from '@/Icons/LogoIcon';
// import {
//   AppBar,
//   IconButton,
//   Menu,
//   MenuItem,
//   Toolbar,
//   Typography,
// } from '@mui/material';
// import { Box, styled } from '@mui/system';
// import Link from 'next/link';
// import React from 'react';
// import { useTheme } from '@mui/material/styles';
// import { MenuIcon } from 'lucide-react';

// export default function Navbar() {
//   const theme = useTheme();

//   const PRIMARY_LIGHT = theme.palette.primary.light;

//   const PRIMARY_MAIN = theme.palette.primary.main;

//   const PRIMARY_DARK = theme.palette.primary.dark;

//   const obj = { PRIMARY_LIGHT, PRIMARY_MAIN, PRIMARY_DARK };

//   const NavLink = styled(Link)(({ theme }) => ({
//     'textDecoration': 'none',
//     '&:hover': {
//       color: theme.palette.primary.main,
//     },
//   }));

//   const [anchorElNav, setAnchorElNav] = React.useState(null);

//   const handleOpenNavMenu = (event: any) => {
//     setAnchorElNav(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   return (
//     <AppBar
//       position='sticky'
//       sx={{ top: 0 }}
//       className=' border-white border-opacity-40 !bg-white bg-opacity-80 shadow-lg !shadow-black/[0.03] backdrop-blur-[0.5rem] dark:!bg-gray-950 dark:border-black/40 dark:!bg-opacity-90'
//     >
//       <Toolbar disableGutters>
//         <div className='flex w-full justify-between items-center !bg-transparent rounded-sm p-3'>
//           <Box className='w-10 h-10'>
//             <Link href='/'>
//               <LogoIcon {...obj} />{' '}
//             </Link>
//           </Box>

//           {/* desktop navbar */}
//           <Box className=' gap-x-5 hidden md:flex justify-center items-center'>
//             {navLinks.map((navLink) => (
//               <NavLink
//                 href={navLink.path}
//                 key={navLink.title}
//                 className={
//                   navLink.title !== 'home'
//                     ? 'code-effect text-glow lowercase text-purple-300 font-medium hover:!text-purple-100'
//                     : 'react-effect text-glow lowercase text-purple-300 font-medium hover:!text-purple-100'
//                 }
//               >
//                 {navLink.title}
//               </NavLink>
//             ))}

//             {/* <ModeSwitchButton /> */}
//           </Box>

//           {/* desktop navbar */}
//           <Box
//             className='flex md:hidden'
//             // sx={{ display: { xs: 'flex', md: 'none' } }}
//           >
//             <IconButton
//               size='large'
//               aria-label='account of current user'
//               aria-controls='menu-appbar'
//               aria-haspopup='true'
//               onClick={handleOpenNavMenu}
//               color='inherit'
//             >
//               <MenuIcon />
//             </IconButton>
//             <Menu
//               id='menu-appbar'
//               anchorEl={anchorElNav}
//               anchorOrigin={{
//                 vertical: 'bottom',
//                 horizontal: 'left',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'left',
//               }}
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               sx={{
//                 display: { xs: 'block', md: 'none' },
//               }}
//             >
//               {navLinks.map((navLink) => (
//                 <MenuItem
//                   key={navLink.title}
//                   onClick={handleCloseNavMenu}
//                   className='!py-0'
//                 >
//                   <NavLink
//                     href={navLink.path}
//                     key={navLink.title}
//                     className={
//                       navLink.title !== 'home'
//                         ? 'code-effect text-glow lowercase text-purple-300 font-medium hover:!text-purple-100'
//                         : 'react-effect text-glow lowercase text-purple-300 font-medium hover:!text-purple-100'
//                     }
//                   >
//                     {navLink.title}
//                   </NavLink>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>
//         </div>
//       </Toolbar>
//     </AppBar>
//   );
// }

'use client';

import Link from 'next/link';
import { useState } from 'react';
import { LogoIcon } from '@/Icons/LogoIcon';
import { navLinks } from '@/constants';
import { MenuIcon } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <nav className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-14 max-w-screen-2xl items-center m-auto px-4'>
        <div className='flex w-full justify-between items-center'>
          <Link href='/' className='flex items-center space-x-2 w-10 h-10'>
            <LogoIcon
              PRIMARY_DARK='#1a1a1a'
              PRIMARY_MAIN='#4a4a4a'
              PRIMARY_LIGHT='#8a8a8a'
            />
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-6'>
            {navLinks.map((link) => (
              <Link
                key={link.title}
                href={link.path}
                className={`${
                  link.title === 'home' ? 'react-effect' : 'code-effect'
                } text-glow lowercase text-purple-300 font-medium hover:text-purple-100 transition-colors`}
              >
                {link.title}
              </Link>
            ))}
            {/* <Button
              variant='ghost'
              size='icon'
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
              <Sun className='h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
              <Moon className='absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
            </Button> */}
          </div>

          {/* Mobile Navigation */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className='md:hidden'>
              <Button variant='ghost' size='icon'>
                <MenuIcon className='h-6 w-6' />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>
              <div className='flex flex-col space-y-4 mt-4'>
                {navLinks.map((link) => (
                  <Link
                    key={link.title}
                    href={link.path}
                    onClick={() => setOpen(false)}
                    className='text-lg font-medium text-purple-300 hover:text-purple-100'
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
