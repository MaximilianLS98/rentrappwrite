import { axiosInstanceClient } from '@/utils/clientAxios';
import { cookies } from 'next/headers';
import UnitCard from '@/components/unitcard/UnitCard';
import { RentalUnitDashboardComponent } from '@/components/rental-unit-dashboard';

export default async function Unit(props: any) {
	const id = await (props.params).id;
	const allCookies = await cookies();
	const sessionCookie = allCookies.get('session')?.value;

	const { data } = await axiosInstanceClient.get(`api/units/${id}`, {
		headers: {
			cookie: `session=${sessionCookie}`,
		},
	});

    if(data.code === 404) {
        throw new Error('Unit not found');
    }

    if(data.error) {
        throw new Error(data.error);
    }

	return (
		<main>
            <RentalUnitDashboardComponent unit={data} />
			<section>
				{/* <h1>Sinlge unit page</h1>
				<pre>{JSON.stringify(altData(), null, 2)}</pre>
				<pre>{JSON.stringify(data, null, 2)}</pre>
				<div className='max-w-lg mx-auto'>
					<UnitCard unit={data} />
				</div> */}
			</section>
		</main>
	);
}
