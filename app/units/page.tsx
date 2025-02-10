
// import { useState, useEffect } from 'react';
import { axiosInstance } from '@/utils/axios';
import { axiosInstanceClient } from '@/utils/clientAxios';
import UnitCard from '@/components/unitcard/UnitCard';
import AddRandomUnit from '@/components/temp/AddRandomUnit';
import { Plus } from 'lucide-react';
import Link from 'next/link';
// import { cookies } from 'next/headers';
import { getAllUnits } from '@/actions/units';
import { cookies } from 'next/headers';

interface Unit {
	title: string;
	address: string;
	monthlyrent: number;
	deposit: number;
	housingtype: string;
	description: string;
	squaremeters: number;
	rating: number;
}

// TODO - Might want to make this into a server component instead, but have to then tweak both delete and add random unit components

// export default async function Units() {
export default async function Units() {
    const session = (await cookies()).get('session')?.value as string;

	// const [units, setUnits] = useState<Unit[] | null>(null);

	// useEffect(() => {
	// 	(async () => {
	// 		try {
	// 			const response = await axiosInstanceClient.get('api/units');
	// 			setUnits(response.data.documents);
	// 		} catch (error) {
	// 			console.error(error);
	// 		}
	// 		if (!units) {
	// 			return <div>Loading...</div>;
	// 		}
	// 	})();
	// }, []);

    const units = await getAllUnits(session) as any;

	return (
		<div className='container mx-auto p-4'>
			<div className='flex mt-8 mb-4 justify-between'>
				<h1 className='text-5xl'>Enheter</h1>
				<Link href='/units/create' className='my-auto hover:text-teal-500'>
					<Plus size={32} className='' />
				</Link>
			</div>
			<div className='fixed bottom-10 left-10 m-2'>
				<AddRandomUnit />
			</div>
			<section className='flex-1'>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
					{units?.documents.map((unit: any) => {
						return <UnitCard key={unit.$id} unit={unit} />;
					})}
				</div>
			</section>
			<section className='mx-auto flex flex-wrap justify-center'>
				{/* <pre>{JSON.stringify(units, null, 2)}</pre> */}
			</section>
		</div>
	);
}
