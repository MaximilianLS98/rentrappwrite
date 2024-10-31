import { axiosInstance } from '@/utils/axios';
import UnitCard from '@/components/unitcard/UnitCard';
import AddRandomUnit from '@/components/temp/AddRandomUnit';
import auth from '@/utils/auth';

export default async function Units() {
    const user = await auth.getUser();
    
	const units = await axiosInstance.get('/units');
	// const chat = await axiosInstance.get('/chats');

	return (
		<div>
			<h1>Units</h1>
            <div className='fixed bottom-10 left-10 m-2'>
			    <AddRandomUnit />
            </div>
			<section className='flex-1'>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
					{units.data.documents.map((unit: any) => {
						return <UnitCard key={unit.$id} unit={unit} />;
					})}
				</div>
			</section>
            <section className='mx-auto flex flex-wrap justify-center'>
			    <pre>{JSON.stringify(units.data, null, 2)}</pre>
            </section>
		</div>
	);
}
