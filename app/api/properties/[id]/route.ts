import { NextRequest, NextResponse } from "next/server";
import { createSessionClient } from "@/appwrite/config";
import { cookies } from "next/headers";
import { Query } from "node-appwrite";
import auth from "@/utils/auth";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export async function GET(request: NextRequest, props: Props) {
    const params = await props.params;
	const id = params.id;

	const allCookies = await cookies();
	const sessionCookie = allCookies.get('session');

	const user = await auth.getUser();
	if (!user) {
		console.log(
			`User is not logged in when trying to GET all properties, redirecting to login page`,
		);
		return NextResponse.redirect(new URL('/login'));
	}

	try {
		const { databases } = await createSessionClient(sessionCookie?.value);
		const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
		const collectionId = 'properties';
		if (!databaseId || !collectionId) {
			throw new Error('Database ID or collection ID is not defined');
		}
		const property = await databases.getDocument(databaseId, collectionId, id);
		console.log(`Unit found: ${property}`);
		return NextResponse.json(property);
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: 'Access denied' }, { status: 403 });
	}
}

// ! Untested route
export async function PUT(request: NextRequest, props: Props) {
    const params = await props.params;
    const allCookies = await cookies();
    const sessionCookie = allCookies.get('session');
    const id = params.id;
    const { data } = await request.json();
    console.log(`Trying to update property with id: ${id}, message from route.ts`);
    try {
        const { databases } = await createSessionClient(sessionCookie?.value);
        const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
        const collectionId = 'properties';
        if (!databaseId || !collectionId) {
            throw new Error('Database ID or collection ID is not defined');
        }
        const property = await databases.updateDocument(databaseId, collectionId, id, data);
        return NextResponse.json(property);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error });
    }
}

// ! Untested route - This should also delete the underlying units in the property (?) - or should it?
export async function DELETE(request: NextRequest, props: Props) {
    const params = await props.params;
    const allCookies = await cookies();
    const sessionCookie = allCookies.get('session');
    const id = params.id;
    console.log(`Trying to delete property with id: ${id}, message from route.ts`);
    try {
        const { databases } = await createSessionClient(sessionCookie?.value);
        const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
        const collectionId = 'properties';
        if (!databaseId || !collectionId) {
            throw new Error('Database ID or collection ID is not defined');
        }
        const property = await databases.deleteDocument(databaseId, collectionId, id);
        return NextResponse.json(property);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error });
    }
}

