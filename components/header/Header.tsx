import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Menu from './Menu';
import Hamburger from '../hamburger/Hamburger';
// import { ModeToggle } from '@/components/ThemeSwitcher';
import { ModeToggle } from '../ThemeSwitcher';

import { menuConstants } from '../../constants/menuConstants';
import { MenuElement } from '../../constants/menuConstants';

export default async function Header() {

  const translatedMenuItems = menuConstants.map((menu: MenuElement) => {
    return {
      id: menu.id,
      // name: t(`menu.${menu.name}` as any, { params: '' }),
      name: menu.name,
      href: menu.href,
    };
  });

  return (
		<header className='flex flex-row items-center justify-between bg-accent p-4 py-5 shadow-md'>
			<div className='flex items-center'>
				<Link href='/'>
					<h1 className='hidden text-3xl text-freelancemain-accentforeground hover:text-freelancemain-foreground lg:block'>
						Rent<span className='text-rentr-main'>R</span>
					</h1>
				</Link>
				<Link href='/'>
					<h1 className='text-3xl text-freelancemain-accentforeground hover:text-freelancemain-foreground lg:hidden'>
						RentR
					</h1>
				</Link>
			</div>
			<div className='flex gap-6'>
				<ModeToggle className='lg:hidden' />
				<Hamburger translatedMenuItems={translatedMenuItems} />
			</div>
			<Menu />
		</header>
  );
}
