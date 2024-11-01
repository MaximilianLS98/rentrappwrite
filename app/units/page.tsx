'use client';
import { useState, useEffect } from 'react';
// import { axiosInstance } from '@/utils/axios';
import { axiosInstanceClient } from '@/utils/clientAxios';
import UnitCard from '@/components/unitcard/UnitCard';
import AddRandomUnit from '@/components/temp/AddRandomUnit';

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

export default function Units() {
    const [units, setUnits] = useState<Unit[] | null>(null);

 useEffect(() => {
    (async () => {
    try {
        const response = await axiosInstanceClient.get('/units');
        setUnits(response.data.documents);
    } catch (error) {
        console.error(error);
    }
    if (!units) {
        return <div>Loading...</div>;
    }
    }
    )();
    }, []);

	return (
		<div>
			<h1>Units</h1>
            <div className='fixed bottom-10 left-10 m-2'>
			    <AddRandomUnit setUnits={setUnits} />
            </div>
			<section className='flex-1'>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
					{units?.map((unit: any) => {
						return <UnitCard key={unit.$id} unit={unit} setUnits={setUnits} />;
					})}
				</div>
			</section>
            <section className='mx-auto flex flex-wrap justify-center'>
			    {/* <pre>{JSON.stringify(units, null, 2)}</pre> */}
            </section>
		</div>
	);
}
