import { cookies } from 'next/headers';
import Link from 'next/link';
import Dashboard from '@/app/properties/dashboard';
import { getAllProperties } from '@/actions/properties';
import { getAllUnits } from '@/actions/units';
import { getAllMaintenanceRequests, getActiveMaintenanceRequests } from '@/actions/maintenanceRequests';
import {
	TFetchMaintenanceRequests,
	TMaintenanceRequest,
} from '@/constants/types/maintenancerequests';
import { Button } from '@/components/ui/button';
import auth from '@/utils/auth';

type PropertyFetch = {
    total: number;
    documents: Property[];
}

type Property = {
	name: string;
	address: string;
	type: string;
	owner: string;
	$id: string;
	$createdAt: string;
	$updatedAt: string;
	$permissions: string[];
	$databaseId: string;
	$collectionId: string;
};

type UnitFetch = {
    total: number;
    documents: Unit[];
}

type Unit = {
    name: string;
    type: string;
    owner: string;
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    $permissions: string[];
    $databaseId: string;
    $collectionId: string;
};

export default async function Page() {
	const session = (await cookies()).get('session')?.value as string;

    const units = await getAllUnits(session) as UnitFetch;
    const properties = await getAllProperties(session) as PropertyFetch;
    const maintenancerequests = await getActiveMaintenanceRequests(session) as TFetchMaintenanceRequests;

    const user = await auth.getUser();
    const isAdmin = user.labels.includes('admin');

	return (
		<div className='container p-4'>
			{properties.total === 0 ? (
				<div>
					<h1>No properties found</h1>
					<Link href='/properties/new'>
						<Button className='btn btn-primary'>Create property</Button>
					</Link>
				</div>
			) : (
				<Dashboard
                        properties={properties}
                        units={units}
                        maintenancerequests={maintenancerequests.documents} />
			)}
            {/* <pre>{JSON.stringify(maintenancerequests, null, 4)}</pre> */}
             {isAdmin ? <pre>{JSON.stringify(user, null, 4)}</pre> : null}
		</div>
	);
}