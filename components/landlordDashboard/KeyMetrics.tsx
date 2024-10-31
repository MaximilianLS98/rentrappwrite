import { BarChart } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

export default function KeyMetrics() {
    return (
		<Card key='key-metrics' className='h-full overflow-auto'>
			<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
				<CardTitle className='text-md font-medium'>Key Metrics</CardTitle>
				<BarChart className='h-4 w-4 text-muted-foreground' />
			</CardHeader>
			<CardContent>
				<div className='grid grid-cols-2 gap-4'>
					<div>
						<p className='text-sm font-medium'>Rental Rate</p>
						<p className='text-2xl font-bold'>95%</p>
					</div>
					<div>
						<p className='text-sm font-medium'>Vacancy Rate</p>
						<p className='text-2xl font-bold'>5%</p>
					</div>
					<div>
						<p className='text-sm font-medium'>Avg. Rent</p>
						<p className='text-2xl font-bold'>$1,200</p>
					</div>
					<div>
						<p className='text-sm font-medium'>Properties</p>
						<p className='text-2xl font-bold'>4</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}