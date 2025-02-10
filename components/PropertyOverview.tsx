import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Home, DollarSign, Users } from 'lucide-react';
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

  const totalTenantsCounted = units.documents.filter((unit: any) => unit.status === 'Occupied').length;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('nb-NO', { style: 'currency', currency: 'NOK' }).format(value);
  }

	return (
		<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
			<Card>
				<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
					<CardTitle className='text-sm font-medium'>Eiendommer</CardTitle>
					<Building className='h-4 w-4 text-muted-foreground' />
				</CardHeader>
				<CardContent>
					<div className='text-2xl font-bold mb-2'>{properties.total}</div>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
					<CardTitle className='text-sm font-medium'>Enheter totalt</CardTitle>
					<Home className='h-4 w-4 text-muted-foreground' />
				</CardHeader>
				<CardContent>
					<div className='text-2xl font-bold'>{units.total}</div>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
					<CardTitle className='text-sm font-medium'>Omsetning i måneden</CardTitle>
					<DollarSign className='h-4 w-4 text-muted-foreground' />
				</CardHeader>
				<CardContent>
					<div className='text-2xl font-bold'>{formatCurrency(totalRent)}</div>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
					<CardTitle className='text-sm font-medium'>Leietakere totalt</CardTitle>
					<Users className='h-4 w-4 text-muted-foreground' />
				</CardHeader>
				<CardContent>
					<div className='text-2xl font-bold'>{totalTenantsCounted}</div>
				</CardContent>
			</Card>
		</div>
	);
}
