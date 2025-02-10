import { UpdateRentalUnitComponent } from "@/components/update-rental-unit";
import { axiosInstanceClient } from "@/utils/clientAxios";
import { cookies } from "next/headers";
import { getUnitById } from "@/actions/units";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export default async function Page(props: Props) {
    const { id } = await props.params;
    const sessionCookie = (await cookies()).get('session')?.value ?? '';

    const unit = await getUnitById(sessionCookie, id);
  
	return (
		<main className='container mx-auto p-4'>
		    <UpdateRentalUnitComponent {...unit} />
            <pre>{JSON.stringify(unit, null, 2)}</pre>
		</main>
	);
}
