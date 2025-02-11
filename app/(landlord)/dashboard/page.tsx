import { cookies } from 'next/headers';
import { LandlordDashboardComponent } from '@/components/landlord-dashboard';
import auth from '@/utils/auth';
import { getAllUnits } from '@/actions/units';
import type { FetchUnit } from '@/constants/types/units';

export default async function Page() {
	const session = (await cookies()).get('session')?.value as string;
	const user = await auth.getUser();

	const units = await getAllUnits(session) as FetchUnit;

	return (
		<div className='p-2 md:p-4'>
			<LandlordDashboardComponent rentalUnits={units.documents} user={user}  />
		</div>
	);
}
