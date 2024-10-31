export const menuConstants = [
	{
		name: 'Home',
		id: 'home',
		href: '/',
	},
	// {
	// 	name: 'Marketplace',
	// 	id: 'marketplace',
	// 	href: '/marketplace',
	// },
	{
		name: 'Units',
		id: 'units',
		href: '/units',
	},
	{
		name: 'Utleier',
		id: 'utleier',
		href: '/dashboard',
	},
];

interface MenuElement {
  name: string;
  id: string;
  href: string;
}
export type { MenuElement };
