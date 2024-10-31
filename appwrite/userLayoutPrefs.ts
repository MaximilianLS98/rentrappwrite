import { Client, Account, Databases, ID, Query } from 'appwrite';
import { createSessionClient } from './config';
import auth from '@/utils/auth';

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
if (!endpoint || !projectId) {
	throw new Error('Appwrite endpoint and project ID must be defined');
}
const client = new Client()
	.setEndpoint(endpoint) // Replace with your Appwrite endpoint
	.setProject(projectId); // Replace with your project ID

    const account = new Account(client);
	const databases = new Databases(client);


const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_PUBLIC_ID;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_PUBLIC_ID_USERPREFS;
if (!DATABASE_ID || !COLLECTION_ID) {
	throw new Error('Database ID or collection ID is not defined');
}

export const getUserLayout = async () => {
	try {
		const user = await account.get();
		const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
			Query.equal('user_id', user.$id),
		]);

		if (response.documents.length > 0) {
			return JSON.parse(response.documents[0].layout);
		}
		return null;
	} catch (error) {
		console.error('Error fetching user layout:', error);
		return null;
	}
};

export const saveUserLayout = async (layout: any) => {
	try {
		const user = await account.get();
		const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
			Query.equal('user_id', user.$id),
		]);

		if (response.documents.length > 0) {
			// Update existing document
			await databases.updateDocument(DATABASE_ID, COLLECTION_ID, response.documents[0].$id, {
				layout: JSON.stringify(layout),
			});
		} else {
			// Create new document
			await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
				user_id: user.$id,
				layout: JSON.stringify(layout),
			});
		}
	} catch (error) {
		console.error('Error saving user layout:', error);
	}
};

export const getCurrentUser = async () => {
    try {
        return await account.get();
    } catch (error) {
        console.error('Error fetching current user:', error);
        return null;
    }
};

export { account, databases };
