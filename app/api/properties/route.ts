import { NextRequest, NextResponse } from "next/server";
import { createSessionClient } from "@/appwrite/config";
import { cookies } from "next/headers";
import { ID, Query } from "node-appwrite";
import auth from "@/utils/auth";

export async function GET() {
    const allCookies = await cookies();
	const sessionCookie = allCookies.get('session');
    const user = await auth.getUser();
    if (!user) {
        console.log(
            `User is not logged in when trying to GET all properties, redirecting to login page`,
        );
        return NextResponse.redirect(new URL('/login'));
    }
    const userId = user.$id;
    try {
		const { databases } = await createSessionClient(sessionCookie?.value);
		const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
		const collectionId = 'properties';
		if (!databaseId || !collectionId) {
			throw new Error('Database ID or collection ID is not defined');
		}
		const properties = await databases.listDocuments(databaseId, collectionId, [
			// Query.equal('owner', await auth.user.$id),
			Query.equal('owner', userId),
		]);
		console.log(`Units found: ${properties}`);
		return NextResponse.json(properties);
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: 'Access denied' }, { status: 403 });
	}
}

// ! Untested route
export async function POST(request: NextRequest) {
    const contentType = request.headers.get('content-type');
    if (contentType?.includes('application/json')) {
        return NextResponse.json({ error: 'Please use multipart/form-data, we dont support JSON' }, { status: 400 });
    }

    const allCookies = await cookies();
    const sessionCookie = allCookies.get('session');

    const data = await request.formData();
    const property = Object.fromEntries(data.entries());
    try {
        const { databases } = await createSessionClient(sessionCookie?.value);
        const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
        const collectionId = 'properties';
        if (!databaseId || !collectionId) {
            throw new Error('Database ID or collection ID is not defined');
        }
        const result = await databases.createDocument(databaseId, collectionId, ID.unique(), property);
        return NextResponse.json(result);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error });
    }
}