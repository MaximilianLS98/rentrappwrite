import { UpdateRentalUnitComponent } from "@/components/update-rental-unit";
import { cookies } from "next/headers";
import { getUnitById } from "@/actions/units";
import { getAllPropertyNamesAndIds } from "@/actions/properties";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export default async function Page(props: Props) {
    const { id } = await props.params;
    const sessionCookie = (await cookies()).get('session')?.value ?? '';

    const unit = await getUnitById(sessionCookie, id);
    const properties = await getAllPropertyNamesAndIds(sessionCookie);
  
	return (
		<main className='container mx-auto p-4'>
            <UpdateRentalUnitComponent {...unit} properties={'documents' in properties ? properties.documents : []} />
            <pre>{JSON.stringify(unit, null, 2)}</pre>
		</main>
	);
}
