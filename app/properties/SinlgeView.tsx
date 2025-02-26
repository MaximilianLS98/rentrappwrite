'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { DollarSign, Home, PenToolIcon as Tool, Calendar } from 'lucide-react';
import { TProperty } from '@/constants/types/properties';
import { totalRentProperty, currencyFormatter } from '@/utils/helpers';

const financialData = [
	{ name: 'Rent', value: 1500 },
	{ name: 'Expenses', value: 300 },
];

const maintenanceRequests = [
	{ id: 1, issue: 'Leaky faucet', status: 'Pending', date: '2023-05-15' },
	{ id: 2, issue: 'Broken window', status: 'In Progress', date: '2023-05-10' },
	{ id: 3, issue: 'HVAC maintenance', status: 'Completed', date: '2023-05-01' },
];

export default function SingleUnitPropertyManagement(props: { property: TProperty }) {
	const [occupancyRate] = useState(100);
	const COLORS = ['#0088FE', '#00C49F'];

	return (
		<div className='mx-auto py-4'>
			<Card className='overflow-hidden'>
				<CardHeader>
					<div className='flex items-center justify-between'>
						<CardTitle className='text-2xl font-bold'>{props.property ? props.property.name : null}</CardTitle>
						<Badge
							variant={occupancyRate === 100 ? 'default' : 'destructive'}
							className='text-lg'>
							{occupancyRate === 100 ? 'Occupied' : 'Vacant'}
						</Badge>
					</div>
				</CardHeader>
				<CardContent>
					<Tabs defaultValue='overview' className='w-full'>
						<TabsList>
							<TabsTrigger value='overview'>Overview</TabsTrigger>
							<TabsTrigger value='financial'>Financial</TabsTrigger>
							<TabsTrigger value='maintenance'>Maintenance</TabsTrigger>
							<TabsTrigger value='tenant'>Tenant</TabsTrigger>
						</TabsList>
						<TabsContent value='overview'>
							<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
								<Card>
									<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
										<CardTitle className='text-sm font-medium'>
											Total Rent
										</CardTitle>
										<DollarSign className='h-4 w-4 text-muted-foreground' />
									</CardHeader>
									<CardContent>
										<div className='text-2xl font-bold'>{currencyFormatter(totalRentProperty(props.property.units || []), false)}</div>
										<p className='text-xs text-muted-foreground'>
											+2.5% from last month
										</p>
									</CardContent>
								</Card>
								<Card>
									<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
										<CardTitle className='text-sm font-medium'>
											Occupancy
										</CardTitle>
										<Home className='h-4 w-4 text-muted-foreground' />
									</CardHeader>
									<CardContent>
										<div className='text-2xl font-bold'>100%</div>
										<Progress value={100} className='mt-2' />
									</CardContent>
								</Card>
								<Card>
									<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
										<CardTitle className='text-sm font-medium'>
											Maintenance
										</CardTitle>
										<Tool className='h-4 w-4 text-muted-foreground' />
									</CardHeader>
									<CardContent>
										<div className='text-2xl font-bold'>2 Active</div>
										<p className='text-xs text-muted-foreground'>
											1 Pending, 1 In Progress
										</p>
									</CardContent>
								</Card>
								<Card>
									<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
										<CardTitle className='text-sm font-medium'>
											Lease Ends
										</CardTitle>
										<Calendar className='h-4 w-4 text-muted-foreground' />
									</CardHeader>
									<CardContent>
										<div className='text-2xl font-bold'>Aug 31, 2023</div>
										<p className='text-xs text-muted-foreground'>
											3 months remaining
										</p>
									</CardContent>
								</Card>
							</div>
						</TabsContent>
						<TabsContent value='financial'>
							<Card>
								<CardHeader>
									<CardTitle>Financial Overview</CardTitle>
								</CardHeader>
								<CardContent className='flex justify-between'>
									<div>
										<p className='mb-2 text-lg font-semibold'>
											Monthly Summary
										</p>
										<p>Rent Collected: $1,500</p>
										<p>Expenses: $300</p>
										<p className='mt-2 font-bold'>Net Profit: $1,200</p>
									</div>
									<div className='h-48 w-48'>
										<ResponsiveContainer width='100%' height='100%'>
											<PieChart>
												<Pie
													data={financialData}
													cx='50%'
													cy='50%'
													innerRadius={60}
													outerRadius={80}
													fill='#8884d8'
													paddingAngle={5}
													dataKey='value'>
													{financialData.map((entry, index) => (
														<Cell
															key={`cell-${index}`}
															fill={COLORS[index % COLORS.length]}
														/>
													))}
												</Pie>
											</PieChart>
										</ResponsiveContainer>
									</div>
								</CardContent>
							</Card>
						</TabsContent>
						<TabsContent value='maintenance'>
							<Card>
								<CardHeader>
									<CardTitle>Maintenance Requests</CardTitle>
								</CardHeader>
								<CardContent>
									<ul className='space-y-4'>
										{maintenanceRequests.map((request) => (
											<li
												key={request.id}
												className='flex items-center justify-between'>
												<div>
													<p className='font-semibold'>{request.issue}</p>
													<p className='text-sm text-muted-foreground'>
														{request.date}
													</p>
												</div>
												<Badge
													variant={
														request.status === 'Completed'
															? 'default'
															: request.status === 'In Progress'
															? 'destructive'
															: 'outline'
													}>
													{request.status}
												</Badge>
											</li>
										))}
									</ul>
								</CardContent>
							</Card>
						</TabsContent>
						<TabsContent value='tenant'>
							<Card>
								<CardHeader>
									<CardTitle>Tenant Information</CardTitle>
								</CardHeader>
								<CardContent>
									<div className='flex items-center space-x-4'>
										<Avatar className='h-16 w-16'>
											<AvatarImage src='/placeholder.svg' alt='Tenant' />
											<AvatarFallback>JD</AvatarFallback>
										</Avatar>
										<div>
											<p className='text-lg font-semibold'>John Doe</p>
											<p className='text-muted-foreground'>
												john.doe@example.com
											</p>
											<p className='text-muted-foreground'>(123) 456-7890</p>
										</div>
									</div>
									<div className='mt-4'>
										<p>
											<strong>Lease Start:</strong> Sep 1, 2022
										</p>
										<p>
											<strong>Lease End:</strong> Aug 31, 2023
										</p>
										<p>
											<strong>Rent:</strong> $1,500 / month
										</p>
										<p>
											<strong>Security Deposit:</strong> $2,250
										</p>
									</div>
								</CardContent>
							</Card>
						</TabsContent>
					</Tabs>
				</CardContent>
				<CardFooter className='flex justify-between'>
					<Button variant='outline'>Download Reports</Button>
					<Button>Manage Property</Button>
				</CardFooter>
			</Card>
		</div>
	);
}

