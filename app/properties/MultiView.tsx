'use client';

import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, Home, PenToolIcon as Tool, Users } from 'lucide-react';
import { TProperty } from '@/constants/types/properties';
import { TUnit } from '@/constants/types/units';
import { TFetchMaintenanceRequests } from '@/constants/types/maintenancerequests';
import {
	totalRentProperty,
	totalRentOccupied,
	currencyFormatter,
	occupancyRateCalc,
	translateMaintenancePriority,
	translateMaintenanceStatus,
	translateOccupancyStatus
} from '@/utils/helpers';
import Link from 'next/link';

const financialData = [
	{ month: 'Jan', income: 5000, expenses: 2000 },
	{ month: 'Feb', income: 6000, expenses: 2200 },
	{ month: 'Mar', income: 5500, expenses: 1800 },
	{ month: 'Apr', income: 5800, expenses: 2100 },
	{ month: 'May', income: 6200, expenses: 2300 },
];

const maintenanceRequests = [
	{ id: 1, unit: '101', issue: 'Leaky faucet', status: 'Pending', date: '2023-05-15' },
	{ id: 2, unit: '202', issue: 'Broken window', status: 'In Progress', date: '2023-05-10' },
	{ id: 3, unit: '102', issue: 'HVAC maintenance', status: 'Completed', date: '2023-05-01' },
];

//

export default function MultiUnitPropertyManagement(props: {
	property?: TProperty;
	maintenancerequests: TFetchMaintenanceRequests;
}) {
	const [occupancyRate, setOccupancyRate] = useState(
		occupancyRateCalc(props.property?.units ?? []),
	);

	const relevantMaintenanceRequests = props.maintenancerequests.documents.filter((request) => {
		// Find all maintenance requests this property is responsible for, all requests has an object containing one unit with and id, and all units has an array containing property id
		if (request.status === 'closed') return false;
		const allUnitIdsInProperty = props.property?.units?.map((unit) => unit.$id) ?? [];
		const requestUnitId = request.units.$id;
		return allUnitIdsInProperty.includes(requestUnitId);
	});

	return (
		<div className='mx-auto py-4'>
			<Card className='overflow-hidden'>
				<CardHeader>
					<div className='flex items-center justify-between'>
						<CardTitle className='text-2xl font-bold'>
							{props.property ? props.property.name : null}
						</CardTitle>
						<Badge variant='secondary' className='text-lg'>
							{occupancyRate.percentage}% Occupied
						</Badge>
					</div>
				</CardHeader>
				<CardContent>
					<Tabs defaultValue='overview' className='w-full'>
						<TabsList>
							<TabsTrigger value='overview'>Overview</TabsTrigger>
							<TabsTrigger value='financial'>Financial</TabsTrigger>
							<TabsTrigger value='units'>Units</TabsTrigger>
							<TabsTrigger value='maintenance'>Maintenance</TabsTrigger>
						</TabsList>
						<TabsContent value='overview'>
							<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
								<Card className='hover:bg-rentr-lightblue hover:border-rentr-main hover:shadow-lg hover:shadow-rentr-lightblue'>
									<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
										<CardTitle className='text-sm font-medium'>
											Total Rent
										</CardTitle>
										<DollarSign className='h-4 w-4 text-muted-foreground' />
									</CardHeader>
									<CardContent>
										<div className='text-2xl font-bold'>
											{currencyFormatter(
												totalRentOccupied(props.property?.units ?? []),
												false,
											)}{' '}
											/{' '}
											{currencyFormatter(
												totalRentProperty(props.property?.units ?? []),
												false,
											)}
										</div>
										<p className='text-xs text-muted-foreground'>
											+5.1% from last month
										</p>
									</CardContent>
								</Card>
								<Card className='hover:bg-rentr-lightblue hover:border-rentr-main hover:shadow-lg hover:shadow-rentr-lightblue'>
									<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
										<CardTitle className='text-sm font-medium'>
											Occupancy
										</CardTitle>
										<Home className='h-4 w-4 text-muted-foreground' />
									</CardHeader>
									<CardContent>
										<div className='text-2xl font-bold'>
											{occupancyRate.percentage}%
										</div>
										<Progress
											value={occupancyRate.percentage}
											className='mt-2'
										/>
									</CardContent>
								</Card>
								<Card className='hover:bg-rentr-lightblue hover:border-rentr-main hover:shadow-lg hover:shadow-rentr-lightblue'>
									<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
										<CardTitle className='text-sm font-medium'>
											Maintenance
										</CardTitle>
										<Tool className='h-4 w-4 text-muted-foreground' />
									</CardHeader>
									<CardContent>
										<div className='text-2xl font-bold'>
											{relevantMaintenanceRequests.length} Aktive
										</div>
										<p className='text-xs text-muted-foreground'>
											1 Pending, 1 In Progress, 1 Completed
										</p>
									</CardContent>
								</Card>
								<Card className='hover:bg-rentr-lightblue hover:border-rentr-main hover:shadow-lg hover:shadow-rentr-lightblue'>
									<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
										<CardTitle className='text-sm font-medium'>
											Total Units
										</CardTitle>
										<Users className='h-4 w-4 text-muted-foreground' />
									</CardHeader>
									<CardContent>
										<div className='text-2xl font-bold'>
											{props.property?.units?.length ?? 0}
										</div>
										<p className='text-xs text-muted-foreground'>
											{occupancyRate.occupied} Utleid, {occupancyRate.vacant}{' '}
											Ledig
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
								<CardContent>
									<div className='h-[300px]'>
										<ResponsiveContainer width='100%' height='100%'>
											<BarChart data={financialData}>
												<CartesianGrid strokeDasharray='3 3' />
												<XAxis dataKey='month' />
												<YAxis />
												<Tooltip />
												<Bar
													dataKey='income'
													fill='#8884d8'
													name='Income'
												/>
												<Bar
													dataKey='expenses'
													fill='#82ca9d'
													name='Expenses'
												/>
											</BarChart>
										</ResponsiveContainer>
									</div>
									<div className='mt-4'>
										<p className='font-semibold'>Total Income (YTD): $28,500</p>
										<p className='font-semibold'>
											Total Expenses (YTD): $10,400
										</p>
										<p className='mt-2 text-lg font-bold'>
											Net Profit (YTD): $18,100
										</p>
									</div>
								</CardContent>
							</Card>
						</TabsContent>
						<TabsContent value='units'>
							<Card>
								<CardHeader>
									<CardTitle>Enhetsoversikt</CardTitle>
								</CardHeader>
								<CardContent>
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead>Enhet</TableHead>
												<TableHead>Leietaker</TableHead>
												<TableHead>Leie</TableHead>
												<TableHead>Status</TableHead>
												<TableHead>Lease Ends</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{props.property?.units?.map((unit) => (
												<TableRow key={unit.$id}>
													<TableCell>{unit.title}</TableCell>
													<TableCell>
														{unit.status === 'occupied'
															? unit.tenant
															: '-'}
													</TableCell>
													<TableCell>
														{currencyFormatter(unit.monthlyrent, false)}
													</TableCell>
													<TableCell>
														<Badge
															variant={
																unit.status === 'occupied'
																	? 'default'
																	: 'destructive'
															}>
															{translateOccupancyStatus(unit.status)}
														</Badge>
													</TableCell>
													<TableCell>01.01.2025</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</CardContent>
							</Card>
						</TabsContent>
						<TabsContent value='maintenance'>
							<Card>
								<CardHeader>
									<CardTitle>Maintenance Requests</CardTitle>
								</CardHeader>
								<CardContent>
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead>Enhet</TableHead>
												<TableHead>Problem</TableHead>
												<TableHead>Status</TableHead>
												<TableHead>Dato</TableHead>
												<TableHead>Prioritet</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{relevantMaintenanceRequests.length !== 0 ? (
												relevantMaintenanceRequests.map((request) => (
													<TableRow key={request.$id}>
														<TableCell>{request.units.title}</TableCell>
														<TableCell>{request.title}</TableCell>
														<TableCell>
															<Badge
																variant={
																	request.status === 'open'
																		? 'default'
																		: request.status ===
																		  'backlog'
																		? 'destructive'
																		: 'outline'
																}>
																{translateMaintenanceStatus(
																	request.status,
																)}
															</Badge>
														</TableCell>
														<TableCell>{request.$createdAt}</TableCell>
														<TableCell>
															<Badge
																className={
																	request.priority === 'low'
																		? 'bg-green-500'
																		: request.priority ===
																		  'medium'
																		? 'bg-yellow-500'
																		: request.priority ===
																		  'high'
																		? 'bg-orange-500'
																		: request.priority ===
																		  'critical'
																		? 'bg-red-500'
																		: 'bg-gray-500'
																}>
																{translateMaintenancePriority(
																	request.priority,
																)}
															</Badge>
														</TableCell>
													</TableRow>
												))
											) : (
												<TableRow>
													<TableCell colSpan={5}>
														Ingen aktive henvendelser
													</TableCell>
												</TableRow>
											)}
										</TableBody>
									</Table>
								</CardContent>
							</Card>
						</TabsContent>
					</Tabs>
				</CardContent>
				<CardFooter className='flex justify-between'>
					<Button variant='outline'>Last ned rapport</Button>
					<Link href={`/properties/${props.property?.$id}`}>
						<Button>Administrer</Button>
					</Link>
				</CardFooter>
			</Card>
		</div>
	);
}
