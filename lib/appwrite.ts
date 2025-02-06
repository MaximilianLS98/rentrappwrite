import { Client, Account, Databases, Storage } from 'appwrite';

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const project = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
if (!endpoint || !project) {
	throw new Error('Appwrite endpoint and project ID must be set');
}
const createSimpleClient = (session:any) => {
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

        

	// if (session) {
    //     console.log(`Setting session in createClientSessionClient: ${session ? 'true' : 'false'}`);
	// 	client.setSession(session);
	// }

    const unsubscribe = client.subscribe(`documents`, response => {
        console.log(`Realtime response in createClientSessionClient: ${response}`);
    }
    ); 

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