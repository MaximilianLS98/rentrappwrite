// ? A page for landlords to see and manage all their maintenance requests
import KanbanBoard from './KanbanBoard';
import SimpleKanbanBoard from './simpleKanbanBoard';
import { getAllMaintenanceRequests } from '@/actions/maintenanceRequests';
import { cookies } from 'next/headers';
import {
	TFetchMaintenanceRequests,
	TMaintenanceRequest,
} from '@/constants/types/maintenancerequests';

export default async function Page() {
    const sessionCookie = (await cookies()).get('session')?.value ?? '';
    const maintenanceRequests = await getAllMaintenanceRequests(sessionCookie) as TFetchMaintenanceRequests;

    return (
        <div>
            <SimpleKanbanBoard {...maintenanceRequests} />
        </div>
    )
}