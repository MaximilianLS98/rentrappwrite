import Link from 'next/link';

import { menuConstants } from '../../constants/menuConstants';
import type { MenuElement } from '@/constants/menuConstants';
// import { ModeToggle } from '@/components/ThemeSwitcher';
import { ModeToggle } from '../ThemeSwitcher';
import { Button } from '../ui/button';
import auth from '@/utils/auth';
import LogoutButton from '@/components/header/LogoutButton';

// import { UserButton } from '@clerk/nextjs';
// import { getUserAuth } from '@/lib/auth/utils';

export default async function Menu() {
	const user = await auth.getUser();
	// console.log('User:', user);
	

	const UserSection = user ? (
		<div className='flex flex-row gap-5'>
			<LogoutButton />
		</div>
	) : (
		<Link href='/login'>
			<Button variant='outline'>Logg inn</Button>
		</Link>
	);

	return (
		<nav className='hidden flex-row items-center justify-between lg:flex'>
			<div className='flex flex-row gap-5'>
				<div className='flex flex-row gap-5'>
					{menuConstants.map((menu) => {
						return (
							<Link
								key={menu.id}
								href={menu.href}
								className={`my-auto text-xl hover:underline`}>
								{menu.name}
							</Link>
						);
					})}
					<div className='my-auto'>
						{UserSection}
						{/* <Link href='/login'>
							<Button variant='outline'>Login</Button>
						</Link> */}
						{/* <UserButton afterSignOutUrl='/' /> */}
					</div>
					<ModeToggle />
				</div>
			</div>
		</nav>
	);
}
