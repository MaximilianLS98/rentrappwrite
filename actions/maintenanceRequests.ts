'use server';
import { createSessionClient } from '@/appwrite/config';
import { ID, Query } from 'node-appwrite';
import { cookies } from 'next/headers';

// Page with server actions for the leases collection, fetching etc
// Trying server actions to have something work well in client components as well as server components
// ! NB - it might look like any user can fetch all units, but the user can only fetch units that they own, as per document security rules in Appwrite. We might want to implement
// ! a second layer where we check if the users id is the same as the owner id of the unit. To prevent any leaks if the security is changed in Appwrite

const getDatabase = async (sessionCookie: string) => {
	const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
	const collectionId = 'maintenancerequests';
	if (!databaseId || !collectionId) {
		throw new Error('Database ID or collection ID is not defined');
	}
	const { databases } = await createSessionClient(sessionCookie);
	return { databases, databaseId, collectionId };
};

const getAllMaintenanceRequests = async (sessionCookie: string) => {
    try {
        const { databases, databaseId, collectionId } = await getDatabase(sessionCookie);
        const maintenanceRequests = await databases.listDocuments(databaseId, collectionId);
        return maintenanceRequests;
    } catch (error) {
        console.error(error);
        return { error };
    }
};

const getActiveMaintenanceRequests = async (sessionCookie: string) => {
    
    try {
		const { databases, databaseId, collectionId } = await getDatabase(sessionCookie);
		const maintenanceRequests = await databases.listDocuments(databaseId, collectionId);

		// go through the maintenance requests and remove the closed ones that are older than 30 days
        const offsetHour = 1 * 60 * 60 * 1000;
        const offsetThirtyDays = offsetHour * 24 * 30;
		const maintenanceRequestsFiltered = maintenanceRequests.documents.filter((request: any) => {
			if (request.status === 'closed') {
                // console.log(`time now in iso: ${new Date().toISOString()}, request.$createdAt: ${request.$createdAt} request name: ${request.title}`);
				if (Date.parse(request.$createdAt) < Date.parse(new Date().toISOString()) - offsetThirtyDays) {
					return false;
				}
				return true;
			}
            return true;
		});

        // Return the object like it was before, with the total and the documents
        const returnObj = {
            total: maintenanceRequestsFiltered.length,
            documents: maintenanceRequestsFiltered,
        }
		return returnObj;
	} catch (error) {
		console.error(error);
		return { error };
	}
}


const getMaintenanceRequestById = async (sessionCookie: string, id: string) => {
	try {
		const { databases, databaseId, collectionId } = await getDatabase(sessionCookie);
		const maintenanceRequest = await databases.getDocument(databaseId, collectionId, id);
		return maintenanceRequest;
	} catch (error) {
		console.error(error);
		return { error };
	}
};

const createMaintenanceRequest = async (sessionCookie: string, maintenanceRequestData: any) => {
	try {
		const { databases, databaseId, collectionId } = await getDatabase(sessionCookie);
		const maintenanceRequest = await databases.createDocument(
			databaseId,
			collectionId,
			ID.unique(),
			maintenanceRequestData,
		);
		return maintenanceRequest;
	} catch (error) {
		console.error(error);
		return { error };
	}
};

// This is used often, to sync the status of the maintenance request every time the user moves it on the kanban board
const updateMaintenanceRequestById = async (id: string, maintenanceRequestData: any) => {
	const sessionCookie = (await cookies()).get('session')?.value ?? '';
	try {
		const { databases, databaseId, collectionId } = await getDatabase(sessionCookie);
		const maintenanceRequest = await databases.updateDocument(
			databaseId,
			collectionId,
			id,
			maintenanceRequestData,
		);
		return maintenanceRequest;
	} catch (error) {
		console.error(error);
		return { error };
	}
};

const deleteMaintenanceRequestById = async (sessionCookie: string, id: string) => {
	try {
		const { databases, databaseId, collectionId } = await getDatabase(sessionCookie);
		await databases.deleteDocument(databaseId, collectionId, id);
		return { message: 'Maintenance request deleted' };
	} catch (error) {
		console.error(error);
		return { error };
	}
};

export {
	getAllMaintenanceRequests,
	getMaintenanceRequestById,
	createMaintenanceRequest,
	updateMaintenanceRequestById,
	deleteMaintenanceRequestById,
    getActiveMaintenanceRequests,
};
