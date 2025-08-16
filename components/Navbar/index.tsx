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
                    className='text-lg font-medium text-purple-300 hover:text-purple-100 capitalize'
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
