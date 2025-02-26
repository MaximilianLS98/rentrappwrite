'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {  TrendingUp } from 'lucide-react';
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const marketTrends = [
	{ month: 'Jan', avgPrice: 1200, demand: 95 },
	{ month: 'Feb', avgPrice: 1250, demand: 98 },
	{ month: 'Mar', avgPrice: 1300, demand: 102 },
	{ month: 'Apr', avgPrice: 1280, demand: 100 },
	{ month: 'May', avgPrice: 1320, demand: 105 },
	{ month: 'Jun', avgPrice: 1350, demand: 108 },
];

export default function MarketTrends() {
    return (
		<Card key='market-trends' className='h-full overflow-auto'>
			<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
				<CardTitle className='text-sm font-medium'>Markedstrender</CardTitle>
				<TrendingUp className='h-4 w-4 text-muted-foreground' />
			</CardHeader>
			<CardContent className='flex flex-col h-[calc(100%-2rem)]'>
				<div className='mb-2'>
					<div className='text-2xl font-bold'>10,350NOK</div>
					<p className='text-xs text-muted-foreground'>Gjennomsnittlig leie i Norge</p>
				</div>
				<div className='flex-grow'>
					<ChartContainer
						config={{
							avgPrice: {
								label: 'Avg Price',
								color: 'hsl(var(--chart-1))',
							},
							demand: {
								label: 'Demand',
								color: 'hsl(var(--chart-2))',
							},
						}}
						className='w-full h-full'>
						<ResponsiveContainer width='100%' height='100%' minHeight={200}>
							<LineChart data={marketTrends}>
								<CartesianGrid strokeDasharray='3 3' />
								<XAxis dataKey='month' />
								<YAxis yAxisId='left' />
								<YAxis yAxisId='right' orientation='right' />
								<ChartTooltip content={<ChartTooltipContent />} />
								<Line
									yAxisId='left'
									type='monotone'
									dataKey='avgPrice'
									stroke='var(--color-avgPrice)'
									strokeWidth={2}
								/>
								<Line
									yAxisId='right'
									type='monotone'
									dataKey='demand'
									stroke='var(--color-demand)'
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