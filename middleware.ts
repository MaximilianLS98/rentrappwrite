import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import auth from '@/utils/auth';

// Helper function to check if user has a specific label
function userHasLabel(labels: string[], requiredLabel: string): boolean {
  return labels.includes(requiredLabel)
}

export async function middleware(request: NextRequest) {
	const user = await auth.getUser();
    const pathName = request.nextUrl.pathname;

	if (!user) {
		console.log('User is not logged in');
		request.cookies.delete('session');
		return NextResponse.redirect(new URL('/login', request.url));
	}

    if (pathName.startsWith('/admin')) {
        if (!userHasLabel(user.labels, 'admin')) {
            console.log('User is not an admin');
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

	return NextResponse.next();
}

export const config = {
	matcher: [
		'/units',
		'/admin',
		'/marketplace',
		'/dashboard',
		'/units/:path*',
		'/properties',
		'/properties/:path*',
	],
};