import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DeleteButton from './DeleteButton';
import { Search, Sliders, Bed, Bath, Home, DollarSign, Star } from 'lucide-react';
import Link from 'next/link';


export default function UnitCard({ unit, setUnits }: any) {
	return (
		<Card key={unit.id} className='overflow-hidden'>
			<CardHeader className='p-0'>
				{/* <img
                    src={`/placeholder.svg?height=200&width=400&text=${encodeURIComponent(
                        unit.title,
                    )}`}
                    alt={unit.title}
                    className='w-full h-48 object-cover'
                /> */}
				<img
					src={`https://picsum.photos/200`}
					alt={unit.title}
					className='w-full h-48 object-cover'
				/>
			</CardHeader>
			<CardContent className='p-4 bg-muted'>
				<CardTitle className='text-lg mb-2'>
					{unit.title} - {unit.squaremeters}m<sup>2</sup>
				</CardTitle>
				<div className='flex items-center text-sm text-muted-foreground mb-2'>
					<DollarSign size={16} className='mr-1' />
					<span className='font-semibold'>${unit.monthlyrent}</span> / month
				</div>
				<div className='flex items-center justify-between text-sm text-muted-foreground text-gray-500'>
					<div className='flex items-center'>
						<Bed size={16} className='mr-1' />
						<span>{unit.bedrooms} bed</span>
					</div>
					<div className='flex items-center'>
						<Bath size={16} className='mr-1' />
						<span>{unit.bathrooms} bath</span>
					</div>
					<div className='flex items-center'>
						<Home size={16} className='mr-1' />
						<span>{unit.squaremeters} sqm</span>
					</div>
				</div>
			</CardContent>
			<CardFooter className='bg-secondary px-4 py-2 flex justify-between items-center'>
				<div className='flex items-center'>
					<Star className='text-yellow-400 mr-1' size={16} />
					<span className='text-sm font-semibold'>{unit.rating}</span>
				</div>
				<div className='flex gap-2'>
                    <Link href={`/units/${unit.$id}`}>
					<Button variant={'default'} size='sm'>
						View Details
					</Button>
                    </Link>
					<DeleteButton id={unit.$id} setUnits={setUnits} />
				</div>
			</CardFooter>
			{/* <pre>{JSON.stringify(unit, null, 2)}</pre> */}
		</Card>
	);
}
