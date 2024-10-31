import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient, createSessionClient } from '@/appwrite/config';
import { cookies } from 'next/headers';
import { ID } from 'node-appwrite';
import { Query } from 'node-appwrite';
import { revalidatePath } from 'next/cache';
import auth from '@/utils/auth';

// * Tested and working route GET ALL UNITS
export async function GET(request: NextRequest) {
	const sessionCookie = cookies().get('session');
	
	const user = await auth.getUser();
	const userId = user?.$id;
	
	try {
		const { databases } = await createSessionClient(sessionCookie?.value);
		const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
		const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_UNITS;
        if (!databaseId || !collectionId) {
			throw new Error('Database ID or collection ID is not defined');
		}
        const units = await databases.listDocuments(databaseId, collectionId, [
			// Query.equal('owner', await auth.user.$id),
			Query.equal('owner', userId),
		]);
        return NextResponse.json(units);
	} catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }
}

// * Tested and working route CREATE UNIT
export async function POST(request: NextRequest) {
	const sessionCookie = cookies().get('session');
	const { data } = await request.json();
	data.owner = auth.user.$id;

	try {
		const { databases } = await createSessionClient(sessionCookie?.value);
		const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
		const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_UNITS;
		if (!databaseId || !collectionId) {
			throw new Error('Database ID or collection ID is not defined');
		}
		const unit = await databases.createDocument(databaseId, collectionId, ID.unique(), data);
		revalidatePath('/units');
		return NextResponse.json(unit);
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: 'Access denied' }, { status: 403 });
	}
}