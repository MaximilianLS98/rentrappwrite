'use client';

import * as React from 'react';
import { useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function ModeToggle({ className }: { className?: string }) {
  const { setTheme } = useTheme();

  const changeDaisyTheme = (theme: string) => {
    // set a [data-theme] attribute on the <html> element
    document.documentElement.setAttribute('data-theme', theme);
    // save the current theme in localStorage
    localStorage.setItem('theme', theme);
  }

  // Checking if there is a theme in localStorage, so the theme for daisyUI is synced with the next-themes for shadcn and rest of the site
  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme) {
      changeDaisyTheme(theme);
    }
  }, []);

  return (
    // <DropdownMenu className={className}>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className={className}>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => {
          setTheme('light');
          changeDaisyTheme('light');
          }}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => { 
          setTheme('dark');
          changeDaisyTheme('dark');
        }}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
