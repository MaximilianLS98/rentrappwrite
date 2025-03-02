'use server';
import { createSessionClient } from '@/appwrite/config';
import { revalidatePath } from 'next/cache';
import { ID, Query} from 'node-appwrite';
import { TUnit } from '@/constants/types/units';

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
        // Update the unit object to have the tenant field set to the tenant name and the status field to "occupied"
        await databases.updateDocument(databaseId, 'units', lease.units.$id, { tenant: lease.tenant_id, status: 'occupied' });
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

const checkForInactiveLeases = async (sessionCookie: string) => {
    // The leases has a end_date field, we can check if the end_date is in the past, and if it is, we can set the lease to false in the "active" field
    // We also get returned the full unit object for the lease, so use this to update the "tenant" field in the unit object to null and the "status" field to "vacant"
    try {
        const { databases, databaseId, collectionId } = await getDatabase(sessionCookie);
        const leases = await databases.listDocuments(databaseId, collectionId, [
            Query.equal('active', true),
        ]);
        const inactiveLeases = leases.documents.filter((lease: any) => {
            const endDate = new Date(lease.end_date);
            const today = new Date();
            return endDate < today;
        });
        if (inactiveLeases.length === 0) {
            return { success: true, message: 'No inactive leases found' };
        }
        let changedUnits = [] as any;
        inactiveLeases.forEach(async (lease: any) => {
            await databases.updateDocument(databaseId, collectionId, lease.$id, { active: false });
            const newUnit = await databases.updateDocument(databaseId, 'units', lease.units.$id, { tenant: '-', status: 'vacant' });
            console.log(`new unit: ${JSON.stringify(newUnit)}`);
            changedUnits.push(newUnit);
        });
        console.log(`changed units: ${JSON.stringify(changedUnits)}`);
        return { success: true, message: 'Inactive leases updated', changedUnits };
    } catch (error) {
        console.error(error);
        return { error };
    }
}

export { getAllLeases, getLeaseById, createLease, updateLeaseById, deleteLeaseById, checkForInactiveLeases };