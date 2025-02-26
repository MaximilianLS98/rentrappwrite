import { cookies } from 'next/headers';
import { LandlordDashboardComponent } from '@/components/landlord-dashboard';
import auth from '@/utils/auth';
import { getAllUnits } from '@/actions/units';
import type { FetchUnit } from '@/constants/types/units';
import { getAllMaintenanceRequests } from '@/actions/maintenanceRequests';
import type { TFetchMaintenanceRequests } from '@/constants/types/maintenancerequests';
import { getAllProperties } from '@/actions/properties';
import { TPropertyFetch } from '@/constants/types/properties';

export default async function Page() {
	const session = (await cookies()).get('session')?.value as string;
	const user = await auth.getUser();

	const units = await getAllUnits(session) as FetchUnit;
	const maintenancerequests = await getAllMaintenanceRequests(session) as TFetchMaintenanceRequests;
	const properties = await getAllProperties(session) as TPropertyFetch;

	return (
		<div className='p-2 md:p-4'>
			<LandlordDashboardComponent rentalUnits={units.documents} user={user} maintenanceRequests={maintenancerequests.documents}  />
		</div>
	);
}
