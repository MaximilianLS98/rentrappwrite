import { cookies } from "next/headers"
import AppwriteImage from "@/components/appwriteImage"
import { getImageIdList } from "@/actions/images";


export default async function() { 
    const sessionCookie = (await cookies()).get('session')?.value ?? '';
    const images = await getImageIdList(sessionCookie);

    return (
        <main className="container m-auto">
            <h1 className="text-7xl my-8">Mediebibliotek</h1>
            <div className='flex gap-4 flex-wrap'>
                {images.map((file: any) => {
                    return <AppwriteImage fileId={file.$id} alt={file.name} key={file.$id} />;
                })}
                {images.length === 0 && <p>Ingen bilder funnet</p>}
            </div>
        </main>
    )
}