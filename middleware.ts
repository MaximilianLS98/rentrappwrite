import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import auth from '@/utils/auth';

export async function middleware(request: NextRequest) {
    const user = await auth.getUser() ;
    // console.log(`middleware ran, and got user: ${user}`);
    
    if (!user) {
        console.log('User is not logged in');
        request.cookies.delete('session');
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/units', '/admin', '/marketplace', '/dashboard', '/units/:path*'
    ],
};