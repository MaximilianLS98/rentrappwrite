import { Client, Account, Databases, Storage } from 'appwrite';

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const project = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
if (!endpoint || !project) {
	throw new Error('Appwrite endpoint and project ID must be set to create clientsm, appwrite.ts');
}
const createSimpleClient = (session:any) => {
    console.log(session);
    console.log(`Setting session in createSimpleClient SIMPLE without session, unless this is true: ${session ? 'true' : 'false'}`);
    const simpleClient = new Client()
        .setEndpoint(endpoint)
        .setProject(project);
        if (session) {
            simpleClient.setSession(session);
        }
        return simpleClient;
}

const createClientSessionClient = async (session: any) => {
    console.log(`Setting session in createClientSessionClient: ${session ? 'true' : 'false'}`);
	const client = new Client()
		.setEndpoint(endpoint)
		.setProject(project)
        .setSession(session);


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
            return new Client().setEndpoint(endpoint).setProject(project).setSession(session);
        }
	};
};

export { createClientSessionClient, createSimpleClient };