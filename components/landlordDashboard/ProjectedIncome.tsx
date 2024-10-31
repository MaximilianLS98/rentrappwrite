import { DollarSign } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

type props = {
	incomeData: IncomeData[];
};
interface IncomeData {
	month: string;
	income: number;
}

export default function ProjectedIncome(props: props) {
	return (
		<Card key='projected-income' className='h-full overflow-auto'>
			<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
				<CardTitle className='text-md font-medium'>Projected Income</CardTitle>
				<DollarSign className='h-4 w-4 text-muted-foreground' />
			</CardHeader>
			<CardContent className='flex flex-col h-[calc(100%-2rem)]'>
				<div className='mb-2'>
					<div className='text-2xl font-bold'>$13,500</div>
					<p className='text-xs text-muted-foreground'>+8% from last month</p>
				</div>
				<div className='flex-grow'>
					<ChartContainer
						config={{
							income: {
								label: 'Income',
								color: 'hsl(var(--chart-1))',
							},
						}}
						className='w-full h-full'>
						<ResponsiveContainer width='100%' height='100%' minHeight={200}>
							<LineChart data={props.incomeData} dataKey='income'>
								<CartesianGrid strokeDasharray='3 3' />
								<XAxis dataKey='month' />
								<YAxis />
								<ChartTooltip content={<ChartTooltipContent />} />
								<Line
									type='monotone'
									dataKey='income'
									stroke='var(--color-income)'
									strokeWidth={2}
								/>
							</LineChart>
						</ResponsiveContainer>
					</ChartContainer>
				</div>
			</CardContent>
		</Card>
	);
}
