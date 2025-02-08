import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient, createSessionClient } from '@/appwrite/config';
import { cookies } from 'next/headers';
import { ID } from 'node-appwrite';
import { Query } from 'node-appwrite';
import { revalidatePath } from 'next/cache';
import auth from '@/utils/auth';
import { uploadImagesWithMetadata, uploadUnitDocument } from './helpers';

/* 
 TODO: We need to extract parts of the code into helper functions, so that we can reuse them in other routes and have a cleaner codebase
 */

// * Tested and working route GET ALL UNITS
export async function GET(request: NextRequest) {
	const allCookies = await cookies();
	const sessionCookie = allCookies.get('session');

	const user = await auth.getUser();
	if (!user) {
		console.log(
			`User is not logged in when trying to GET all units, redirecting to login page`,
		);
		return NextResponse.redirect(new URL('/login', request.url));
	}
	const userId = user.$id;

	try {
		const { databases } = await createSessionClient(sessionCookie?.value);
		const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
		const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_UNITS;
		if (!databaseId || !collectionId) {
			throw new Error('Database ID or collection ID is not defined');
		}
		console.log(`Trying to get all units for user: ${userId} KEBAB`);
		const units = await databases.listDocuments(databaseId, collectionId, [
			// Query.equal('owner', await auth.user.$id),
			Query.equal('owner', userId),
		]);
		console.log(`Units found: ${units}`);
		return NextResponse.json(units);
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: 'Access denied' }, { status: 403 });
	}
}

// * Tested and working route CREATE UNIT (but only for multipart/form-data)
export async function POST(request: NextRequest) {
	const contentType = request.headers.get('content-type');
	if (contentType?.includes('application/json')) {
		return NextResponse.json({ error: 'Please use multipart/form-data, we dont support JSON' }, { status: 400 });
	}

	const allCookies = await cookies();
	const sessionCookie = allCookies.get('session');

	const data = await request.formData();
	const unit = Object.fromEntries(data.entries());

	const user = await auth.getUser();
	console.log(`User in POST unit route: ${user}`);
	const userId = user?.$id;
	if (!userId) return NextResponse.json({ error: 'No user ID found' }, { status: 403 });
	unit.owner = userId;

	// Ensure { monthlyrent, squaremeters, bathrooms, bedrooms } are numbers, if not appwrite will throw an error
		['monthlyrent', 'squaremeters', 'bathrooms', 'bedrooms', 'deposit', 'rating'].forEach(key => {
			if (unit[key]) {
				if (typeof unit[key] === 'string') {
					unit[key] = parseInt(unit[key] as string) as unknown as FormDataEntryValue;
				}
			}
		});

	try {
		const { databases } = await createSessionClient(sessionCookie?.value);
		const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
		const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_UNITS;
		if (!databaseId || !collectionId) {
			throw new Error('Database ID or collection ID is not defined');
		}
		const createdUnit = await databases.createDocument(databaseId, collectionId, ID.unique(), unit);
		revalidatePath('/units');
		return NextResponse.json(createdUnit);
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: 'Access denied' }, { status: 403 });
	}
}

export async function PUT(request: NextRequest) {
	const contentType = request.headers.get('content-type');
	if (contentType?.includes('application/json')) {
		return NextResponse.json({ error: 'Please use multipart/form-data, we dont support JSON' }, { status: 400 });
	}

	const allCookies = await cookies();
	const sessionCookie = allCookies.get('session');

	const data = await request.formData();
	const unit = Object.fromEntries(data.entries());

	const user = await auth.getUser();
	console.log(`User in POST unit route: ${user}`);
	const userId = user?.$id;
	if (!userId) return NextResponse.json({ error: 'No user ID found' }, { status: 403 });
	unit.owner = userId;

	// Ensure { monthlyrent, squaremeters, bathrooms, bedrooms } are numbers, if not appwrite will throw an error
		['monthlyrent', 'squaremeters', 'bathrooms', 'bedrooms', 'deposit', 'rating'].forEach(key => {
			if (unit[key]) {
				if (typeof unit[key] === 'string') {
					unit[key] = parseInt(unit[key] as string) as unknown as FormDataEntryValue;
				}
			}
		});

		const unitId = unit.$id as string;

	try {
		const { databases } = await createSessionClient(sessionCookie?.value);
		const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
		const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_UNITS;
		if (!databaseId || !collectionId) {
			throw new Error('Database ID or collection ID is not defined');
		}
		const updatedUnit = await databases.updateDocument(databaseId, collectionId, unitId, unit);
		revalidatePath('/units');
		return NextResponse.json(updatedUnit);
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: 'Access denied' }, { status: 403 });
	}
}


