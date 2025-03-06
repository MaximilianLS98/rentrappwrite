export const menuConstants = [
	// {
	// 	name: 'Hjem',
	// 	id: 'home',
	// 	href: '/',
	// },
	// {
	// 	name: 'Marketplace',
	// 	id: 'marketplace',
	// 	href: '/marketplace',
	// },
	{
		name: 'Oversikt',
		id: 'properties',
		href: '/properties',
	},
	{
		name: 'Enheter',
		id: 'units',
		href: '/units',
	},
	{
		name: 'Dashboard',
		id: 'utleier',
		href: '/dashboard',
	},
	// {
	// 	name: 'Chat',
	// 	id: 'chat',
	// 	href: '/chat',
	// },
];

interface MenuElement {
  name: string;
  id: string;
  href: string;
}
export type { MenuElement };
