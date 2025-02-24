import { ScrollArea } from '@radix-ui/react-scroll-area';
import { Home, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import Link from 'next/link';
import { TUnit } from '@/constants/types/units';
import { translateOccupancyStatus } from '@/utils/helpers';

type RentalUnitsProps = {
	rentalUnits: TUnit[];
};

export default function RentalUnits(props: RentalUnitsProps) {
	return (
		<Card key='rental-units' className='h-full overflow-auto'>
			<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
				<CardTitle className='text-md font-medium'>Enheter</CardTitle>
				<Link href='/units'>
				<Home className='h-4 w-4 text-muted-foreground hover:bg-muted no-drag' />
				</Link>
			</CardHeader>
			<CardContent className='px-0'>
				{/* <ScrollArea className='h-[300px]'> */}
				<ScrollArea className='h-auto'>
					{props.rentalUnits.map((unit) => (
						<Link key={unit.title} href={`units/${unit.$id}`}>
							<div className='no-drag'>
								<Button
									variant='ghost'
									className='w-full justify-start rounded-none px-6 py-3 font-normal hover:bg-accent'>
									<div className='flex w-full items-center justify-between'>
										<div className='flex flex-col items-start'>
											<span className='font-medium'>{typeof unit.properties === 'string' ? unit.properties : unit.properties?.name } - {unit.title}</span>
											<span
												className={`text-sm ${
													unit.status === 'occupied'
														? 'text-green-600'
														: 'text-red-600'
												}`}>
												{translateOccupancyStatus(unit.status)}
											</span>
										</div>
										<ChevronRight className='h-4 w-4' />
									</div>
								</Button>
							</div>
						</Link>
					))}
				</ScrollArea>
			</CardContent>
			<CardFooter className=''>
				<Button asChild variant='outline' className='w-full no-drag'>
					<Link href='/units/create'>Legg til enhet</Link>
				</Button>
			</CardFooter>
		</Card>
	);
}
