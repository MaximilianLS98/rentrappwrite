import { axiosInstanceClient } from '@/utils/clientAxios';
import { cookies } from 'next/headers';
import UnitCard from '@/components/unitcard/UnitCard';
import { RentalUnitDashboardComponent } from '@/components/rental-unit-dashboard';
import { getUnitById } from '@/actions/units';

export default async function Unit(props: any) {
	const { id } = await props.params;
	const session = (await cookies()).get('session')?.value as string;

	const unit = await getUnitById(session, id) as any;

	return (
		<main>
			<RentalUnitDashboardComponent {...unit} />
			<pre>{JSON.stringify(unit, null, 2)}</pre>
		</main>
	);
}
