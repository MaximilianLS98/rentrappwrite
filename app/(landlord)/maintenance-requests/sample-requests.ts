export interface MaintenanceRequest {
	id: string;
	title: string;
	description: string;
	unit: string;
	type: 'Plumbing' | 'Electrical' | 'Appliance' | 'Structural' | 'Other';
	priority: 'Low' | 'Medium' | 'High';
	status: 'Backlog' | 'Open' | 'In Progress' | 'Closed';
	comments: { id: string; text: string; date: string }[];
}

export const sampleRequests: MaintenanceRequest[] = [
	{
		id: '1',
		title: 'Leaky Faucet',
		description: 'The kitchen faucet is constantly dripping.',
		unit: 'Apt 101',
		type: 'Plumbing',
		priority: 'Medium',
		status: 'Backlog',
		comments: [{ id: 'c1', text: 'Plumber scheduled for tomorrow', date: '2023-06-10' }],
	},
	{
		id: '2',
		title: 'Broken AC',
		description: 'The air conditioning unit is not cooling properly.',
		unit: 'Apt 205',
		type: 'Appliance',
		priority: 'High',
		status: 'In Progress',
		comments: [
			{ id: 'c2', text: 'Technician diagnosed the issue, parts ordered', date: '2023-06-09' },
		],
	},
	{
		id: '3',
		title: 'Flickering Lights',
		description: 'Lights in the living room are flickering intermittently.',
		unit: 'Apt 302',
		type: 'Electrical',
		priority: 'Low',
		status: 'Backlog',
		comments: [],
	},
	{
		id: '4',
		title: 'Cracked Window',
		description: "There's a crack in the bedroom window.",
		unit: 'Apt 107',
		type: 'Structural',
		priority: 'Medium',
		status: 'Closed',
		comments: [{ id: 'c3', text: 'Window replaced', date: '2023-06-08' }],
	},
	{
		id: '5',
		title: 'Clogged Drain',
		description: 'The bathroom sink is draining very slowly.',
		unit: 'Apt 210',
		type: 'Plumbing',
		priority: 'Low',
		status: 'Backlog',
		comments: [],
	},
];
