import { createSessionClient } from "@/appwrite/config"
import { ID } from "node-appwrite"


const BUCKETID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID_IMAGES || 'images';
const DBNAME = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || 'rentrdb';
const METACOLLECTIONID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_IMAGEMETADATA || 'imagemetadata';
const UNITCOLLECTIONID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_UNITS || 'units';


const uploadUnitDocument = async (unit: any, cookie: string) => {
    const { databases } = await createSessionClient(cookie);
    return databases.createDocument(DBNAME, UNITCOLLECTIONID, ID.unique(), unit);
}
// TODO - Typesafe this when confident in the structure of data
const uploadImagesWithMetadata = async (images: any, metadata: any, cookie: string) => {
    const { storage, databases } = await createSessionClient(cookie);
    const promises = images.map(async (image: any) => {
        const { file, name } = image;
        try {
            const uploadedFile = await storage.createFile(BUCKETID, ID.unique(), file);
            const fileId = uploadedFile.$id;
            await databases.createDocument(DBNAME, METACOLLECTIONID, fileId, { ...metadata, fileId });
            return uploadedFile;
        } catch (error) {
            throw new Error(`Failed to upload image or metadata: ${error}`);
        }
    });
    return Promise.all(promises);
}

const uploadSingleImageWithMetadata = async (image: any, metadata: any, cookie: string) => {
    const { storage, databases } = await createSessionClient(cookie);
    const { file, name } = image;
    try {
        const uploadedFile = await storage.createFile(BUCKETID, ID.unique(), file);
        const fileId = uploadedFile.$id;
        await databases.createDocument(DBNAME, METACOLLECTIONID, fileId, { ...metadata, fileId });
        return uploadedFile;
    } catch (error) {
        throw new Error(`Failed to upload image or metadata: ${error}`);
    }
}

const cookieTest = async (cookie: any) => {
    return { message: `Cookie recieved: ${cookie.value}` };
}

export { uploadUnitDocument, uploadImagesWithMetadata, uploadSingleImageWithMetadata, cookieTest };