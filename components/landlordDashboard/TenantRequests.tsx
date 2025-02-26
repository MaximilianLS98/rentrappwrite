// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { ClipboardList } from 'lucide-react';
// import { ScrollArea } from '@radix-ui/react-scroll-area';
// import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
// import { Badge } from '@/components/ui/badge';



// const tenantRequests = [
// 	{
// 		id: 1,
// 		tenant: 'John Smith',
// 		property: '123 Main St',
// 		type: 'Maintenance',
// 		status: 'Ny',
// 		date: '2023-06-15',
// 	},
// 	{
// 		id: 2,
// 		tenant: 'Jane Doe',
// 		property: '456 Elm St',
// 		type: 'Complaint',
// 		status: 'Pågår',
// 		date: '2023-06-14',
// 	},
// 	{
// 		id: 3,
// 		tenant: 'Bob Johnson',
// 		property: '789 Oak St',
// 		type: 'Inquiry',
// 		status: 'Løst',
// 		date: '2023-06-13',
// 	},
// ];

// type TenantRequest = {
//     id: number;
//     tenant: string;
//     property: string;
//     type: string;
//     status: string;
//     date: string;
// }

// export default function TenantRequests() {
// 	return (
// 		<Card key='tenant-requests' className='h-full overflow-auto'>
// 			<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
// 				<CardTitle className='text-sm font-medium'>Tenant Requests</CardTitle>
// 				<ClipboardList className='h-4 w-4' />
// 			</CardHeader>
// 			<CardContent>
// 				<ScrollArea className='h-[300px]'>
// 					{/* <pre>{JSON.stringify(tenantRequests, null, 2)}</pre> */}
// 					<Table>
// 						<TableHeader>
// 							<TableRow>
// 								<TableHead>Tenant</TableHead>
// 								<TableHead>Type</TableHead>
// 								<TableHead>Status</TableHead>
// 								<TableHead>Date</TableHead>
// 							</TableRow>
// 						</TableHeader>
// 						<TableBody>
// 							{tenantRequests.map((request) => (
// 								<TableRow key={request.id}>
// 									<TableCell>{request.tenant}</TableCell>
// 									<TableCell>{request.type}</TableCell>
// 									<TableCell>
// 										<Badge
// 											variant={
// 												request.status === 'Ny'
// 													? 'destructive'
// 													: request.status === 'Pågår'
// 													? 'default'
// 													: 'secondary'
// 											}>
// 											{request.status}
// 										</Badge>
// 									</TableCell>
// 									<TableCell>{request.date}</TableCell>
// 								</TableRow>
// 							))}
// 						</TableBody>
// 					</Table>
// 				</ScrollArea>
// 			</CardContent>
// 		</Card>
// 	);
// }


import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '../ui/button';
import {
	TFetchMaintenanceRequests,
	TMaintenanceRequest,
} from '@/constants/types/maintenancerequests';

interface MaintenanceRequestsProps {
	mrequests: TMaintenanceRequest[];
}

export default function TenantRequests({ mrequests }: MaintenanceRequestsProps) {
	const parseRequests = (requests: TMaintenanceRequest[]) => {
		// I want only critical and high priority requests, but if there are none, I want to show medium priority requests and so on, with max 5 requests and no entries with status 'closed'
		const requestsFiltered = requests.filter((request) => request.status !== 'closed');
		const criticalRequests = requestsFiltered.filter(
			(request) => request.priority === 'critical',
		);
		const highRequests = requestsFiltered.filter((request) => request.priority === 'high');
		const mediumRequests = requestsFiltered.filter((request) => request.priority === 'medium');
		const lowRequests = requestsFiltered.filter((request) => request.priority === 'low');
		const parsedRequests = [
			...criticalRequests,
			...highRequests,
			...mediumRequests,
			...lowRequests,
		];
		return parsedRequests;
	};

	const translatedPriority = (priority: string) => {
		switch (priority) {
			case 'low':
				return 'Lav';
			case 'medium':
				return 'Middels';
			case 'high':
				return 'Høy';
			case 'critical':
				return 'Kritisk';
			default:
				return priority;
		}
	};

	const allRequestsNotClosed = mrequests.filter((request) => request.status !== 'closed');

	return (
		<Card key='tenant-requests' className='h-full overflow-scroll'>
			<CardHeader>
				<CardTitle className='text-md font-medium'>Forespørsler</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='flex justify-between my-2 border-b pb-2'>
					<h2 className='text-muted-foreground'>Aktive henvendelser:</h2>
					<h2 className='text-muted-foreground'>{allRequestsNotClosed.length}</h2>
				</div>
				<div className='space-y-4 mb-6'>
					{parseRequests(mrequests).map((request, index) => {
						if (index > 5) return null;
						return (
							<div
								key={request.$id}
								className='flex items-center justify-between border-b pb-2'>
								<div>
									<div className='font-medium'>{request.title}</div>
									<div className='text-sm text-muted-foreground'>
										{request.units.address}
									</div>
								</div>
								<Badge
									className={
										// The priority can be 'low', 'medium', 'high', 'critical', change color based on priority
										request.priority === 'low'
											? 'bg-green-500'
											: request.priority === 'medium'
											? 'bg-yellow-500'
											: request.priority === 'high'
											? 'bg-orange-500'
											: request.priority === 'critical'
											? 'bg-red-500'
											: 'bg-gray-500'
									}>
									{translatedPriority(request.priority)}
								</Badge>
								{/* <Badge
                  className={
                    // the status can be 'open', 'inprogress', 'backlog', 'closed', change color based on status
                    request.status === 'open'
                      ? 'bg-red-500'
                      : request.status === 'inprogress'
                      ? 'bg-yellow-500'
                      : request.status === 'backlog'
                      ? 'bg-gray-500'
                      : 'bg-green-500'
                  }>
									{request.status}
								</Badge> */}
							</div>
						);
					})}
				</div>
			</CardContent>
			<CardFooter className='absolute bottom-1 left-1 p-4 no-drag'>
				<Link href='/maintenance-requests'>
					<Button variant='outline'>Alle henvendelser</Button>
				</Link>
			</CardFooter>
		</Card>
	);
}

