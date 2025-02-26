import { getAllLeases } from "@/actions/leases"
import { cookies } from "next/headers";
import { TFetchLeases } from "@/constants/types/leases";
import { currencyFormatter } from "@/utils/helpers";

export default async function Page() {
    const session = (await cookies()).get('session')?.value as string;
    const leases = (await getAllLeases(session)) as unknown as TFetchLeases;

    return (
        <main className="container mx-auto py-8">
            <h1 className="text-5xl">Alle leiekontrakter</h1>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {leases?.documents.map((lease: any) => {
                    return (
                        <div key={lease.$id} className="bg-card shadow-lg p-6">
                            <h2 className="text-3xl text-rentr-darkblue">{lease.units.properties.name} - {lease.units.title}</h2>
                            <h2 className="text-xl">
                                {new Date(lease.start_date).toLocaleDateString('no-NO')} - {new Date(lease.end_date).toLocaleDateString('no-NO')}
                            </h2>
                            <p>{currencyFormatter(lease.monthly_rent, false)} / Måned</p>
                        </div>
                    )
                })}
            </section>
            <pre>{JSON.stringify(leases, null, 2)}</pre>
        </main>
    )
}