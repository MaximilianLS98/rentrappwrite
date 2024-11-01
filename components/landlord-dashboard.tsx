'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { axiosInstanceClient } from '@/utils/clientAxios';
import { Responsive, WidthProvider, Layouts } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ClipboardList, MessageSquare, Settings, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
// import { getCurrentUser, getUserLayout, saveUserLayout } from '@/appwrite/userLayoutPrefs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import RentalUnits from './landlordDashboard/RentalUnits';
import ProjectedIncome from './landlordDashboard/ProjectedIncome';
import KeyMetrics from './landlordDashboard/KeyMetrics';
import LatePayments from './landlordDashboard/LatePayments';
import RecentActivity from './landlordDashboard/RecentActivity';
import ImportantDates from './landlordDashboard/ImportDates';
import MediaLibrary from './landlordDashboard/MediaLibrary';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from './ui/table';

interface RentalUnit {
	address: string;
	status: string;
	rent: number;
	tenant: string;
}
interface Layout {
	i: string;
	x: number;
	y: number;
	w: number;
	h: number;
	minH?: number;
	maxH?: number;
	minW?: number;
	maxW?: number;
}
interface UserLayout {
	layouts: Layouts;
	modules: Module[];
}
interface Module {
	id: string;
	label: string;
	enabled: boolean;
	w?: number;
	h?: number;
}

const incomeData = [
	{ month: 'Jan', income: 10000 },
	{ month: 'Feb', income: 12000 },
	{ month: 'Mar', income: 11000 },
	{ month: 'Apr', income: 13000 },
	{ month: 'May', income: 12500 },
	{ month: 'Jun', income: 13500 },
];
const latePayments = [
	{ tenant: 'John Smith', address: '123 Main St', daysLate: 5, amountDue: 1200, interest: 30 },
	{ tenant: 'Jane Doe', address: '789 Oak St', daysLate: 10, amountDue: 1300, interest: 65 },
	{
		tenant: 'Alice Brown',
		address: '555 Cedar Ln',
		daysLate: 3,
		amountDue: 1100,
		interest: 16.5,
	},
];
const tenantRequests = [
  { id: 1, tenant: 'John Smith', property: '123 Main St', type: 'Maintenance', status: 'New', date: '2023-06-15' },
  { id: 2, tenant: 'Jane Doe', property: '456 Elm St', type: 'Complaint', status: 'In Progress', date: '2023-06-14' },
  { id: 3, tenant: 'Bob Johnson', property: '789 Oak St', type: 'Inquiry', status: 'Resolved', date: '2023-06-13' },
]
const messages = [
  { id: 1, tenant: 'John Smith', property: '123 Main St', preview: 'About the leaky faucet...', date: '2023-06-15' },
  { id: 2, tenant: 'Jane Doe', property: '456 Elm St', preview: 'Regarding the noise complaint...', date: '2023-06-14' },
  { id: 3, tenant: 'Bob Johnson', property: '789 Oak St', preview: 'Question about rent payment...', date: '2023-06-13' },
]

const rentalUnits = [
	{ address: '123 Main St', status: 'Occupied', rent: 1200, tenant: 'John Smith' },
	{ address: '456 Elm St', status: 'Vacant', rent: 1100, tenant: null },
	{ address: '789 Oak St', status: 'Occupied', rent: 1300, tenant: 'Jane Doe' },
	{ address: '321 Pine St', status: 'Occupied', rent: 1150, tenant: 'Bob Johnson' },
];
const marketTrends = [
	{ month: 'Jan', avgPrice: 1200, demand: 95 },
	{ month: 'Feb', avgPrice: 1250, demand: 98 },
	{ month: 'Mar', avgPrice: 1300, demand: 102 },
	{ month: 'Apr', avgPrice: 1280, demand: 100 },
	{ month: 'May', avgPrice: 1320, demand: 105 },
	{ month: 'Jun', avgPrice: 1350, demand: 108 },
];

const initialModules = [
	{ id: 'rental-units', label: 'Rental Units', enabled: true, w: 1, h: 2 },
	{ id: 'projected-income', label: 'Projected Income', enabled: true, w: 1, h: 2 },
	{ id: 'key-metrics', label: 'Key Metrics', enabled: true, w: 1, h: 1 },
	{ id: 'important-dates', label: 'Important Dates', enabled: true, w: 1, h: 2 },
	{ id: 'media-library', label: 'Media Library', enabled: true, w: 1, h: 2 },
	{ id: 'recent-activity', label: 'Recent Activity', enabled: true, w: 1, h: 2 },
	{ id: 'late-payments', label: 'Late Payments', enabled: true },
	{ id: 'tenant-requests', label: 'Tenant Requests', enabled: true },
	{ id: 'market-trends', label: 'Market Trends', enabled: true },
	{ id: 'messages', label: 'Messages', enabled: true },
];

export function LandlordDashboardComponent() {
	const ResponsiveGridLayout = useMemo(() => WidthProvider(Responsive), []);
	const [modules, setModules] = useState(initialModules);
	const [isSheetOpen, setIsSheetOpen] = useState(false);
	const [hasRendered, setHasRendered] = useState(false);

	const [layouts, setLayouts] = useState<Layouts>({
		lg: modules
			.filter((m) => m.enabled)
			.map((module, index) => ({
				i: module.id,
				x: index % 3,
				y: Math.floor(index / 3),
				w: module.w || 2,
				h: module.h || 2,
				// minH: 2
			})),
	});

	const updateLayout = async (layout: Layouts, modules: Module[]) => {
    console.log(`Hitting updateLayout in the LandlordDashboardComponent`);
		await axiosInstanceClient.post('api/userprefs/layout', {
			data: { layout, modules },
		});
	};
	const getLayout = async () => {
		const response = await axiosInstanceClient.get('api/userprefs/layout');
		return response.data;
	};

	useEffect(() => {
		(async () => {
			const layoutAndModules = await getLayout();
			// console.log(`Layout and modules: ${JSON.stringify(layoutAndModules, null, 2)}`);
      if (!layoutAndModules) {
        setHasRendered(true);
        return;
      }
			setModules(layoutAndModules.modules);
			setLayouts((prevState) => ({
				...prevState,
				lg: layoutAndModules.layout.lg,
			}));
			setHasRendered(true);
		})();
	}, []);

	const onLayoutChange = (currentLayout: Layout[], allLayouts: Layouts) => {
		console.log(`LayoutChange triggered`);
		if (hasRendered) {
			setLayouts(allLayouts);
			updateLayout(allLayouts, modules);
		}
	};

	// const toggleModule = (id: string) => {
	// 	setModules(modules.map((m) => (m.id === id ? { ...m, enabled: !m.enabled } : m)));
	// };
	const toggleModule = (id: string) => {
		const newModules = modules.map((m) => (m.id === id ? { ...m, enabled: !m.enabled } : m));
		setModules(newModules);
		updateLayout(layouts, newModules);
	};

	const renderComponent = (id: string) => {
		const componentContent = (() => {
			switch (id) {
				case 'rental-units':
					return (
						<RentalUnits key='rental-units' rentalUnits={rentalUnits as RentalUnit[]} />
					);
				case 'projected-income':
					return <ProjectedIncome key='projected-income' incomeData={incomeData} />;
				case 'important-dates':
					return <ImportantDates key='important-dates' />;
				case 'media-library':
					return <MediaLibrary key='media-library' />;
				case 'recent-activity':
					return <RecentActivity key='recent-activity' />;
				case 'key-metrics':
					return <KeyMetrics key='key-metrics' />;
				case 'late-payments':
					return <LatePayments key='late-payments' latePayments={latePayments} />;
               case 'tenant-requests':
          return (
            <Card key="tenant-requests" className="h-full overflow-auto">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tenant Requests</CardTitle>
                <ClipboardList className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  {/* <pre>{JSON.stringify(tenantRequests, null, 2)}</pre> */}
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tenant</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tenantRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell>{request.tenant}</TableCell>
                          <TableCell>{request.type}</TableCell>
                          <TableCell>
                            <Badge variant={request.status === 'New' ? 'destructive' : request.status === 'In Progress' ? 'default' : 'secondary'}>
                              {request.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{request.date}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
          )

        case 'market-trends':
          return (
            <Card key="market-trends" className="h-full overflow-auto">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Market Trends</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="flex flex-col h-[calc(100%-2rem)]">
                <div className="mb-2">
                  <div className="text-2xl font-bold">$1,350</div>
                  <p className="text-xs text-muted-foreground">Average price this month</p>
                </div>
                <div className="flex-grow">
                  <ChartContainer
                    config={{
                      avgPrice: {
                        label: "Avg Price",
                        color: "hsl(var(--chart-1))",
                      },
                      demand: {
                        label: "Demand",
                        color: "hsl(var(--chart-2))",
                      },
                    }}
                    className="w-full h-full"
                  >
                    <ResponsiveContainer width="100%" height="100%" minHeight={200}>
                      <LineChart data={marketTrends}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line yAxisId="left" type="monotone" dataKey="avgPrice" stroke="var(--color-avgPrice)" strokeWidth={2} />
                        <Line yAxisId="right" type="monotone" dataKey="demand" stroke="var(--color-demand)" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          )

        case 'messages':
          return (
            <Card key="messages" className="h-full overflow-auto">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Messages</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <ul className="space-y-4">
                    {messages.map((message) => (
                      <li key={message.id} className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback>{message.tenant.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">{message.tenant}</p>
                          <p className="text-sm text-muted-foreground">{message.preview}</p>
                        </div>
                        <p className="text-xs text-muted-foreground">{message.date}</p>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </CardContent>
            </Card>
          )
				default:
					return null;
			}
		})();

		return <div className='h-full overflow-auto'>{componentContent}</div>;
	};

	return (
		<div className='container mx-auto min-h-screen p-4'>
			<header className='mb-6 flex items-center justify-between'>
				<div className='flex items-center space-x-4'>
					<Avatar className='h-12 w-12'>
						<AvatarImage src='/placeholder-avatar.jpg' alt='Landlord' />
						<AvatarFallback>MLS</AvatarFallback>
					</Avatar>
					<h1 className='text-2xl font-bold'>Welcome, Maximilian Skjønhaug</h1>
				</div>
				{/* <pre>{JSON.stringify(layouts, null, 2)}</pre> */}
				<Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
					<SheetTrigger asChild>
						<Button variant='outline' size='icon'>
							<Settings className='h-4 w-4' />
						</Button>
					</SheetTrigger>
					<SheetContent>
						<SheetHeader>
							<SheetTitle>Dashboard Settings</SheetTitle>
							<SheetDescription>
								Toggle modules on or off to customize your dashboard.
							</SheetDescription>
						</SheetHeader>
						<div className='py-4'>
							{modules.map((module) => (
								<div key={module.id} className='flex items-center space-x-2 mb-4'>
									<Switch
										id={module.id}
										checked={module.enabled}
										onCheckedChange={() => toggleModule(module.id)}
									/>
									<Label htmlFor={module.id}>{module.label}</Label>
								</div>
							))}
						</div>
					</SheetContent>
				</Sheet>
			</header>

			<ResponsiveGridLayout
				className='layout'
				layouts={layouts}
				breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
				cols={{ lg: 3, md: 3, sm: 2, xs: 1, xxs: 1 }}
				rowHeight={200}
				onLayoutChange={onLayoutChange}
				isResizable={true}
				isDraggable={true}
				draggableCancel='.no-drag'
				autoSize={true}>
				{modules
					.filter((m) => m.enabled)
					.map((module) => (
						<div key={module.id} className='relative'>
							{renderComponent(module.id)}
						</div>
					))}
			</ResponsiveGridLayout>
		</div>
	);
}
