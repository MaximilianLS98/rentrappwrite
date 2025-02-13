import { getAllProperties } from '@/actions/properties';
import { TProperty, TPropertyFetch } from '@/constants/types/properties';
import { cookies } from 'next/headers';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

export default async function Page() {
	const session = (await cookies()).get('session')?.value ?? '';

	const properties = (await getAllProperties(session)) as TPropertyFetch;

	return (
		<div className='container p-2'>
			<h1 className='text-5xl font-semibold'>Eiendommer</h1>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
				{properties.documents.map((property: TProperty) => {
					return (
                        <Link href={`/properties/${property.$id}`} key={property.$id}>
						<Card key={property.$id} className='my-4'>
							<CardHeader className='p-0'></CardHeader>
							<CardContent className='p-4 bg-card'>
								<CardTitle className='text-lg mb-2'>{property.name}</CardTitle>
								<CardDescription className='text-muted-foreground'>
									{property.type}
								</CardDescription>
							</CardContent>
							<CardFooter className='bg-card px-4 py-2 flex justify-between items-center'>
								<div className='flex items-center'>
									<span className='text-sm font-semibold'>
										{property.address}
									</span>
								</div>
							</CardFooter>
						</Card>
                        </Link>
					);
				})}
			</div>
			{/* <pre>{JSON.stringify(properties, null, 2)}</pre> */}
		</div>
	);
}
