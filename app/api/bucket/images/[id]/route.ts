import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createSessionClient, createStorageClient } from '@/appwrite/config';
import { ImageFormat } from 'node-appwrite';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
	const { id } = params;
	const allCookies = await cookies();
	const sessionCookie = allCookies.get('session');

	const { searchParams } = new URL(request.url);
	const width = searchParams.get('width');
	const height = searchParams.get('height');
	const output = searchParams.get('output');

	// console.log(
	// 	`Getting an image with id: ${id}, width: ${width}, height: ${height}, output: ${output}, Sessioncookie is ${sessionCookie?.value}`,
	// );

	try {
		const { storage } = await createStorageClient(sessionCookie?.value);
		// const result = await storage.getFilePreview('67177f8a0031cf23e06a', id);
		const result = await storage.getFilePreview(
			// '67177f8a0031cf23e06a',
			process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID_IMAGES || 'images',
			id,
			width ? parseInt(width) : undefined,
			height ? parseInt(height) : undefined,
			undefined, // gravity
			undefined, // quality
			undefined, // borderWidth
			undefined, // borderColor
			undefined, // borderRadius
			undefined, // opacity
			undefined, // rotation
			undefined, // background
			output ? (output as ImageFormat) : undefined, // output
		);
        return new NextResponse(result, {
            headers: {
                'Cache-Control': 'public, max-age=3600',
            },
        });
        /*
		const blob = new Blob([result]);
		return new NextResponse(blob, {
			headers: {
				// 'Content-Type': output ? `image/${output}` : 'image/jpeg', // Adjust based on output
				'Cache-Control': 'public, max-age=3600',
			},
		});
        */
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: 'Access denied' }, { status: 403 });
	}
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
	const { id } = params;
	return NextResponse.json({
		message: `Trying to update a single thing from bucket storage by ${id}!`,
	});
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
	const { id } = params;
    // TODO Remeber to delete the metadata from the database as well
	return NextResponse.json({
		message: `Trying to delete a single thing from bucket storage by ${id}!`,
	});
}
