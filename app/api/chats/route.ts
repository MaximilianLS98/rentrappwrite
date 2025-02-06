import { NextResponse } from 'next/server';
import { createSessionClient } from '@/appwrite/config';
import { cookies } from 'next/headers';

export async function GET() {
    const cookie = await cookies()
    const sessionCookie = cookie.get('session')?.value;

    const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
    const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_CHATS;
    if (!databaseId || !collectionId) {
        throw new Error('Database ID or collection ID is not defined');
    }

    try {
        const { databases } = await createSessionClient(sessionCookie);
        const chats = await databases.listDocuments(databaseId, collectionId);
        return NextResponse.json(chats);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

}