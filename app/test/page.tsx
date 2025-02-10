import UploadFile from '@/components/UploadFile';
import { getAllUnits } from '@/actions/units';
import { getAllProperties } from '@/actions/properties';
import { getAllTenants } from '@/actions/tenants';
import { getAllLeases } from '@/actions/leases';
import { uploadImage } from '@/actions/images';
import { cookies } from 'next/headers';

export default async function Test() {
  const session = (await cookies()).get('session')?.value;
  if (!session) {
    return (
      <div>
        <h1>Unauthorized</h1>
      </div>
    )
  }

  
  
  const units = await getAllUnits(session);
  const properties = await getAllProperties(session);
  const tenants = await getAllTenants(session);
  const leases = await getAllLeases(session);

  async function handleUpload(formData: FormData) {
		'use server'; // Server action!

		const files = formData.getAll('files') as File[];
		if (files.length === 0) throw new Error('No files uploaded');

		const uploadResults = await Promise.all(
			files.map(async (file) => {
				const result = await uploadImage(file, '67aa27c300313cc4c37a');
				return { fileName: file.name, fileId: result.file.$id };
			}),
		);

		console.log('Upload Results:', uploadResults);
  }

  return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <form action={handleUpload} method='POST' className='flex flex-col items-center gap-4 p-4 border rounded-lg shadow-md'>
        <label className='text-lg font-semibold'>Select multiple images:</label>
        <input type='file' name='files' accept='image/*' multiple className='p-2 border rounded-md' />
        <button type='submit' className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'>Upload Images</button>
      </form>
			{/* <UploadFile /> */}
			{/* <pre>{JSON.stringify(units, null, 2)}</pre> */}
			<pre>{JSON.stringify(properties, null, 2)}</pre>
			<pre>{JSON.stringify(tenants, null, 2)}</pre>
			<pre>{JSON.stringify(leases, null, 2)}</pre>
			{/* <pre>{JSON.stringify(specificUnit, null, 2)}</pre> */}
		</main>
  );
}