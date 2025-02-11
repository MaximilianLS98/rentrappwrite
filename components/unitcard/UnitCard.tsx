import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DeleteButton from './DeleteButton';
import { Search, Sliders, Bed, Bath, Home, DollarSign, Star, ListCollapse } from 'lucide-react';
import Link from 'next/link';
import PlaceholderImage from '@/public/placeholder.png';
import Image from 'next/image';

type Props = {
	unit: any;
	setUnits?: any;
};

export default function UnitCard(props: Props) {
	return (
		<Card key={props.unit.id} className='overflow-hidden'>
			<CardHeader className='p-0'>
				{/* <img
                    src={`/placeholder.svg?height=200&width=400&text=${encodeURIComponent(
                        unit.title,
                    )}`}
                    alt={unit.title}
                    className='w-full h-48 object-cover'
                /> */}
				<Image
					// src={`https://picsum.photos/200`}
					src={PlaceholderImage}
					alt={props.unit.title}
					className='w-full h-48 object-cover'
				/>
			</CardHeader>
			<CardContent className='p-4 bg-card'>
				<CardTitle className='text-lg mb-2'>
					{props.unit.title} - {props.unit.squaremeters}m<sup>2</sup>
				</CardTitle>
				<div className='flex items-center text-sm text-muted-foreground mb-2'>
					<DollarSign size={16} className='mr-1' />
					<span className='font-semibold'>NOK{props.unit.monthlyrent}</span> / måneden
				</div>
				<div className='flex items-center justify-between text-sm text-muted-foreground text-gray-500'>
					<div className='flex items-center'>
						<Bed size={16} className='mr-1' />
						<span>{props.unit.bedrooms} soverom</span>
					</div>
					<div className='flex items-center'>
						<Bath size={16} className='mr-1' />
						<span>{props.unit.bathrooms} bad</span>
					</div>
					<div className='flex items-center'>
						<Home size={16} className='mr-1' />
						<span>{props.unit.squaremeters} sqm</span>
					</div>
				</div>
			</CardContent>
			<CardFooter className='bg-card px-4 py-2 flex justify-between items-center'>
				<div className='flex items-center'>
					<Star className='text-yellow-400 mr-1' size={16} />
					<span className='text-sm font-semibold'>{props.unit.rating}</span>
				</div>
				<div className='flex gap-2'>
                    <Link href={`/units/${props.unit.$id}`} className='min-h-full'>
					<Button className='rounded w-full' variant={'default'}>
						<ListCollapse size={16} className='mr-1' />
						Se detaljer
					</Button>
                    </Link>
					<DeleteButton id={props.unit.$id} />
				</div>
			</CardFooter>
			{/* <pre>{JSON.stringify(unit, null, 2)}</pre> */}
		</Card>
	);
}
