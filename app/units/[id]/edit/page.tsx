import { UpdateRentalUnitComponent } from "@/components/update-rental-unit";
import { axiosInstanceClient } from "@/utils/clientAxios";
import { cookies } from "next/headers";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export default async function Page(props: Props) {
    const params = await props.params;
    const id = params.id;
    const allCookies = await cookies();
    const sessionCookie = allCookies.get('session');
    const { data } = await axiosInstanceClient.get(`api/units/${id}`, {
        headers: {
            cookie: `session=${sessionCookie?.value}`,
        },
    });
  
	return (
		<main className='container mx-auto p-4'>
		    <UpdateRentalUnitComponent {...data} />
            <pre>{JSON.stringify(data, null, 2)}</pre>
		</main>
	);
}
