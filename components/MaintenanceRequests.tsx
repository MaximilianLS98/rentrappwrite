import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from './ui/button';

interface MaintenanceRequest {
	id: string;
	unit: string;
	description: string;
	priority: 'Low' | 'Medium' | 'High';
	status: 'Open' | 'In Progress' | 'Closed';
}

interface MaintenanceRequestsProps {
	requests: MaintenanceRequest[];
}

export function MaintenanceRequests({ requests }: MaintenanceRequestsProps) {
	return (
		<Card className='relative'>
			<CardHeader>
				<CardTitle>Maintenance Requests</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='flex justify-between my-2 border-b pb-2'>
					<h2 className='text-muted-foreground'>Aktive henvendelser:</h2>
					<h2 className='text-muted-foreground'>{requests.length}</h2>
				</div>
				<div className='space-y-4'>
					{requests.map((request, index) => {
						if (index > 5) return null;
						return (
							<div
								key={request.id}
								className='flex items-center justify-between border-b pb-2'>
								<div>
									<div className='font-medium'>{request.unit}</div>
									<div className='text-sm text-muted-foreground'>
										{request.description}
									</div>
								</div>
								<Badge
									color={
										request.status === 'Open'
											? 'red'
											: request.status === 'In Progress'
											? 'yellow'
											: 'green'
									}>
									{request.status}
								</Badge>
							</div>
						);
					})}
				</div>
			</CardContent>
      <CardFooter className='absolute bottom-1 left-1 p-4'>
        <Link href='/maintenance-requests'>
          <Button variant='outline'>Alle henvendelser</Button>
        </Link>
      </CardFooter>
		</Card>
	);
}
