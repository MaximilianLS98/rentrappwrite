import { Calendar } from '@/components/ui/calendar';
import { Settings, Calendar as CalendarIcon, Image } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';

export default function ImportantDates() {
	return (
		<Card key='important-dates' className='h-full overflow-auto'>
			<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
				<CardTitle className='text-md font-medium'>Important Dates</CardTitle>
				<CalendarIcon className='h-4 w-4 text-muted-foreground' />
			</CardHeader>
			<CardContent>
				<Calendar className='w-full' />
			</CardContent>
		</Card>
	);
}
