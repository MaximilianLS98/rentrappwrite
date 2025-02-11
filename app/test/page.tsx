import UploadFile from '@/components/UploadFile';
import { getAllUnits } from '@/actions/units';
import { getAllProperties } from '@/actions/properties';
import { getAllTenants } from '@/actions/tenants';
import { getAllLeases } from '@/actions/leases';
import { uploadImage } from '@/actions/images';
import { cookies } from 'next/headers';
import Form from './form';


export default async function Test() {
	const session = (await cookies()).get('session')?.value;
	if (!session) {
		return (
			<div>
				<h1>Unauthorized</h1>
			</div>
		);
	}

	const units = await getAllUnits(session);
	const properties = await getAllProperties(session);
	const tenants = await getAllTenants(session);
	const leases = await getAllLeases(session);


	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <Form />
			{/* <UploadFile /> */}
			{/* <pre>{JSON.stringify(units, null, 2)}</pre> */}
			<pre>{JSON.stringify(properties, null, 2)}</pre>
			<pre>{JSON.stringify(tenants, null, 2)}</pre>
			<pre>{JSON.stringify(leases, null, 2)}</pre>
			{/* <pre>{JSON.stringify(specificUnit, null, 2)}</pre> */}
		</main>
	);
}
