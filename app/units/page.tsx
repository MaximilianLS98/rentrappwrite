import UnitCard from '@/components/unitcard/UnitCard';
import AddRandomUnit from '@/components/temp/AddRandomUnit';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { getAllUnits, getAllUnassignedUnits } from '@/actions/units';
import { cookies } from 'next/headers';
import auth from '@/utils/auth';
import { FetchUnit, TUnit } from '@/constants/types/units';

export default async function Units() {
	const session = (await cookies()).get('session')?.value as string;
	const user = await auth.getUser();

	const units = (await getAllUnits(session)) as FetchUnit;

    const unassignedUnits = await getAllUnassignedUnits(session) as FetchUnit;

	return (
		<div className='container mx-auto p-4'>
			<div className='flex mt-8 mb-4 justify-between'>
				<h1 className='text-5xl'>Enheter</h1>
				<Link href='/units/create' className='my-auto hover:text-teal-500'>
					<Plus size={32} className='' />
				</Link>
			</div>
			<section className='flex-1'>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
					{units?.documents.map((unit: any) => {
						return <UnitCard key={unit.$id} unit={unit} />;
					})}
				</div>
			</section>
			{user.labels.includes('admin') && (
				<div className='my-6'>
					<div className='fixed bottom-10 left-10 m-2'>
						<AddRandomUnit />
					</div>
					<section className='mx-auto flex flex-wrap justify-center'>
						{/* <pre>{JSON.stringify(units, null, 2)}</pre> */}
					</section>
				</div>
			)}
            <section className='mx-auto flex flex-col flex-wrap justify-center'>
                <h1 className='text-5xl my-4'>All unassigned units</h1>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {unassignedUnits?.documents.map((unit: any) => {
                    return <UnitCard key={unit.$id} unit={unit} />;
                })}
                </div>
                <pre>{JSON.stringify(unassignedUnits, null, 2)}</pre>
            </section>
		</div>
	);
}
