import { axiosInstance } from '@/utils/axios';
import { cookies } from 'next/headers';
import { Card, CardContent, CardFooter, CardHeader, CardDescription } from '@/components/ui/card';
import { getPropertyById } from '@/actions/properties';
import MultiUnitPropertyManagement from '../MultiView';
import SingleUnitPropertyManagement from '../SinlgeView';

type Property = {
	name: string;
	address: string;
	type: string;
	owner: string;
	$id: string;
	$createdAt: string;
	$updatedAt: string;
	$permissions: string[];
	$databaseId: string;
	$collectionId: string;
};

export default async function Page(props:any) {
    const { id } = await props.params;
	const session = (await cookies()).get('session')?.value as string;
    
    const property = await getPropertyById(session, id) as Property;

	return (
		<div className='container mt-8'>
			<h1 className='text-5xl'>{property.name}</h1>
            <Card className='shadow-md'>
                <CardHeader className='text-4xl'>{property.name}</CardHeader>
                <CardContent>
                    <CardDescription>{property.address}</CardDescription>
                </CardContent>
                <CardFooter>{property.type}</CardFooter>
            </Card>
			{/* <pre>{JSON.stringify(property, null, 2)}</pre> */}
		</div>
	);
}
