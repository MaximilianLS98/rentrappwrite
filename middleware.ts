import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import auth from '@/utils/auth';
// import { account } from './app/appwrite';

// // This function can be marked `async` if using `await` inside
// export async function middleware(request: NextRequest) {
//     console.log('middleware ran');
    
// 	// we need to protect routes that are not public
// 	const isLoggedIn = await account.get();
// 	if (!isLoggedIn) {
// 		return NextResponse.redirect(new URL('/login', request.url));
// 	}
// }

// // See "Matching Paths" below to learn more
// export const config = {
// 	matcher: '/units',
// };

// make a dummy middleware that doesnt do anything
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
    matcher: ['/units', '/admin', '/marketplace', '/dashboard'],
};