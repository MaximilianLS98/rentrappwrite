import { NextRequest, NextResponse } from 'next/server';
import { createSessionClient, createStorageClient } from '@/appwrite/config';
import { cookies } from 'next/headers';
import { ID } from 'node-appwrite';

export async function GET(request: NextRequest) {
	const allCookies = await cookies();
	const sessionCookie = allCookies.get('session');
	console.log(`Session cookie in GET image route: ${sessionCookie}`);
	if (!sessionCookie) {
		return NextResponse.json({ error: 'No session cookie found' });
	}
	try {
		const { storage } = await createStorageClient(sessionCookie?.value);
		const files = await storage.listFiles(
			process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID_IMAGES || '671aaa230027397d8ec6',
		);
		console.log(`Files in GET all documents: ${JSON.stringify(files)}`);
		return NextResponse.json(files);
	} catch (error) {
		console.error(`There was an error in GET api/bucket/route.ts: ${error}`);
		return NextResponse.json({ error });
	}
}

export async function POST(request: NextRequest) {
	// const { data } = await request.json();
	const allCookies = await cookies();
	const sessionCookie = allCookies.get('session');
    console.log(`Session cookie in POST image route: ${sessionCookie}`);
	const { storage: storageClient } = await createStorageClient(sessionCookie?.value);
	const { databases: databaseClient } = await createSessionClient(sessionCookie?.value);
	// ? We need to pass the image into the storage.createFile function, that in turn will return the file ID we need to store in the database with metadata
	try {
		const formData = await request.formData();
		// const image = formData.get('image') as File;
		// ? the images is stored in the formData under image${id} where id is the number of the image
		// ? we need to get all the images from the form data and store them in an array
		const images = [];
		let image;
		let i = 0;
		while ((image = formData.get(`image${i}`) as File)) {
			images.push(image);
			i++;
		}

		const uploadedFiles = [];

		if (images.length === 0) {
			return NextResponse.json({ error: 'No image files provided' }, { status: 400 });
		}

		for (const imageFile of images) {
			const fileBuffer = await imageFile.arrayBuffer();
			const appwriteFile = new File(
				[fileBuffer], // Blob or buffer data
				imageFile.name, // Original file name
				{ type: imageFile.type }, // MIME type
			);
			const fileId = ID.unique(); // Unique ID for each file

			// Upload to Appwrite bucket
			const bucketId = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID_IMAGES;
			if (!bucketId) {
				console.log(`Should return error here for no bucket ID`);
				throw new Error('Bucket ID is not defined');
			}
			const response = await storageClient.createFile(
				bucketId,
				fileId,
				appwriteFile, // Appwrite requires Uint8Array
			);

			uploadedFiles.push({
				fileId: response.$id,
				name: imageFile.name,
				mimeType: imageFile.type,
			});

			// Optionally, create a metadata document
			// await databaseClient.createDocument('collectionId', ID.unique(), {
			//     fileId: response.$id,
			//     name: imageFile.name,
			//     type: imageFile.type,
			//     size: imageFile.size,
			//     timestamp: new Date().toISOString()
			// });

			if (response && response.$id) {
				const document = await databaseClient.createDocument(
					process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '',
					process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_IMAGEMETADATA || '',
					fileId,
					{
						name: imageFile.name,
						type: imageFile.type,
						size: imageFile.size,
						units: formData.get('unitId') || null,
					},
				);
				console.log(`Document created: ${JSON.stringify(document)}`);
			} else {
				console.log(`No response from createFile`);
			}
		}

		return NextResponse.json({ success: true, files: uploadedFiles });
	} catch (error) {
		console.error('Upload error:', error);
		return NextResponse.json(
			{ success: false, error: 'Failed to upload images.' },
			{ status: 500 },
		);
	}
}
// 		const result = await Promise.all(images.map(async (image, i) => {
// 			console.log(`Image in the loop: ${image}, iteration: ${i}`);
// 			// try {
// 				const bucketId = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID_IMAGES;
// 				if (!bucketId) {
//                     console.log(`Should return error here for no bucket ID`);
// 					throw new Error('Bucket ID is not defined');
// 				}
// 				const { storage } = await createStorageClient(sessionCookie?.value);
// 				const file = await storage.createFile(bucketId, ID.unique(), image);
// 				if (!file.$id) {
//                     console.log(`Should return error here for no file ID after creating file`);
// 					throw new Error('File was not uploaded successfully, no file ID was returned');
// 				}
// 				const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
// 				const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_IMAGEMETADATA;
// 				if (!databaseId || !collectionId) {
//                     console.log(`Should return error here for no database ID or collection ID`);
// 					throw new Error('Database ID or collection ID is not defined');
// 				}
// 				const { databases } = await createSessionClient(sessionCookie?.value);
// 				const unit = await databases.createDocument(databaseId, collectionId, file.$id, {
// 					test: 'tester',
// 				});
//                 console.log(`Unit after creating document in image route: ${JSON.stringify(unit)}, and file ${JSON.stringify(file)}`);
//                 const objectToReturn = { message: `Image ${i + 1} created`, metadata: unit, file };
//                 return objectToReturn;
// 			// } catch (error) {
// 				// console.error(error);
// 				// return NextResponse.json({ error: 'Access denied' }, { status: 403 });
// 			// }
// 		}));
//         console.log(`Result after the .map operation and right before NextResponse in image route: ${JSON.stringify(result)}`);

// 		return NextResponse.json(result, { status: 200 });

// 		// try {
// 		// 	const bucketId = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID_IMAGES;
// 		//     if (!bucketId) {
// 		//         throw new Error('Bucket ID is not defined');
// 		//     }
// 		// 	const { storage } = await createStorageClient(sessionCookie?.value);
// 		// 	const file = await storage.createFile(bucketId, ID.unique(), image);
// 		// 	if (!file.$id) {
// 		// 		throw new Error('File was not uploaded successfully, no file ID was returned');
// 		// 	}
// 		// 	const { databases } = await createSessionClient(sessionCookie?.value);
// 		// 	const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID
// 		//     const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_IMAGEMETADATA;
// 		//     if (!databaseId || !collectionId) {
// 		//         throw new Error('Database ID or collection ID is not defined');
// 		//     }
// 		// 	const unit = await databases.createDocument(
// 		// 		databaseId,
// 		// 		collectionId,
// 		// 		file.$id,
// 		// 		{
// 		//             test: 'tester',
// 		// 		},
// 		// 	);

// 		// 	return NextResponse.json({ message: 'Image created', metadata: unit, file });
// 		// } catch (error) {
// 		// 	console.error(error);
// 		// 	return NextResponse.json({ error: 'Access denied' }, { status: 403 });
// 		// }
// 	} catch (error) {
// 		console.error(error);
// 		return NextResponse.json({ error: 'Access denied' }, { status: 403 });
// 	}
// }
