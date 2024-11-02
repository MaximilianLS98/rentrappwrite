'use client';
import { useState, useEffect } from 'react';
import { axiosInstance } from '@/utils/axios';
import { axiosInstanceClient } from '@/utils/clientAxios';
import UnitCard from '@/components/unitcard/UnitCard';
import AddRandomUnit from '@/components/temp/AddRandomUnit';
// import { cookies } from 'next/headers';

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
export default function Units() {
//     const sessionCookie = cookies().get('session')?.value;
    const [units, setUnits] = useState<Unit[] | null>(null);

 useEffect(() => {
    (async () => {
    try {
        const response = await axiosInstanceClient.get('api/units');
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

    // const units = await axiosInstanceClient.get('api/units', {
    //     headers: {
    //         cookie: `session=${sessionCookie}`,
    //     },
    // })

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
