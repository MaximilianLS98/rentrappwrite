import { Client, Databases, Account, Storage } from 'appwrite';

const createSessionClient = (session: any) => {
	const client = new Client()
		.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || '')
		.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '')

        if (session) {
            client.setSession(session);
        }

	return {
        get account() {
            return new Account(client);
        },
        get databases() {
            return new Databases(client);
        },
        get storage() {
            return new Storage(client);
        },
        get client() {
            return client;
        }
    }
};

const simpleClient = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || '')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '')

export { createSessionClient, simpleClient };