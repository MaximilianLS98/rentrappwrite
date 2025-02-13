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
import auth from '@/utils/auth';

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

interface Unit {
	id: string;
	name: string;
	type: 'Single' | 'Multi';
	totalUnits?: number;
	occupiedUnits?: number;
	status: 'Occupied' | 'Vacant' | 'Partially Occupied' | 'Maintenance';
	rent: number;
}
const dummyunits = [
	{ id: '1', name: '123 Main St', type: 'Single', status: 'Occupied', rent: 1500 },
	{
		id: '2',
		name: '456 Elm St',
		type: 'Multi',
		totalUnits: 2,
		occupiedUnits: 1,
		status: 'Partially Occupied',
		rent: 2400,
	},
	{ id: '3', name: '789 Oak Ave', type: 'Single', status: 'Maintenance', rent: 1800 },
	{
		id: '4',
		name: '101 Pine Rd',
		type: 'Multi',
		totalUnits: 3,
		occupiedUnits: 3,
		status: 'Occupied',
		rent: 3000,
	},
	{ id: '5', name: '202 Maple Ln', type: 'Single', status: 'Vacant', rent: 1600 },
] as Unit[];

interface MaintenanceRequest {
	id: string;
	unit: string;
	description: string;
	priority: 'Low' | 'Medium' | 'High';
	status: 'Open' | 'In Progress' | 'Closed';
}
const maintenanceRequests = [
	{ id: '1', unit: '123 Main St', description: 'Leaky faucet', priority: 'Low', status: 'Open' },
	{
		id: '2',
		unit: '456 Elm St - Unit A',
		description: 'Broken AC',
		priority: 'High',
		status: 'In Progress',
	},
	{
		id: '3',
		unit: '789 Oak Ave',
		description: 'Paint touch-up',
		priority: 'Medium',
		status: 'Open',
	},
	{
		id: '4',
		unit: '789 Oak Ave',
		description: 'Paint touch-up',
		priority: 'Medium',
		status: 'Open',
	},
	{
		id: '5',
		unit: '789 Oak Ave',
		description: 'Paint touch-up',
		priority: 'Medium',
		status: 'Open',
	},
] as MaintenanceRequest[];

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
  units: any;
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
		<div className='container mx-auto p-4 space-y-4'>
			<div className='flex justify-between items-center'>
				<h1 className='text-3xl font-bold'>Dashboard</h1>
				<div className='space-x-2'>
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
				<MaintenanceRequests requests={maintenanceRequests} mrequests={props.maintenancerequests} />
			</div>

			<div className='grid gap-4 md:grid-cols-4'>
				<FinancialSummary {...financialData} />
			</div>

			{/* <div className='grid gap-4 md:grid-cols-2'>
				<OccupancyChart {...occupancyData} />
				<RevenueChart data={revenueData} />
			</div> */}
		</div>
	);
}
