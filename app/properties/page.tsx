import { cookies } from 'next/headers';
import Link from 'next/link';
import Dashboard from '@/app/properties/dashboard';
import { getAllProperties, getAllPropertyNames } from '@/actions/properties';
import { getAllUnits } from '@/actions/units';
import { getActiveMaintenanceRequests } from '@/actions/maintenanceRequests';
import {
	TFetchMaintenanceRequests,
	TMaintenanceRequest,
} from '@/constants/types/maintenancerequests';
import { Button } from '@/components/ui/button';
import auth from '@/utils/auth';
import { FetchUnit } from '@/constants/types/units';
import { TPropertyFetch } from '@/constants/types/properties';
import SingleUnitPropertyManagement from './SinlgeView';
import MultiUnitPropertyManagement from './MultiView';

export default async function Page() {
	const session = (await cookies()).get('session')?.value as string;

	const units = (await getAllUnits(session)) as FetchUnit;
	const properties = (await getAllProperties(session)) as TPropertyFetch;
	const maintenancerequests = (await getActiveMaintenanceRequests(
		session,
	)) as TFetchMaintenanceRequests;

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
				<div>
					<Dashboard
						properties={properties}
						units={units}
						maintenancerequests={maintenancerequests.documents}
					/>
					{properties.documents.map((property) => (
						<MultiUnitPropertyManagement
							key={property.$id}
							property={property}
							maintenancerequests={maintenancerequests}
						/>
					))}
				</div>
			)}
			{/* <pre>{JSON.stringify(maintenancerequests, null, 4)}</pre> */}
			{isAdmin ? <pre>{JSON.stringify(user, null, 4)}</pre> : null}
		</div>
	);
}
