// /app/api/getSession.js

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
	const allCookies = await cookies()
    const sessionCookie = allCookies.get('session');
	const sessionValue = sessionCookie?.value;

	return NextResponse.json({ session: sessionValue });
}
