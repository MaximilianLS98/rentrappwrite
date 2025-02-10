'use server';
import { createSessionClient } from '@/appwrite/config';
import { ID } from 'node-appwrite';

// Page with server actions for the tenants collection, fetching etc
// Trying server actions to have something work well in client components as well as server components
// ! NB - it might look like any user can fetch all units, but the user can only fetch units that they own, as per document security rules in Appwrite. We might want to implement
// ! a second layer where we check if the users id is the same as the owner id of the unit. To prevent any leaks if the security is changed in Appwrite

const getDatabase = async (sessionCookie: string) => {
	const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
	const collectionId = 'tenants';
	if (!databaseId || !collectionId) {
		throw new Error('Database ID or collection ID is not defined');
	}
	const { databases } = await createSessionClient(sessionCookie);
	return { databases, databaseId, collectionId };
};


const getAllTenants = async (sessionCookie: string) => {
    try {
        const { databases, databaseId, collectionId } = await getDatabase(sessionCookie);
        const tenants = await databases.listDocuments(databaseId, collectionId);
        return tenants;
    } catch (error) {
        console.error(error);
        return { error };
    }
};

const getTenantById = async (sessionCookie: string, id: string) => {
    try {
        const { databases, databaseId, collectionId } = await getDatabase(sessionCookie);
        const tenant = await databases.getDocument(databaseId, collectionId, id);
        return tenant;
    } catch (error) {
        console.error(error);
        return { error };
    }
};

const createTenant = async (sessionCookie: string, tenantData: any) => {
    try {
        const { databases, databaseId, collectionId } = await getDatabase(sessionCookie);
        const tenant = await databases.createDocument(databaseId, collectionId, ID.unique(), tenantData);
        return tenant;
    } catch (error) {
        console.error(error);
        return { error };
    }
};

const updateTenantById = async (sessionCookie: string, id: string, tenantData: any) => {
    try {
        const { databases, databaseId, collectionId } = await getDatabase(sessionCookie);
        const tenant = await databases.updateDocument(databaseId, collectionId, id, tenantData);
        return tenant;
    } catch (error) {
        console.error(error);
        return { error };
    }
};

const deleteTenantById = async (sessionCookie: string, id: string) => {
    try {
        const { databases, databaseId, collectionId } = await getDatabase(sessionCookie);
        await databases.deleteDocument(databaseId, collectionId, id);
        return { message: 'Tenant deleted' };
    } catch (error) {
        console.error(error);
        return { error };
    }
};

export { getAllTenants, getTenantById, createTenant, updateTenantById, deleteTenantById };
