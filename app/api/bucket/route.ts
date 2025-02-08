import { NextRequest, NextResponse } from 'next/server';
import { createSessionClient, createStorageClient } from '@/appwrite/config';
import { cookies } from 'next/headers';

// ? This endpoint should probably just fetch all available buckets, since each bucket should have its own endpoint for fetching files
export async function GET(request: NextRequest) {
	const allCookies = await cookies();
	const sessionCookie = allCookies.get('session');
	if (!sessionCookie) {
		return NextResponse.json({ error: 'No session cookie found' });
	}
	try {
		const { storage } = await createSessionClient(sessionCookie);
		// const files = await storage.listFiles('67177f8a0031cf23e06a');
		const files = await storage.listFiles(
			process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID_IMAGES || '671aaa230027397d8ec6',
		);
		console.log(`Files in GET all documents in bucket images, b: ${JSON.stringify(files)}`);
		return NextResponse.json(files);
	} catch (error) {
		console.error(`There was an error in GET api/bucket/route.ts: ${error}`);
		return NextResponse.json({ error });
	}
}

export async function POST(request: NextRequest) {
	return NextResponse.json({
		message: 'Trying to POST to storage, i.e create a new file in storage!',
	});
}
