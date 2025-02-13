import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Building, Home, DollarSign, Users } from 'lucide-react';
import KeyMetrics from './landlordDashboard/KeyMetrics';
import { Button } from './ui/button';
import Link from 'next/link';

interface PropertyOverviewProps {
	totalProperties: number;
	totalUnits: number;
	totalRevenue: number;
	totalTenants: number;
	properties: any;
	units: any;
}

export function PropertyOverview({
	totalProperties,
	totalUnits,
	totalRevenue,
	totalTenants,
	properties,
	units,
}: PropertyOverviewProps) {
	const totalRent = units.documents.reduce((acc: number, unit: any) => {
		return acc + unit.monthlyrent;
	}, 0);

	const totalTenantsCounted = units.documents.filter(
		(unit: any) => unit.status === 'Occupied',
	).length;

	const formatCurrency = (value: number) => {
		return new Intl.NumberFormat('nb-NO', { style: 'currency', currency: 'NOK' }).format(value);
	};

	return (
		<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
			<Card className='relative'>
				<CardHeader className='pb-2'>
					<div className='flex flex-row items-center justify-between spacy-y-0'>
						<CardTitle className='text-sm font-medium'>Eiendommer</CardTitle>
						<Building className='h-4 w-4 text-muted-foreground' />
					</div>
				</CardHeader>
				<CardContent>
					<div className='text-2xl font-bold mb-2'>{properties.total}</div>
				</CardContent>
				<CardFooter className='absolute bottom-1 left-1 p-4'>
					<Link href='/properties/list'>
						<Button variant='outline'>Alle eiendommer</Button>
					</Link>
				</CardFooter>
			</Card>
			{/* <Card>
				<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
					<CardTitle className='text-sm font-medium'>Enheter totalt</CardTitle>
					<Home className='h-4 w-4 text-muted-foreground' />
				</CardHeader>
				<CardContent>
					<div className='text-2xl font-bold'>{units.total}</div>
				</CardContent>
			</Card> */}
			<Card>
				<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
					<CardTitle className='text-sm font-medium'>Omsetning i måneden</CardTitle>
					<DollarSign className='h-4 w-4 text-muted-foreground' />
				</CardHeader>
				<CardContent>
					<div className='text-2xl font-bold'>{formatCurrency(totalRent)}</div>
				</CardContent>
			</Card>
			<div className='md:col-span-2'>
				<KeyMetrics units={units.documents} />
			</div>
			{/* <Card>
				<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
					<CardTitle className='text-sm font-medium'>Leietakere totalt</CardTitle>
					<Users className='h-4 w-4 text-muted-foreground' />
				</CardHeader>
				<CardContent>
					<div className='text-2xl font-bold'>{totalTenantsCounted}</div>
				</CardContent>
			</Card> */}
		</div>
	);
}
