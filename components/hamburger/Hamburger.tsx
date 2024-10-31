'use client';

import { useState } from 'react';
import MobileMenu from './MobileMenu';

import MenuFade from '../animations/MenuFade';
import { AnimatePresence } from 'framer-motion';

import { MenuElement } from '@/constants/menuConstants';

interface HamburgerProps {
  color?: string;
  pos?: string;
  size?: string;
  translatedMenuItems: MenuElement[];
}

// modifyMobileMenu is only passed when the hamburger is visible from the component "thinHeader", so that it is only modified on desktop

function Hamburger({ color, pos, size, translatedMenuItems }: HamburgerProps) {
  const [open, setOpen] = useState(false);
  color = color || 'white'; // if color is not passed, set it to white
  pos = pos || 'top-5 right-7'; // if pos is not passed, set it to top-7 right-7
  size = size || 'w-8 h-8'; // if size is not passed, set it to w-8 h-8

  const handleClick = () => {
    setOpen(!open);
    if (open) {
      document.body.style.overflow = 'unset';
    } else {
      document.body.style.overflow = 'hidden';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="z-[1000] my-auto block lg:hidden" onClick={handleClick}>
      <div
        className={`relative flex flex-col items-center justify-center ${size} z-[150] hover:cursor-pointer`}
      >
        <div
          className={`my-1 h-1 w-full rounded-full transition-all ${
            open
              ? 'translate-y-2 rotate-45 bg-muted'
              : `bg-foreground`
          } `}
        ></div>
        <div
          className={`my-1 h-1 rounded-full transition-all ${
            open
              ? 'hidden w-[80%] -rotate-90 bg-muted'
              : `w-full bg-foreground`
          } `}
        ></div>
        <div
          className={`my-1 h-1 w-full rounded-full transition-all ${
            open
              ? '-translate-y-1 -rotate-45 bg-muted'
              : `bg-foreground`
          } `}
        ></div>
      </div>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        <MenuFade isOpen={open}>
          <MobileMenu open={open} translatedMenuItems={translatedMenuItems} />
        </MenuFade>
      </AnimatePresence>
    </div>
  );
}

export default Hamburger;
