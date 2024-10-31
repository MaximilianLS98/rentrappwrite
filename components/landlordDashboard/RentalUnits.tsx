import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Home, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle, } from "../ui/card";
import { DialogHeader } from "../ui/dialog";

interface RentalUnit {
    address: string;
    status: string;
    rent: number;
    tenant: string;
}

type RentalUnitsProps = {
    rentalUnits: RentalUnit[];
}

export default function RentalUnits(props: RentalUnitsProps) {
    return (
		<Card key='rental-units' className='h-full overflow-hidden'>
			<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
				<CardTitle className='text-md font-medium'>Rental Units</CardTitle>
				<Home className='h-4 w-4 text-muted-foreground' />
			</CardHeader>
			<CardContent className='px-0'>
				<ScrollArea className='h-[300px]'>
					{props.rentalUnits.map((unit) => (
						<Dialog key={unit.address}>
							<DialogTrigger className="no-drag" asChild>
								<Button
									variant='ghost'
									className='w-full justify-start rounded-none px-6 py-3 font-normal hover:bg-accent'>
									<div className='flex w-full items-center justify-between'>
										<div className='flex flex-col items-start'>
											<span className='font-medium'>{unit.address}</span>
											<span
												className={`text-sm ${
													unit.status === 'Occupied'
														? 'text-green-600'
														: 'text-red-600'
												}`}>
												{unit.status}
											</span>
										</div>
										<ChevronRight className='h-4 w-4' />
									</div>
								</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>{unit.address}</DialogTitle>
								</DialogHeader>
								<div className='grid gap-4 py-4'>
									<div className='grid grid-cols-2 items-center gap-4'>
										<span className='font-medium'>Status:</span>
										<span
											className={
												unit.status === 'Occupied'
													? 'text-green-600'
													: 'text-red-600'
											}>
											{unit.status}
										</span>
									</div>
									<div className='grid grid-cols-2 items-center gap-4'>
										<span className='font-medium'>Rent:</span>
										<span>${unit.rent}</span>
									</div>
									<div className='grid grid-cols-2 items-center gap-4'>
										<span className='font-medium'>Tenant:</span>
										<span>{unit.tenant || 'N/A'}</span>
									</div>
								</div>
							</DialogContent>
						</Dialog>
					))}
				</ScrollArea>
			</CardContent>
		</Card>
	);
}