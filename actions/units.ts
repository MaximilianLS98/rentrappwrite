'use server';
import { createSessionClient } from "@/appwrite/config";
import { ID, Query } from "node-appwrite";
import auth from "@/utils/auth";

// Page with server actions for the units collection, fetching etc
// Trying server actions to have something work well in client components as well as server components
// ! NB - it might look like any user can fetch all units, but the user can only fetch units that they own, as per document security rules in Appwrite. We might want to implement 
// ! a second layer where we check if the users id is the same as the owner id of the unit. To prevent any leaks if the security is changed in Appwrite

const getDatabase = async (sessionCookie: string) => {
	const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
	const collectionId = 'units';
	if (!databaseId || !collectionId) {
		throw new Error('Database ID or collection ID is not defined');
	}
	const { databases } = await createSessionClient(sessionCookie);
	return { databases, databaseId, collectionId };
};


const getAllUnits = async (sessionCookie: string) => {
    try {
        const { databases, databaseId, collectionId } = await getDatabase(sessionCookie);
        const units = await databases.listDocuments(databaseId, collectionId);
        return units;
    } catch (error) {
        console.error(error);
        return { error };
    }
}

const getAllUnassignedUnits = async (sessionCookie: string) => {
    // a unit is assigned if the properties field has something in it, and is not an empty array or null
    try {
        const { databases, databaseId, collectionId } = await getDatabase(sessionCookie);
        const units = await databases.listDocuments(databaseId, collectionId, [
            Query.isNull('properties'),
        ]);
        return units;
    } catch (error) {
        console.error(error);
        return { error };
    }
}

const getUnitById = async (sessionCookie: string, id: string) => {
    try {
        console.log(`Trying to get unit with id: ${id}, message from units.ts`);
        const { databases, databaseId, collectionId } = await getDatabase(sessionCookie);
        const unit = await databases.getDocument(databaseId, collectionId, id);
        return unit;
    } catch (error) {
        console.error(error);
        return { error };
    }
}

const createUnit = async (sessionCookie: string, unitData: any) => {
    const user = await auth.getUser();
    const userId = user.$id;
    unitData.owner = userId;
    try {
        const { databases, databaseId, collectionId } = await getDatabase(sessionCookie);
        const unit = await databases.createDocument(databaseId, collectionId, ID.unique(), unitData);
        return unit;
    } catch (error) {
        console.error(error);
        return { error };
    }
}

const updateUnitById = async (sessionCookie: string, id: string, unitData: any) => {
    try {
        const { databases, databaseId, collectionId } = await getDatabase(sessionCookie);
        const unit = await databases.updateDocument(databaseId, collectionId, id, unitData);
        return unit;
    } catch (error) {
        console.error(error);
        return { error };
    }
}

const deleteUnitById = async (sessionCookie: string, id: string) => {
    try {
        const { databases, databaseId, collectionId } = await getDatabase(sessionCookie);
        await databases.deleteDocument(databaseId, collectionId, id);
        return { message: 'Unit deleted' };
    } catch (error) {
        console.error(error);
        return { error };
    }
}


export { getAllUnits, getAllUnassignedUnits, getUnitById, createUnit, updateUnitById, deleteUnitById };
