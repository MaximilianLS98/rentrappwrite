import { NextRequest, NextResponse } from "next/server";
import { createSessionClient } from "@/appwrite/config";
import { cookies } from "next/headers";
import { ID } from "node-appwrite";
import { revalidatePath } from 'next/cache';

// * Tested and working route GET UNIT BY ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    const sessionCookie = cookies().get('session');
    // console.log(`Trying to get unit with id: ${id}, message from route.ts`);
    try {
        const { databases } = await createSessionClient(sessionCookie?.value);
        const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
        const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_UNITS;
        if (!databaseId || !collectionId) {
            throw new Error('Database ID or collection ID is not defined');
        }
        const unit = await databases.getDocument(databaseId, collectionId, id);
        return NextResponse.json(unit);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }
}


// ! - Untested route
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const sessionCookie = cookies().get('session');
    const { id } = params;
    const { data } = await request.json();
    console.log(`Trying to update unit with id: ${id}, message from route.ts`);
    try {
        const { databases } = await createSessionClient(sessionCookie?.value);
        const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
        const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_UNITS;
        if (!databaseId || !collectionId) {
            throw new Error('Database ID or collection ID is not defined');
        }
        const unit = await databases.updateDocument(databaseId, collectionId, id, data);
        revalidatePath('/units');
        return NextResponse.json(unit);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }
}

// * Tested and working route DELETE UNIT BY ID
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
	const { id } = params;
    console.log(`Trying to delete unit with id: ${id}, message from route.ts`);
    
	const sessionCookie = cookies().get('session');
    console.log(`Session cookie: ${sessionCookie} in delete`);
	const { databases } = await createSessionClient(sessionCookie?.value);
	const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
    const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_UNITS;
	if (!databaseId || !collectionId) {
		throw new Error('Database ID or collection ID is not defined');
	}
    try {
        await databases.deleteDocument(databaseId, collectionId, id);
        revalidatePath('/units');
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }
}