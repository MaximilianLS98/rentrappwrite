import { BarChart } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

type unit = {
	title: string;
	address: string;
	monthlyrent: number;
	tenant: string;
	status: 'Occupied' | 'Vacant';
}

export default function KeyMetrics({ units } : { units: any }) {
	const rentalRate = (units.filter((unit: unit) => unit.status === 'Occupied').length / units.length * 100).toFixed(1);
	const vacancyRate = (units.filter((unit: unit) => unit.status === 'Vacant').length / units.length * 100).toFixed(1);
	const avgRent = (units.reduce((acc: number, unit: unit) => acc + unit.monthlyrent, 0) / units.length * 10).toFixed(0);
	const properties = units.length;
    return (
		<Card key='key-metrics' className='h-full overflow-clip'>
			<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
				<CardTitle className='text-md font-medium'>Nøkkeltall</CardTitle>
				<BarChart className='h-4 w-4 text-muted-foreground' />
			</CardHeader>
			<CardContent>
				<div className='grid grid-cols-2 gap-4'>
					<div>
						<p className='text-sm font-medium'>Utleiegrad</p>
						<p className='text-2xl font-bold'>{rentalRate}%</p>
					</div>
					<div>
						<p className='text-sm font-medium'>Vacancy Rate</p>
						<p className='text-2xl font-bold'>{vacancyRate}%</p>
					</div>
					<div>
						<p className='text-sm font-medium'>Gjenomsnittlig leie</p>
						<p className='text-2xl font-bold'>{avgRent}NOK</p>
					</div>
					<div>
						<p className='text-sm font-medium'>Enheter</p>
						<p className='text-2xl font-bold'>{properties}</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}