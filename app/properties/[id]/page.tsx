import { cookies } from 'next/headers';
import { Card, CardContent, CardFooter, CardHeader, CardDescription } from '@/components/ui/card';
import { getPropertyById, deletePropertyById } from '@/actions/properties';
import { TPropertyFetch, TProperty } from '@/constants/types/properties';
import DeletePropertyButton from './DeletePropertyButton';

export default async function Page(props: any) {
	const { id } = await props.params;
	const session = (await cookies()).get('session')?.value as string;

	const property = (await getPropertyById(session, id)) as TProperty;

	const exampleProperty: Partial<TProperty> = {
		name: 'Ekelyveien 1D',
		address: 'Ekelyveien 1D',
		type: 'multiunit',
		owner: '671bf5b70024ad3767dc',
		postcode: null,
		bedrooms: null,
		bathrooms: null,
		squaremeters: null,
		$id: '67a7d8e30007be247652',
	};

	return (
		<div className='container mt-8'>
			<h1 className='text-5xl'>{property.name}</h1>
			<Card className='shadow-md'>
				{/* Display all the fields from exampleProperty, even the ones that are null */}
				<CardHeader>
					<h2 className='text-xl'>{property.name}</h2>
				</CardHeader>
				<CardContent>
					<h2 className='text-xl underline'>Eiendomsdetaljer: </h2>
					<ul>
						{Object.entries(exampleProperty).map(([key, value]) => (
							<li key={key}>
								<strong>{key}</strong>: {String(value)}
							</li>
						))}
					</ul>
					<div className='my-4'>
						<h2 className='text-xl underline'>Enheter tilhørende eiendommen: </h2>
						<ul>
							{property.units?.map((unit) => (
								<li key={unit.$id}>
									<strong>{unit.title}</strong>: {unit.$id}
								</li>
							))}
						</ul>
					</div>
				</CardContent>
				<CardFooter className='flex flex-col gap-4'>
					<div>Property ID: {property.$id}</div>
                    <DeletePropertyButton propertyId={property.$id} />
				</CardFooter>
			</Card>
			<pre>{JSON.stringify(property, null, 2)}</pre>
		</div>
	);
}
