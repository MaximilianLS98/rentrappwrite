import { NextRequest, NextResponse } from 'next/server';
import { createSessionClient, createStorageClient } from '@/appwrite/config';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
	const sessionCookie = cookies().get('session');
	try {
		const { storage } = await createStorageClient(sessionCookie?.value);
		// const files = await storage.listFiles('67177f8a0031cf23e06a');
		const files = await storage.listFiles(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID_IMAGES || '671aaa230027397d8ec6');
		return NextResponse.json(files);
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: 'Access denied' }, { status: 403 });
	}
}

export async function POST(request: NextRequest) {
	return NextResponse.json({
		message: 'Trying to POST to storage, i.e create a new file in storage!',
	});
}
