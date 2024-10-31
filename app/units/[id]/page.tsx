import { axiosInstanceClient } from '@/utils/clientAxios';
// import { cookies } from 'next/headers';
import UnitCard from '@/components/unitcard/UnitCard';
import { RentalUnitDashboardComponent } from '@/components/rental-unit-dashboard';

export default async function Unit(props: any) {
	const { id } = props.params;
	// const sessionCookie = cookies().get('session')?.value;

	const { data } = await axiosInstanceClient.get(`/units/${id}`, {
		// headers: {
			// cookie: `session=${sessionCookie}`,
		// },
	});

	// const altData = async () => {
	// 	try {
	// 		const response = await fetch(`/api/units/${id}`);
	// 		const data = await response.json();
	// 		return data;
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// };

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
