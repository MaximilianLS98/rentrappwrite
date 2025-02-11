'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { axiosInstanceClient } from '@/utils/clientAxios';
import { Responsive, WidthProvider, Layouts } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ClipboardList, Settings, TrendingUp } from 'lucide-react';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
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
import MessagesComponent from './landlordDashboard/Messages';
import MarketTrends from './landlordDashboard/MarketTrends';
import TenantRequests from './landlordDashboard/TenantRequests';
import { useToast } from '@/hooks/use-toast';

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
type Modules = Module[];

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

export function LandlordDashboardComponent({
	rentalUnits,
	user,
}: {
	rentalUnits?: any;
	user?: any;
}) {
	const ResponsiveGridLayout = useMemo(() => WidthProvider(Responsive), []);
	const [modules, setModules] = useState<Modules>(
		localStorage.getItem('modules')
			? JSON.parse(localStorage.getItem('modules') as string)
			: initialModules,
	);
	const [isSheetOpen, setIsSheetOpen] = useState(false);
	const [hasRendered, setHasRendered] = useState(false);
	const { toast } = useToast();

	const defaultLayout = {
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
	};
	const [layouts, setLayouts] = useState<Layouts>(
		localStorage.getItem('layout')
			? JSON.parse(localStorage.getItem('layout') as string)
			: defaultLayout,
	);

	const updateLayout = async (layout: Layouts, modules: Module[]) => {
		console.log(`Hitting updateLayout in the LandlordDashboardComponent`);
		try {
			await axiosInstanceClient.post('api/userprefs/layout', {
				data: { layout, modules },
			});
			// Also adding the layout to the localstorage for quick retrieval on page refresh
			localStorage.setItem('layout', JSON.stringify(layout));
			localStorage.setItem('modules', JSON.stringify(modules));
			toast({
				title: 'Success',
				description: 'Layout updated successfully',
			});
		} catch (error) {
			console.error(`Error updating layout: ${error}`);
			toast({
				title: 'Error',
				description: 'Failed to update layout',
				variant: 'destructive',
			});
		}
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
			localStorage.setItem('layout', JSON.stringify(allLayouts));
			// updateLayout(allLayouts, modules); ? turned it off so we dont hit the api on every change, added a save button instead
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
					return <RentalUnits key='rental-units' rentalUnits={rentalUnits} />;
				case 'projected-income':
					return <ProjectedIncome key='projected-income' incomeData={incomeData} />;
				case 'important-dates':
					return <ImportantDates key='important-dates' />;
				case 'media-library':
					return <MediaLibrary key='media-library' />;
				case 'recent-activity':
					return <RecentActivity key='recent-activity' />;
				case 'key-metrics':
					return <KeyMetrics key='key-metrics' units={rentalUnits} />;
				case 'late-payments':
					return <LatePayments key='late-payments' latePayments={latePayments} />;
				case 'tenant-requests':
					return <TenantRequests key='tenant-requests' />;
				case 'market-trends':
					return <MarketTrends key='market-trends' />;
				case 'messages':
					return <MessagesComponent key='messages' />;
				default:
					return null;
			}
		})();

		return <div className='h-full overflow-auto'>{componentContent}</div>;
	};

	return (
		<div className='container mx-auto min-h-screen md:p-4'>
			<header className='mb-6 flex items-center justify-between'>
				<div className='flex items-center space-x-4'>
					<Avatar className='h-12 w-12'>
						<AvatarImage src='/placeholder-avatar.jpg' alt='Landlord' />
						<AvatarFallback>MLS</AvatarFallback>
					</Avatar>
					<h1 className='text-2xl font-bold'>
						Velkommen, {user.name ? user.name : user.email}
					</h1>
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
							<SheetTitle>Dashboard innstillinger</SheetTitle>
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
						<Button className='rounded' onClick={() => updateLayout(layouts, modules)}>
							Lagre layout
						</Button>
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
