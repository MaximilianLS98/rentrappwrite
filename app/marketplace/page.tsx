import { RentalMarketplaceComponent } from '@/components/rental-marketplace';

export default async function Marketplace() {
	return (
		<main className='flex flex-col items-center justify-center py-6'>
			<h1 className='text-4xl font-bold'>Marketplace - in development for RentR V2</h1>
			<RentalMarketplaceComponent />
		</main>
	);
}
