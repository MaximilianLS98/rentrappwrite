import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from './ui/button';
import {
	TFetchMaintenanceRequests,
	TMaintenanceRequest,
} from '@/constants/types/maintenancerequests';

interface MaintenanceRequest {
	id: string;
	unit: string;
	description: string;
	priority: 'Low' | 'Medium' | 'High';
	status: 'Open' | 'In Progress' | 'Closed';
}

interface MaintenanceRequestsProps {
	requests: MaintenanceRequest[];
  mrequests: TMaintenanceRequest[];
}

export function MaintenanceRequests({ requests, mrequests }: MaintenanceRequestsProps) {

  const parseRequests = (requests: TMaintenanceRequest[]) => {
    // I want only critical and high priority requests, but if there are none, I want to show medium priority requests and so on, with max 5 requests and no entries with status 'closed'
    const requestsFiltered = requests.filter((request) => request.status !== 'closed');
    const criticalRequests = requestsFiltered.filter((request) => request.priority === 'critical');
    const highRequests = requestsFiltered.filter((request) => request.priority === 'high');
    const mediumRequests = requestsFiltered.filter((request) => request.priority === 'medium');
    const lowRequests = requestsFiltered.filter((request) => request.priority === 'low');
    const parsedRequests = [...criticalRequests, ...highRequests, ...mediumRequests, ...lowRequests];
    return parsedRequests;
  }

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
  }

  // requests is an array of request objects, each has a units key which is a single object with information about the unit, extract the title from the units object
  const requestTitles = requests.map((request) => request.unit);
  
	return (
		<Card className='relative'>
			<CardHeader>
				<CardTitle>Forespørsler</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='flex justify-between my-2 border-b pb-2'>
					<h2 className='text-muted-foreground'>Aktive henvendelser:</h2>
					<h2 className='text-muted-foreground'>{mrequests.length}</h2>
				</div>
				<div className='space-y-4'>
					{parseRequests(mrequests).map((request, index) => {
						if (index > 5) return null;
						return (
							<div
								key={request.$id}
								className='flex items-center justify-between border-b pb-2'>
								<div>
									<div className='font-medium'>{request.title}</div>
									<div className='text-sm text-muted-foreground'>
										{requestTitles[index]}
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
                  }
                >
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
      <CardFooter className='absolute bottom-1 left-1 p-4'>
        <Link href='/maintenance-requests'>
          <Button variant='outline'>Alle henvendelser</Button>
        </Link>
      </CardFooter>
		</Card>
	);
}
