import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ClipboardList } from 'lucide-react';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';



const tenantRequests = [
	{
		id: 1,
		tenant: 'John Smith',
		property: '123 Main St',
		type: 'Maintenance',
		status: 'Ny',
		date: '2023-06-15',
	},
	{
		id: 2,
		tenant: 'Jane Doe',
		property: '456 Elm St',
		type: 'Complaint',
		status: 'Pågår',
		date: '2023-06-14',
	},
	{
		id: 3,
		tenant: 'Bob Johnson',
		property: '789 Oak St',
		type: 'Inquiry',
		status: 'Løst',
		date: '2023-06-13',
	},
];

type TenantRequest = {
    id: number;
    tenant: string;
    property: string;
    type: string;
    status: string;
    date: string;
}

export default function TenantRequests() {
	return (
		<Card key='tenant-requests' className='h-full overflow-auto'>
			<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
				<CardTitle className='text-sm font-medium'>Tenant Requests</CardTitle>
				<ClipboardList className='h-4 w-4' />
			</CardHeader>
			<CardContent>
				<ScrollArea className='h-[300px]'>
					{/* <pre>{JSON.stringify(tenantRequests, null, 2)}</pre> */}
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Tenant</TableHead>
								<TableHead>Type</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Date</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{tenantRequests.map((request) => (
								<TableRow key={request.id}>
									<TableCell>{request.tenant}</TableCell>
									<TableCell>{request.type}</TableCell>
									<TableCell>
										<Badge
											variant={
												request.status === 'Ny'
													? 'destructive'
													: request.status === 'Pågår'
													? 'default'
													: 'secondary'
											}>
											{request.status}
										</Badge>
									</TableCell>
									<TableCell>{request.date}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</ScrollArea>
			</CardContent>
		</Card>
	);
}
