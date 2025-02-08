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
		name: 'Utleier',
		id: 'utleier',
		href: '/dashboard',
	},
	{
		name: 'Chat',
		id: 'chat',
		href: '/chat',
	},
];

interface MenuElement {
  name: string;
  id: string;
  href: string;
}
export type { MenuElement };
