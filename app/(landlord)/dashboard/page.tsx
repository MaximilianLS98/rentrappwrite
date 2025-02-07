import { axiosInstanceClient } from '@/utils/clientAxios';
import { cookies } from 'next/headers';
import Image from 'next/image';
import AppwriteImage from '@/components/appwriteImage';
import { LandlordDashboardComponent } from '@/components/landlord-dashboard';
import auth from '@/utils/auth';

export default async function Page() {
	const allCookies = await cookies();
	const user = await auth.getUser();
	// const { data } = await axiosInstanceClient.get('/bucket', {
	// 	headers: {
	// 		cookie: `session=${cookies().get('session')?.value}`,
	// 	},
	// });

	// const { data } = await axiosInstanceClient.get('/api/units', {
	// 	headers: {
	// 		cookie: `session=${allCookies.get('session')?.value}`,
	// 	},
	// });

	const data = await fetch('https://dashboard.kaktusfamilien.com/api/units', {
		headers: {
			cookie: `session=${allCookies.get('session')?.value}`,
		},
	}).then((res) => res.json());

	const rentalUnits = data.documents;

	return (
		<div className='p-2 md:p-4'>
			<LandlordDashboardComponent rentalUnits={rentalUnits} user={user}  />

			{/* <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-auto'> */}
			{/* <div className='flex gap-4 flex-wrap'>
				{data.files.map((file: any) => {
					return <AppwriteImage fileId={file.$id} alt={file.name} key={file.$id} />;
				})}
			</div> */}
		</div>
	);
}
