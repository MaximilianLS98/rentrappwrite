'use client';

import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const IncomeGraph = (data: any) => {
	console.log(`Data in IncomeGraph: ${JSON.stringify(data)}`);

	return (
		<>
			<ChartContainer
				id='incomeGraph'
				className='w-full max-h-[400px]'
				config={{
					income: {
						label: 'Income',
						color: 'hsl(var(--chart-1))',
					},
				}}>
				<ResponsiveContainer width='100%' height={400}>
					<LineChart data={data.data}>
						<CartesianGrid strokeDasharray='3 3' />
						<XAxis dataKey='year' />
						<YAxis />
						<ChartTooltip />
						<ChartTooltipContent />
						<Line
							type='monotone'
							dataKey='unitIncome'
							stroke='green'
							activeDot={{ r: 8 }}
						/>
						<Line type='monotone' dataKey='areaIncome' stroke='blue' />
						<Line type='monotone' dataKey='forecast' stroke='black' />
					</LineChart>
				</ResponsiveContainer>
			</ChartContainer>
		</>
	);
};

export default IncomeGraph;
