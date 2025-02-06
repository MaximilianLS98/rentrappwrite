import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function recentActivity() {
    return (
		<Card key='recent-activity' className='h-full overflow-auto'>
			<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
				<CardTitle className='text-md font-medium'>Nylig Aktivitet</CardTitle>
				<Activity className='h-4 w-4 text-muted-foreground' />
			</CardHeader>
			<CardContent>
				<ScrollArea className='h-[300px]'>
					<ul className='space-y-2'>
						{[
							'Rent received for 123 Main St',
							'Maintenance request for 456 Elm St',
							'New tenant application for 789 Oak St',
							'Lease renewal for 321 Pine St',
							'Property inspection scheduled for 123 Main St',
							'Late rent notice sent for 789 Oak St',
							'Utility bill paid for 456 Elm St',
							'New property listing created for 555 Maple Ave',
						].map((activity, index) => (
							<li key={index} className='text-sm py-2 border-b last:border-b-0'>
								{activity}
							</li>
						))}
					</ul>
				</ScrollArea>
			</CardContent>
		</Card>
	);
}