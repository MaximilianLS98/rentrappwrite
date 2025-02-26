'use client';

import { PropertyOverview } from '../../components/PropertyOverview';
import { FinancialSummary } from '../../components/FinancialSummary';
import { UnitList } from '../../components/UnitList';
import { MaintenanceRequests } from '../../components/MaintenanceRequests';
import { OccupancyChart } from '../../components/OccupancyChart';
import { RevenueChart } from '../../components/RevenueChart';
import { Button } from '../../components/ui/button';
import Link from 'next/link';
import {
	TFetchMaintenanceRequests,
	TMaintenanceRequest,
} from '@/constants/types/maintenancerequests';
import { FetchUnit } from '@/constants/types/units';

// Mock data
const propertyData = {
	totalProperties: 5,
	totalUnits: 12,
	totalRevenue: 25000,
	totalTenants: 18,
};

const financialData = {
	totalRevenue: 25000,
	expenses: 8000,
	netIncome: 17000,
	occupancyRate: 92,
};

const occupancyData = {
	occupied: 10,
	vacant: 2,
};

const revenueData = [
	{ month: 'Jan', revenue: 22000 },
	{ month: 'Feb', revenue: 23000 },
	{ month: 'Mar', revenue: 24000 },
	{ month: 'Apr', revenue: 25000 },
	{ month: 'Mai', revenue: 26000 },
	{ month: 'Jun', revenue: 27000 },
];

type Props = {
  properties: any;
  units: FetchUnit;
  maintenancerequests: TMaintenanceRequest[];
}


export default function Dashboard(props: Props) {

  const data = () => {
    const totalRent = props.units.documents.reduce((acc: number, unit: any) => {
      return acc + unit.monthlyrent;
    }
    , 0);
    const totalUnits = props.units.total;
    const totalProperties = props.properties.total;
    const totalTenants = props.units.documents.filter((unit: any) => unit.status === 'Occupied').length;
    return { totalRent, totalUnits, totalProperties, totalTenants };
  }
  
	return (
		<div className='mx-auto  space-y-4'>
			<div className='flex justify-between items-center'>
				<h1 className='text-3xl font-bold'>Dashboard</h1>
				<div className='space-x-2'>
					<Link href='/leases/create'>
						<Button variant={'rentr'}>Ny leiekontrakt</Button>
					</Link>
					<Link href='/properties/create'>
						<Button variant={'outline'}>Legg til eiendom</Button>
					</Link>
					<Link href='/units/create'>
						<Button variant={'outline'}>Legg til enhet</Button>
					</Link>
					{/* <AddPropertyButton /> */}
					{/* <AddUnitButton /> */}
				</div>
			</div>

			<PropertyOverview {...propertyData} properties={props.properties} units={props.units} />

			<div className='grid gap-4 md:grid-cols-4'>
				<UnitList units={props.units} />
				<MaintenanceRequests mrequests={props.maintenancerequests} />
			</div>

			{/* <div className='grid gap-4 md:grid-cols-4'>
				<FinancialSummary {...financialData} />
			</div> */}

			{/* <div className='grid gap-4 md:grid-cols-2'>
				<OccupancyChart {...occupancyData} />
				<RevenueChart data={revenueData} />
			</div> */}
		</div>
	);
}
