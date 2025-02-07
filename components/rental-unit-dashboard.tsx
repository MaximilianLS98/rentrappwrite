import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	FileText,
	Home,
	Edit,
	User,
	DollarSign,
	Calendar as CalendarIcon,
} from 'lucide-react';
import UploadFile from './UploadFile';
import UploadMultipleFiles from './UploadMultipleFiles';
import { axiosInstanceClient } from '@/utils/clientAxios';
import AppwriteImage from './appwriteImage';
import DeleteButton from './unitcard/DeleteButton';
import { cookies } from 'next/headers';
import IncomeGraph from './landlordDashboard/IncomeGraph';


export async function RentalUnitDashboardComponent({ unit }: any) {
	const allCookies = await cookies();
	const sessionCookie = allCookies.get('session')?.value;
	const { data } = await axiosInstanceClient.get('api/bucket', {
		headers: {
			cookie: `session=${sessionCookie}`,
		},
	});

	const graphData = [
		{ year: '2020', unitIncome: 12000, areaIncome: 15000, forecast: 13000 },
		{ year: '2021', unitIncome: 12500, areaIncome: 15500, forecast: 13500 },
		{ year: '2022', unitIncome: 13000, areaIncome: 16000, forecast: 14000 },
		{ year: '2023', unitIncome: 13500, areaIncome: 16500, forecast: 14500 },
		{ year: '2024', unitIncome: 14000, areaIncome: 17000, forecast: 15000 },
	];

	const incomeData = [
		{ month: 'Jan', income: 10000 },
		{ month: 'Feb', income: 12000 },
		{ month: 'Mar', income: 11000 },
		{ month: 'Apr', income: 13000 },
		{ month: 'May', income: 12500 },
		{ month: 'Jun', income: 13500 },
	];

	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-3xl font-bold mb-6'>{unit.title}</h1>

			<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
				<Card>
					<CardHeader>
						<CardTitle>Enhetsinformasjon</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='space-y-2'>
							<div className='flex items-center'>
								<Home className='mr-2 h-4 w-4' />
								<span>{unit.address}</span>
							</div>
							<div className='flex items-center'>
								<User className='mr-2 h-4 w-4' />
								<span>John Doe (Current Tenant)</span>
							</div>
							<div className='flex items-center'>
								<DollarSign className='mr-2 h-4 w-4' />
								<span>{unit.monthlyrent}NOK / month</span>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Viktige datoer</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='space-y-2'>
							<div className='flex items-center'>
								<CalendarIcon className='mr-2 h-4 w-4' />
								<span>Move-in: 01/01/2024</span>
							</div>
							<div className='flex items-center'>
								<CalendarIcon className='mr-2 h-4 w-4' />
								<span>Lease End: 12/31/2024</span>
							</div>
							<div className='flex items-center'>
								<CalendarIcon className='mr-2 h-4 w-4' />
								<span>Next Inspection: 06/15/2024</span>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Quick Actions</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='space-y-2'>
							<Button className='w-full rounded' variant='outline'>
								<Edit className='mr-2 h-4 w-4' /> Edit Unit
							</Button>
							{/* <Popover>
								<PopoverTrigger asChild>
									<Button variant='outline' className='w-full'>
										<Calendar className='mr-2 h-4 w-4' />
										{date ? format(date, 'PPP') : 'Schedule Event'}
									</Button>
								</PopoverTrigger>
								<PopoverContent className='w-auto p-0'>
									<CalendarComponent
										mode='single'
										selected={date}
										onSelect={setDate}
										initialFocus
									/>
								</PopoverContent>
							</Popover> */}
							<DeleteButton id={unit.$id} redirect={true} />
							{/* <Button className='w-full' variant='destructive'>
									<Trash2 className='mr-2 h-4 w-4' /> Delete Unit
								</Button> */}
						</div>
					</CardContent>
				</Card>
			</div>

			<IncomeGraph data={graphData} />

			<Tabs defaultValue='images' className='w-full'>
				<TabsList>
					<TabsTrigger value='images'>Bilder</TabsTrigger>
					<TabsTrigger value='documents'>Dokumenter</TabsTrigger>
				</TabsList>
				<TabsContent value='images'>
					<Card>
						<CardHeader>
							<CardTitle>Bilder</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
								{data.files.map((file: any) => (
									<AppwriteImage fileId={file.$id} width={300} height={200} />
								))}
							</div>
							<UploadMultipleFiles />
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value='documents'>
					<Card>
						<CardHeader>
							<CardTitle>Dokumenter</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='space-y-4'>
								{[
									'Lease Agreement',
									'Inspection Report',
									'Maintenance Records',
								].map((doc, index) => (
									<div
										key={index}
										className='flex items-center justify-between p-2 bg-muted rounded-lg'>
										<div className='flex items-center'>
											<FileText className='mr-2 h-4 w-4' />
											<span>{doc}</span>
										</div>
										<Button variant='ghost' size='sm'>
											Vis
										</Button>
									</div>
								))}
							</div>
							<UploadFile />
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
			<pre>{JSON.stringify(unit, null, 2)}</pre>
		</div>
	);
}
