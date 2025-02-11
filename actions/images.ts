import { createSessionClient } from '@/appwrite/config';
import { ID } from 'node-appwrite';
// import { cookies } from 'next/headers';
// 
// ? This file is for uploading images to the storage bucket, and also handles creating metadata for the images in the database
// ? and updating the relevant unit with the image metadata

// ? Server action to upload image to storage bucket and create metadata in database, only supports one image at a time so call this function for each image
const uploadImage = async (image: File, unitId?: string, session?: string) => {
    console.log(`All params in uploadImage: ${image}, ${unitId}, ${session}`);
    
	let cookie = '';
	// Get the session cookie
	if (!session) {
		// const cookieObj = await cookies();
		// const sessionCookie = cookieObj.get('session')?.value as string;
		// cookie = sessionCookie;
	} else {
		cookie = session;
	}

	// Get the bucket ID
	const bucketId = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID_IMAGES;
	if (!bucketId) {
		throw new Error('Bucket ID is not defined');
	}

    console.log(`Session cookie in uploadImage: ${cookie}`);
	// Create the storage and database clients
	const { storage } = await createSessionClient(session);
	const { databases } = await createSessionClient(session);

	// Create the file in the storage bucket
	const file = await storage.createFile(bucketId, ID.unique(), image);

	// Create the metadata for the image in the database
	const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
	const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_IMAGEMETADATA;
	if (!databaseId || !collectionId) {
		throw new Error('Database ID or collection ID is not defined');
	}
	const unit = await databases.createDocument(databaseId, collectionId, file.$id, {
		units: unitId ?? null,
		name: image.name,
		type: image.type,
		size: image.size,
	});

	// Return the metadata for the image
	return { message: `Image created`, metadata: unit, file };
};

// ? Server action to assign image to unit, by updating the metadata in the database, not the actual image in the storage bucket
const assignImageToUnit = async (imageId: string, unitId: string, sessionCookie:string) => {
	// Get the session cookie
	// const cookieObj = await cookies();
	// const sessionCookie = cookieObj.get('session')?.value as string;

	// Create the database client
	const { databases } = await createSessionClient(sessionCookie);

	// Update the unit with the image ID
	const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
	const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_IMAGEMETADATA;
	if (!databaseId || !collectionId) {
		throw new Error('Database ID or collection ID is not defined');
	}
	const metadata = await databases.updateDocument(databaseId, collectionId, imageId, {
		units: unitId,
	});

	// Return the updated unit
	return metadata;
};

// ! - Untested
const getImagePreview = async (imageId: string, sessionCookie: string) => {
	// Get the session cookie
	// const sessionCookie = (await cookies()).get('session')?.value as string;

	// Get the bucket ID
	const bucketId = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID_IMAGES;
	if (!bucketId) {
		throw new Error('Bucket ID is not defined');
	}

	// Create the storage client
	const { storage } = await createSessionClient(sessionCookie);

	// Get the file from the storage bucket
	const file = await storage.getFilePreview(bucketId, imageId);

	// Return the file
	return file;
};

// ? Server action to get the list of all images and all their metadata for the current user
const getImageIdList = async (sessionCookie:string) => {
	// Get the session cookie
	// const cookieObj = await cookies();
	// const sessionCookie = cookieObj.get('session')?.value as string;

	// Get the bucket ID
	const bucketId = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID_IMAGES;
	if (!bucketId) {
		throw new Error('Bucket ID is not defined');
	}

	// Create the storage client
	const { storage } = await createSessionClient(sessionCookie);

	// Get the list of files in the storage bucket
	const files = await storage.listFiles(bucketId);

	// Return the list of file IDs
	// return files.files.map(file => file.$id);
	return files.files;
};

export { uploadImage, getImagePreview, getImageIdList, assignImageToUnit };
