import { NextResponse } from 'next/server';
import { createSessionClient } from '@/appwrite/config';
import { cookies } from 'next/headers';

export async function GET() {
    const sessionCookie = cookies().get('session')?.value;
    try {
        const { databases } = await createSessionClient(sessionCookie);
        const chat = await databases.listDocuments(
			process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '',
			'671795de00323549254a',
		);
        return NextResponse.json(chat);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

}