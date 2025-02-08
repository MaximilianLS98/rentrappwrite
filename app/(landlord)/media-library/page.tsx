import { axiosInstanceClient } from "@/utils/clientAxios"
import { cookies } from "next/headers"
import AppwriteImage from "@/components/appwriteImage"


export default async function() { 
    const allCookies = await cookies();
    const sessionCookie = allCookies.get('session')?.value;

    const { data } = await axiosInstanceClient.get('/api/bucket/images', {
        headers: {
			cookie: `session=${sessionCookie}`,
		},
    });    

    return (
        <main className="container m-auto">
            <h1 className="text-7xl my-8">Mediebibliotek</h1>
            <div className='flex gap-4 flex-wrap'>
                {data.files.map((file: any) => {
                    return <AppwriteImage fileId={file.$id} alt={file.name} key={file.$id} />;
                })}
                {data.files.length === 0 && <p>Ingen bilder funnet</p>}
            </div>
        </main>
    )
}