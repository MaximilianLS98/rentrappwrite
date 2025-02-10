import { cookies } from 'next/headers';
import { createAdminClient, createSessionClient } from '@/appwrite/config';
import { createClientSessionClient } from '@/lib/appwrite'; // This is here to create clientside session client, for realtime. (client is imported from appwrite and not node-appwrite)
import { redirect } from 'next/navigation';
import { ID } from 'node-appwrite';

 
type Auth = {
	user: any | null;
	sessionCookie: string | null;
    getUser: () => Promise<any>;  
    createSession: (formData: any) => Promise<any>;
	logOut: () => void;
	signUp: (formData: any) => Promise<any>;
};

const auth: Auth = {
	user: null,
	sessionCookie: null,

	getUser: async () => {
		const cookieObj = await cookies();
		auth.sessionCookie = cookieObj.get('session')?.value as any;
		// console.log(`Session cookie: ${auth.sessionCookie} in getUser auth utils`);
		
		if (auth.sessionCookie) {
			try {
				const { account } = await createSessionClient(auth.sessionCookie);
				auth.user = await account.get();
			} catch (error) {
				console.log(error);
				auth.user = null;
				auth.sessionCookie = null;
			}
		} else {
			console.log('Session cookie is null');
			auth.user = null;
			auth.sessionCookie = null;
		}
		return auth.user;
	},
	createSession: async (formData: any) => {
		'use server';
		const cookieObj = await cookies();
		const data = Object.fromEntries(formData);
		const { email, password } = data;

		const { account } = await createAdminClient();
		const session = await account.createEmailPasswordSession(email, password);
		console.log(`Session created: ${session.secret}`);
		cookieObj.set('session', session.secret, {
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
			expires: new Date(session.expire),
			path: '/',
		});
		cookieObj.set(`a_session_${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`, session.secret, {
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
			domain: process.env.NODE_ENV === 'development' ? 'localhost' : '.kaktusfamilien.com',
			// domain: 'appwrite.kaktusfamilien.com',
			expires: new Date(session.expire),
		});
		redirect('/');
	},
	logOut: async () => {
		'use server';
		const cookieObj = await cookies();
		auth.sessionCookie = cookieObj.get('session')?.value as any;
		try {
			const { account } = await createSessionClient(auth.sessionCookie);
			await account.deleteSession('current');
		} catch (error) {
			console.log(error);
		}
		cookieObj.delete('session');
		cookieObj.delete(`a_session_${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`);
		auth.user = null;
		auth.sessionCookie = null;
		redirect('/');
	},
	signUp: async (formData: any) => {
		'use server';
		const cookieObj = await cookies();
		const data = Object.fromEntries(formData);
		const { email, password } = data;
		console.log(`Trying to sign up with email: ${email}, password: ${password}`);
		

		const { account } = await createAdminClient();
		const user = await account.create(ID.unique(), email, password);

		// ? Should we log in the user after sign up automatically? Or should we redirect to login page? Maybe depends on confirmation email?
		if (user.$id) {
			const session = await account.createEmailPasswordSession(email, password);
			cookieObj.set('session', session.secret, {
				httpOnly: true,
				secure: true,
				sameSite: 'strict',
				expires: new Date(session.expire),
				path: '/',
				domain: process.env.NODE_ENV === 'development' ? 'localhost' : '.kaktusfamilien.com',	
			});
			redirect('/');
		} else {
			redirect('/login');
		}

	}

};

export default auth;
