import { axiosInstanceClient } from '@/utils/clientAxios';
import { cookies } from 'next/headers';
import Image from 'next/image';
import AppwriteImage from '@/components/appwriteImage';
import { LandlordDashboardComponent } from '@/components/landlord-dashboard';

export default async function Page() {
	// const { data } = await axiosInstanceClient.get('/bucket', {
	// 	headers: {
	// 		cookie: `session=${cookies().get('session')?.value}`,
	// 	},
	// });
	return (
		<div className='p-4'>
			<LandlordDashboardComponent />
			{/* <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-auto'> */}
			{/* <div className='flex gap-4 flex-wrap'>
				{data.files.map((file: any) => {
					return <AppwriteImage fileId={file.$id} alt={file.name} key={file.$id} />;
				})}
			</div> */}
			<section id='upcomingImportantDates'></section>
			<section id='allunitsinalist'></section>
			<section id='mediaLibrary'></section>
			<section id='recentActivity'></section>
		</div>
	);
}
