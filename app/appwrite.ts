import { Client, Account } from 'appwrite';

export const client = new Client();

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
if (!endpoint || !projectId) {
    throw new Error('Appwrite endpoint and project ID must be defined');
}

client.setEndpoint(endpoint).setProject(projectId); // Replace with your project ID

export const account = new Account(client);
export { ID } from 'appwrite';
