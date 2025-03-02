// TODO - Make the actual list of leases into a client component, so you have better filtering and sorting options, but still fetch server-side

import { getAllLeases } from '@/actions/leases';
import { cookies } from 'next/headers';
import { TFetchLeases } from '@/constants/types/leases';
import { currencyFormatter } from '@/utils/helpers';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';

export default async function Page() {
	const session = (await cookies()).get('session')?.value as string;
	const leases = (await getAllLeases(session)) as unknown as TFetchLeases;

	return (
		<main className='container mx-auto py-8'>
			<h1 className='text-5xl text-rentr-darkblue'>Alle leiekontrakter</h1>
			<Accordion type={'multiple'}>
				{leases?.documents.map((lease: any) => {
                    const timeUntilEnd = new Date(lease.end_date).getTime() - Date.now();
					return (
						<AccordionItem value={lease.$id} key={lease.$id}>
							<AccordionTrigger>
								<div className='flex justify-between w-full pr-8'>
									<h2 className='text-3xl'>
										{lease.units ? lease.units.properties.name : lease.$id} -{' '}
										{lease.units ? lease.units.title : lease.tenant_id}
									</h2>
									<span
										className={`bg-${
											lease.active ? 'green' : 'red'
										}-500 text-white px-2 py-1 rounded-full`}>
										{lease.active ? 'Aktiv' : 'Inaktiv'}
									</span>
								</div>
							</AccordionTrigger>
							<AccordionContent>
                                {/* timeUntilEnd is a time value, display it in days either since expiry, or days until expiry */}
                                <p className='text-xl'>
                                    {timeUntilEnd > 0
                                        ? `Dager til utløp: ${Math.ceil(timeUntilEnd / (1000 * 60 * 60 * 24))}`
                                        : `Dager siden utløp: ${Math.abs(Math.ceil(timeUntilEnd / (1000 * 60 * 60 * 24)))}`
                                    }
                                </p>
								<h2 className='text-xl'>
									{new Date(lease.start_date).toLocaleDateString('no-NO')} -{' '}
									{new Date(lease.end_date).toLocaleDateString('no-NO')}
								</h2>
								<p>{currencyFormatter(lease.monthly_rent, false)} / Måned</p>
								<pre>{JSON.stringify(lease, null, 2)}</pre>
							</AccordionContent>
						</AccordionItem>
					);
				})}
			</Accordion>
		</main>
	);
}
