'use server';
import { createSessionClient } from '@/appwrite/config';
import { ID } from 'node-appwrite';

// Page with server actions for the leases collection, fetching etc
// Trying server actions to have something work well in client components as well as server components
// ! NB - it might look like any user can fetch all units, but the user can only fetch units that they own, as per document security rules in Appwrite. We might want to implement
// ! a second layer where we check if the users id is the same as the owner id of the unit. To prevent any leaks if the security is changed in Appwrite

const getDatabase = async (sessionCookie:string) => {
	const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
	const collectionId = 'leases';
	if (!databaseId || !collectionId) {
		throw new Error('Database ID or collection ID is not defined');
	}
    const { databases } = await createSessionClient(sessionCookie);
	return { databases, databaseId, collectionId };
};

const getAllLeases = async (sessionCookie: string) => {
    try {
        const { databases, databaseId, collectionId } = await getDatabase(sessionCookie);
        const leases = await databases.listDocuments(databaseId, collectionId);
        return leases;
    } catch (error) {
        console.error(error);
        return { error };
    }
};

const getLeaseById = async (sessionCookie: string, id: string) => {
    try {
        const { databases, databaseId, collectionId } = await getDatabase(sessionCookie);
        const lease = await databases.getDocument(databaseId, collectionId, id);
        return lease;
    } catch (error) {
        console.error(error);
        return { error };
    }
};

const createLease = async (sessionCookie: string, leaseData: any) => {
    try {
        const { databases, databaseId, collectionId } = await getDatabase(sessionCookie);
        const lease = await databases.createDocument(databaseId, collectionId, ID.unique(), leaseData);
        return lease;
    } catch (error) {
        console.error(error);
        return { error };
    }
};

const updateLeaseById = async (sessionCookie: string, id: string, leaseData: any) => {
    try {
        const { databases, databaseId, collectionId } = await getDatabase(sessionCookie);
        const lease = await databases.updateDocument(databaseId, collectionId, id, leaseData);
        return lease;
    } catch (error) {
        console.error(error);
        return { error };
    }
};

const deleteLeaseById = async (sessionCookie: string, id: string) => {
    try {
        const { databases, databaseId, collectionId } = await getDatabase(sessionCookie);
        await databases.deleteDocument(databaseId, collectionId, id);
        return { success: true };
    } catch (error) {
        console.error(error);
        return { error };
    }
};

export { getAllLeases, getLeaseById, createLease, updateLeaseById, deleteLeaseById };