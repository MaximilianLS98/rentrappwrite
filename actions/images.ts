import { createSessionClient } from "@/appwrite/config";
import { ID } from "node-appwrite";
import { cookies } from "next/headers";

// ? This file is for uploading images to the storage bucket, and also handles creating metadata for the images in the database
// ? and updating the relevant unit with the image metadata

async function fileToUint8Array(file:File) {
	const buffer = await file.arrayBuffer();
	return new Uint8Array(buffer);
}

const uploadImage = async (image:File, unitId:string) => {
    // Get the session cookie
    const cookieObj = await cookies();
    const sessionCookie = cookieObj.get('session')?.value as string;

    // Get the bucket ID
    const bucketId = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID_IMAGES;
    if (!bucketId) {
        throw new Error('Bucket ID is not defined');
    }

    // Create the storage and database clients
    const { storage } = await createSessionClient(sessionCookie);
    const { databases } = await createSessionClient(sessionCookie);

    // Create the file in the storage bucket
    const file = await storage.createFile(bucketId, ID.unique(), image);

    // Create the metadata for the image in the database
    const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
    const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_IMAGEMETADATA;
    if (!databaseId || !collectionId) {
        throw new Error('Database ID or collection ID is not defined');
    }
    const unit = await databases.createDocument(databaseId, collectionId, file.$id, {
        units: unitId,
        name: image.name,
        type: image.type,
        size: image.size,
    });

    // Return the metadata for the image
    return { message: `Image created`, metadata: unit, file };
}

const getImagePreview = async (imageId:string) => {
    // Get the session cookie
	const sessionCookie = (await cookies()).get('session')?.value as string;


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
}

const getImageIdList = async () => {
    // Get the session cookie
    const cookieObj = await cookies();
    const sessionCookie = cookieObj.get('session')?.value as string;

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
}

export { uploadImage, getImagePreview, getImageIdList };