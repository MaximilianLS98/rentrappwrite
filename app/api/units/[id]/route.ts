import { NextRequest, NextResponse } from "next/server";
import { createSessionClient } from "@/appwrite/config";
import { cookies } from "next/headers";
import { ID } from "node-appwrite";
import auth from "@/utils/auth";
import { revalidatePath } from 'next/cache';

type Props = {
    params: Promise<{
        id: string;
    }>;
};

// * Tested and working route GET UNIT BY ID
export async function GET(request: NextRequest, props: Props) {
    const params = await props.params;
    const id = params.id;
    const allCookies = await cookies();
	const sessionCookie = allCookies.get('session');
    // console.log(`Trying to get unit with id: ${id}, message from route.ts`);
    const user = await auth.getUser();
	if (!user) {
		console.log(
			`User is not logged in when trying to GET unit by ID, redirecting to login page`,
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
        console.log(`Trying to get unit with id: ${id}, message from route.ts in GET unit by ID`);
        const unit = await databases.getDocument(databaseId, collectionId, id);
        return NextResponse.json(unit);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error });
    }
}


// ! - Untested route
export async function PUT(request: NextRequest, props: Props) {
    const params = await props.params;
    const allCookies = await cookies();
	const sessionCookie = allCookies.get('session');
    const id = params.id;
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
export async function DELETE(request: NextRequest, props: Props) {
    const params = await props.params;
	const id = params.id;
    console.log(`Trying to delete unit with id: ${id}, message from route.ts`);
    
	const allCookies = await cookies();
	const sessionCookie = allCookies.get('session');
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