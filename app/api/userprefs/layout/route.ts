import { NextRequest, NextResponse } from 'next/server';
import { createSessionClient } from '@/appwrite/config';
import auth from '@/utils/auth';
import { Query, ID } from 'node-appwrite';

export async function GET(request: NextRequest) {
    try {
	const user = await auth.getUser();
	if (!user) {
		return NextResponse.redirect(new URL('/login', request.url));
	}
    const { databases } = await createSessionClient(auth.sessionCookie);
    const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_PUBLIC_ID;
    const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_PUBLIC_ID_USERPREFS;
    if (!databaseId || !collectionId) {
        throw new Error('Database ID or collection ID is not defined');
    }
    console.log(`Trying to get layout for user: ${user.$id}`);
    const response = await databases.getDocument(databaseId, collectionId, user.$id);
    // Both layout and modules are stored as JSON strings in the database and need to be parsed before returning
    const layout = JSON.parse(response.layout);
    const modules = JSON.parse(response.modules);
    console.log(`User layout found: ${layout} and modules: ${modules}`);
    if (response.$id) {
        return NextResponse.json({ layout, modules });
    } else {
        throw new Error('User layout not found');
    }
    } catch (error) {
        console.error('Error fetching user layout:', error);
        return NextResponse.json(null);
    }
}

export async function POST(request: NextRequest) {
    // console.log(`POST request to save layout`);
    const user = await auth.getUser();
    if (!user) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    const { databases } = await createSessionClient(auth.sessionCookie);
    const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_PUBLIC_ID;
    const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_PUBLIC_ID_USERPREFS;
    if (!databaseId || !collectionId) {
        throw new Error('Database ID or collection ID is not defined');
    }
    const { data } = await request.json();
    // console.log(`Trying to save layout for user: ${user.$id} with data:`);
    // console.log(data);
    const response = await databases.listDocuments(databaseId, collectionId, [
        Query.equal('$id', user.$id),
    ]);
    if (response.documents.length > 0) {
        await databases.updateDocument(databaseId, collectionId, response.documents[0].$id, {
            layout: JSON.stringify(data.layout),
            modules: JSON.stringify(data.modules),
        });
    } else {
        await databases.createDocument(databaseId, collectionId, user.$id, {
            userId: user.$id,
            layout: JSON.stringify(data.layout),
            modules: JSON.stringify(data.modules),
        });
    }
    return NextResponse.json({ success: true });
}
