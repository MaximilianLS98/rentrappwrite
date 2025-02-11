'use client';

import { useState, useEffect } from 'react';
import { uploadImage } from '@/actions/images';
import { toast } from 'sonner'; 

export default function Form() {
    const [result, setResult] = useState('');
    const [session, setSession] = useState('');

    useEffect(() => {
        // get and set the sessionCookie
        fetch('api/cookie').then((res) => res.json()).then((data) => {
            setSession(data.session);
            console.log('Session cookie:', data.session);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-de
    , [session]);
    

    async function handleUpload(formData: FormData) {
        try {
            const files = formData.getAll('files') as File[];
            if (files.length === 0) throw new Error('No files uploaded');
            const uploadResults = await Promise.all(
				files.map(async (file) => {
					const result = await uploadImage(file, '67aa27c300313cc4c37a', session);
					return { fileName: file.name, fileId: result.file.$id };
				}),
			);
            console.log('Upload Results:', uploadResults);
            setResult('Upload successful');
            toast.success('Upload successful');
        } catch (error) {
            console.error('Upload error:', error);
            setResult('Upload failed');
            toast.error('Upload failed');
        }

    }



	return (
		<div>
            <h1>{result}</h1>
			<form
				action={handleUpload}
				className='flex flex-col items-center gap-4 p-4 border rounded-lg shadow-md'>
				<label className='text-lg font-semibold'>Select multiple images:</label>
				<input
					type='file'
					name='files'
					accept='image/*'
					multiple
					className='p-2 border rounded-md'
				/>
				<button
					type='submit'
					className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'>
					Upload Images
				</button>
			</form>
		</div>
	);
}
