import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

import { menuConstants } from '@/constants/menuConstants';
import type { MenuElement } from '@/constants/menuConstants';

interface MobileMenuProps {
  open: boolean;
  // modifyMobileMenu?: boolean;
  translatedMenuItems: MenuElement[];
}

function MobileMenu({ open, translatedMenuItems }: MobileMenuProps) {
  const pathName = usePathname();

  let correctGroup = '' as string | null | undefined;
  // find out if the path is either /en or /nb, in that case we want to match the pathname to the href of '/'
  if (pathName === '/en' || pathName === '/nb') {
    correctGroup = '/';
  } else {
    // This whole thing is made to match the pathname which has locale in it
    // to the menu item href to make it the correct color
    const altRegex = new RegExp('(/.{2})?(/.*)');
    const matchGroup = altRegex.exec(pathName);
    correctGroup = matchGroup && matchGroup[matchGroup?.length - 1];
  }

  return (
    <>
      <motion.div
        exit={{ opacity: 0 }}
        // transition={{ duration: 0.2 }}
        className={`${
          open ? '' : 'hidden'
        } mobile-menu absolute left-0 top-0 z-10 h-screen w-screen bg-background transition-all`}
      >
        <div className="mx-10 flex h-full flex-col justify-center">
          {translatedMenuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`my-5 text-4xl font-bold hover:underline  ${
                item.href === correctGroup
                  ? 'text-highlight'
                  : 'text-freelancemain-foreground'
              }`}
            >
              {item.name}
              {/* {t(`menu.${item.name}`)} */}
            </Link>
          ))}
        </div>
        <div className="absolute bottom-5 left-5 z-[1000]">
          {/* divider made with tailwind css */}
          <div className="my-5 h-0.5 w-[80%] bg-slate-200"></div>
          <p className="text-freelancemain-foreground">Privacy Policy </p>
          <p className="text-freelancemain-foreground">Terms & Conditions</p>
          <p className="text-freelancemain-foreground">
            © 2023. All Rights Reserved
          </p>
        </div>
      </motion.div>
    </>
  );
}

export default MobileMenu;
