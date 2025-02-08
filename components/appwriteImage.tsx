import Image from 'next/image';
import { axiosInstanceClient } from '@/utils/clientAxios';
import axios from 'axios';
import { cookies } from 'next/headers';

interface AppwriteImageProps {
	fileId: string;
	width?: number;
	height?: number;
	output?: string;
	alt?: string;
	quality?: number;
}

export default async function AppwriteImage({
	fileId,
	width,
	height,
	output,
	alt = 'Appwrite Image',
	quality = 30,
}: AppwriteImageProps) {
	// ! I DONT THINK THIS PART WORKS IN PRODUCTION, BECAUSE ITS HARDCODED TO LOCALHOST
	//! const src = `http://localhost:3000/api/storage/${fileId}`;
	// const source = await axiosInstanceClient.get(`/storage/${fileId}`);
	const imageUrl = `http://localhost:3000/api/bucket/images/${fileId}?${new URLSearchParams({
		...(width && { width: width.toString() }),
		...(height && { height: height.toString() }),
		...(output && { output }),
		... (quality && { quality: quality.toString() }),
	})}`;

	try {
		const sessionCookie = (await cookies()).get('session')?.value;
		const response = await axios.get(imageUrl, {
			responseType: 'arraybuffer', //'blob',
			headers: {
				cookie: `session=${sessionCookie}`,
			},
		});
		/*
        console.log('response:', response);
        // The response is a blob, so we need to convert it to base64
        const blob = response.data;
		const objectUrl = URL.createObjectURL(blob);
        console.log('objectUrl:', objectUrl);
        */
		const buffer = Buffer.from(response.data, 'binary');
		const base64Image = buffer.toString('base64');
		const mimeType = response.headers['content-type'];
		// console.log(`data:${mimeType};base64,${base64Image} KEBAB`);

		return (
			// <div className='relative h-[200px]'>
			<div className='max-w-52'>
				<Image
					src={`data:${mimeType};base64,${base64Image}`}
					alt={alt}
                    // fill={true}
                    className='object-contain w-full h-auto'
                    // className='object-cover'
					width={300}
					height={200}
				/>
			</div>
		);
	} catch (error) {
		// console.error('Error fetching image:', error);
		return <div>Error loading image</div>;
	}
}
