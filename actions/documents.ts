// Page with server actions for the documents bucket, mainly uploading and serving rental contracts or other documents
// ! NB - it might look like any user can fetch all files, but the user can only fetch files that they own, as per document security rules in Appwrite. We might want to implement
// ! a second layer where we check if the users id is the same as the owner id of the file. To prevent any leaks if the security is changed in Appwrite

import { createSessionClient, createStorageClient } from '@/appwrite/config';
import { ID } from 'node-appwrite';
const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID_DOCUMENTS || 'documents';

const getStorage = async (sessionCookie: string) => {
	const { storage } = await createSessionClient(sessionCookie);
	return storage;
};

const getAllDocuments = async (sessionCookie: string) => {
	try {
		const storage = await getStorage(sessionCookie);
		const files = await storage.listFiles(BUCKET_ID);
		return files;
	} catch (error) {
		console.error(error);
		return { error };
	}
};

const getDocumentById = async (sessionCookie: string, documentId: string) => {
	try {
		const storage = await getStorage(sessionCookie);
		const document = await storage.getFile(BUCKET_ID, documentId);
		return document;
	} catch (error) {
		console.error(error);
		return { error };
	}
};

const uploadDocument = async (sessionCookie: string, file: File) => {
	const storage = await getStorage(sessionCookie);
	const fileId = ID.unique();
	const fileBuffer = await file.arrayBuffer();
	const appwriteFile = new File(
		[fileBuffer], // Blob or buffer data
		file.name, // Original file name
		{ type: file.type }, // MIME type
	);
	const result = await storage.createFile(BUCKET_ID, fileId, appwriteFile);
    // TODO - use the resulting fileId to update the lease document in the database with the fileId as document_id
	return result;
};

export { getAllDocuments, getDocumentById, uploadDocument };
