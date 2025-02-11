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
		name: 'Enheter',
		id: 'units',
		href: '/units',
	},
	{
		name: 'Oversikt',
		id: 'properties',
		href: '/properties',
	},
	{
		name: 'Dashboard',
		id: 'utleier',
		href: '/dashboard',
	},
	{
		name: 'Test',
		id: 'test',
		href: '/test',
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
