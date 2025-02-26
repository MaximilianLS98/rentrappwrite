import { CreateRentalUnitComponent } from '@/components/create-rental-unit';
import { getAllPropertyNamesAndIds } from '@/actions/properties';
import { cookies } from 'next/headers';

type Document = {
	name: string;
	$id: string;
};
type Result = {
	total?: number;
	documents?: Document[];
	error?: unknown;
};

export default async function Page() {
	const sessionCookie = (await cookies()).get('session')?.value ?? '';
	const response = await getAllPropertyNamesAndIds(sessionCookie) as Result;

	return (
		<main className='container mx-auto p-4'>
			<CreateRentalUnitComponent properties={response.documents ?? []} />
			<pre>{JSON.stringify(response, null, 2)}</pre>
		</main>
	);
}
