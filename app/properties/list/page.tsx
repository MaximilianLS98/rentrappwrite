import { getAllProperties } from '@/actions/properties';
import { TProperty, TPropertyFetch } from '@/constants/types/properties';
import { getActiveMaintenanceRequests } from '@/actions/maintenanceRequests';
import { TFetchMaintenanceRequests } from '@/constants/types/maintenancerequests';
import { cookies } from 'next/headers';
import MultiUnitPropertyManagement from '../MultiView';

export default async function Page() {
	const session = (await cookies()).get('session')?.value ?? '';

	const properties = (await getAllProperties(session)) as TPropertyFetch;
	const maintenancerequests = (await getActiveMaintenanceRequests(
		session,
	)) as TFetchMaintenanceRequests;

	return (
		<div className='container p-2'>
			<h1 className='text-5xl font-semibold'>Eiendommer</h1>
			{properties.documents.map((property: TProperty) => (
				<MultiUnitPropertyManagement key={property.$id} property={property} maintenancerequests={maintenancerequests} />
			))}
			<pre>{JSON.stringify(properties, null, 2)}</pre>
		</div>
	);
}
