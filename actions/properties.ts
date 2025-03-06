'use server';
import { createSessionClient } from '@/appwrite/config';
import { ID, Query } from 'node-appwrite';
import auth from '@/utils/auth';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

// Page with server actions for the properties collection, fetching etc
// Trying server actions to have something work well in client components as well as server components
// ! NB - it might look like any user can fetch all units, but the user can only fetch units that they own, as per document security rules in Appwrite. We might want to implement
// ! a second layer where we check if the users id is the same as the owner id of the unit. To prevent any leaks if the security is changed in Appwrite

const getDatabase = async (sessionCookie: string) => {
	const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
	const collectionId = 'properties';
	if (!databaseId || !collectionId) {
		throw new Error('Database ID or collection ID is not defined');
	}
	const { databases } = await createSessionClient(sessionCookie);
	return { databases, databaseId, collectionId };
};

const getAllProperties = async (sessionCookie: string) => {
	try {
		const { databases, databaseId, collectionId } = await getDatabase(sessionCookie);
		const properties = await databases.listDocuments(databaseId, collectionId);
		return properties;
	} catch (error) {
		console.error(error);
		return { error };
	}
};

const getAllPropertyNamesAndIds = async (sessionCookie: string) => {
    console.log(`Trying to get all property names`);
	try {
		const { databases, databaseId, collectionId } = await getDatabase(sessionCookie);
		const properties = await databases.listDocuments(databaseId, collectionId, [
			Query.select(['name', '$id']),
            Query.limit(100),
		]);
        console.log(`Property names found: ${properties}`);
		return properties;
	} catch (error) {
		console.error(error);
		return { error };
	}
};

const getPropertyById = async (sessionCookie: string, id: string) => {
	try {
		const { databases, databaseId, collectionId } = await getDatabase(sessionCookie);
		const property = await databases.getDocument(databaseId, collectionId, id);
		return property;
	} catch (error) {
		console.error(error);
		return { error };
	}
};

const createProperty = async (sessionCookie: string, propertyData: any) => {
	const userId = (await auth.getUser()).$id;
	propertyData.owner = userId;
    let redirectPath: string = '/';

	try {
        redirectPath = '/properties';        
		const { databases, databaseId, collectionId } = await getDatabase(sessionCookie);
		const property = await databases.createDocument(
			databaseId,
			collectionId,
			ID.unique(),
			propertyData,
		);
		// return property;
	} catch (error) {
		console.error(error);
        redirectPath = '/properties/create';
		return { error };
	} finally {
        revalidatePath('/properties');
        redirect(redirectPath);
    }
};

const updatePropertyById = async (sessionCookie: string, id: string, propertyData: any) => {
	try {
		const { databases, databaseId, collectionId } = await getDatabase(sessionCookie);
		const property = await databases.updateDocument(databaseId, collectionId, id, propertyData);
        revalidatePath('/properties');
        redirect('/properties');
	} catch (error) {
		console.error(error);
		return { error };
	}
};

const deletePropertyById = async (sessionCookie: string, id: string) => {
	try {
		const { databases, databaseId, collectionId } = await getDatabase(sessionCookie);
		await databases.deleteDocument(databaseId, collectionId, id);
		return { message: 'Property deleted' };
	} catch (error) {
		console.error(error);
		return { error };
	} finally {
        revalidatePath('/properties');
        redirect('/properties');
    }
};

export {
	getAllProperties,
	getPropertyById,
	createProperty,
	updatePropertyById,
	deletePropertyById,
    getAllPropertyNamesAndIds
};
