import { NextResponse, NextRequest } from "next/server";
import { createSessionClient } from "@/appwrite/config";
import { cookies } from "next/headers";
import { ID } from "node-appwrite";

export async function GET(request: NextRequest) {
    return NextResponse.json({ message: "Hello, world!" });
}

export async function POST(request: NextRequest) {
    const cookie = await cookies();
    const sessionCookie = cookie.get('session')?.value;

    const { databases } = await createSessionClient(sessionCookie);
    const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
    const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_MESSAGES;
    if (!databaseId || !collectionId) {
        throw new Error('Database ID or collection ID is not defined');
    }
    const { data } = await request.json();

    try {
        const message = await databases.createDocument(databaseId, collectionId, ID.unique(), data);
        return NextResponse.json(message);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error });
    }
}