'use client';

import { useState } from 'react';
import { Search, Sliders, Bed, Bath, Home, DollarSign, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

// Placeholder data for rental units
const rentalUnits = [
	{
		id: 1,
		title: 'Modern Downtown Loft',
		price: 2500,
		bedrooms: 2,
		bathrooms: 2,
		sqft: 1200,
		rating: 4.5,
	},
	{
		id: 2,
		title: 'Cozy Suburban House',
		price: 1800,
		bedrooms: 3,
		bathrooms: 2,
		sqft: 1500,
		rating: 4.2,
	},
	{
		id: 3,
		title: 'Luxury Beachfront Condo',
		price: 3500,
		bedrooms: 3,
		bathrooms: 3,
		sqft: 2000,
		rating: 4.8,
	},
	{
		id: 4,
		title: 'Charming Studio Apartment',
		price: 1200,
		bedrooms: 1,
		bathrooms: 1,
		sqft: 500,
		rating: 4.0,
	},
	{
		id: 5,
		title: 'Spacious Family Home',
		price: 2800,
		bedrooms: 4,
		bathrooms: 3,
		sqft: 2200,
		rating: 4.6,
	},
	{
		id: 6,
		title: 'Urban Micro-Apartment',
		price: 1500,
		bedrooms: 1,
		bathrooms: 1,
		sqft: 400,
		rating: 4.3,
	},
];

export function RentalMarketplaceComponent() {
	const [searchTerm, setSearchTerm] = useState('');
	const [priceRange, setPriceRange] = useState([0, 5000]);
	const [bedrooms, setBedrooms] = useState('any');
	const [propertyType, setPropertyType] = useState('any');

	const filteredUnits = rentalUnits.filter(
		(unit) =>
			unit.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
			unit.price >= priceRange[0] &&
			unit.price <= priceRange[1] &&
			(bedrooms === 'any' || unit.bedrooms.toString() === bedrooms) &&
			(propertyType === 'any' ||
				unit.title.toLowerCase().includes(propertyType.toLowerCase())),
	);

	return (
		<main className='container mx-auto px-4 sm:px-6 lg:px-8 py-8'>
			<div className='flex flex-col md:flex-row gap-8'>
				<aside className='w-full md:w-64 bg-secondary p-6 rounded-lg shadow-sm'>
					<h2 className='text-lg font-semibold mb-4 flex items-center'>
						<Sliders className='mr-2' size={20} /> Filters
					</h2>
					<div className='relative w-full max-w-xs my-4'>
						<Input
							type='text'
							placeholder='Search rentals...'
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className='pl-10'
						/>
						<Search
							className='absolute left-3 top-1/2 transform -translate-y-1/2'
							size={20}
						/>
					</div>
					<div className='space-y-6'>
						<div>
							<Label htmlFor='price-range'>Price Range</Label>
							<Slider
								id='price-range'
								min={0}
								max={5000}
								step={100}
								value={priceRange}
								onValueChange={setPriceRange}
								className='mt-2'
							/>
							<div className='flex justify-between text-sm text-gray-500 mt-1'>
								<span>${priceRange[0]}</span>
								<span>${priceRange[1]}</span>
							</div>
						</div>
						<div>
							<Label htmlFor='bedrooms'>Bedrooms</Label>
							<Select value={bedrooms} onValueChange={setBedrooms}>
								<SelectTrigger id='bedrooms'>
									<SelectValue placeholder='Any' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='any'>Any</SelectItem>
									<SelectItem value='1'>1</SelectItem>
									<SelectItem value='2'>2</SelectItem>
									<SelectItem value='3'>3</SelectItem>
									<SelectItem value='4'>4+</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div>
							<Label htmlFor='property-type'>Property Type</Label>
							<Select value={propertyType} onValueChange={setPropertyType}>
								<SelectTrigger id='property-type'>
									<SelectValue placeholder='Any' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='any'>Any</SelectItem>
									<SelectItem value='apartment'>Apartment</SelectItem>
									<SelectItem value='house'>House</SelectItem>
									<SelectItem value='condo'>Condo</SelectItem>
									<SelectItem value='loft'>Loft</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
				</aside>

				<section className='flex-1'>
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
						{filteredUnits.map((unit) => (
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
									<CardTitle className='text-lg mb-2'>{unit.title}</CardTitle>
									<div className='flex items-center text-sm text-muted-foreground mb-2'>
										<DollarSign size={16} className='mr-1' />
										<span className='font-semibold'>${unit.price}</span> / month
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
											<span>{unit.sqft} sqft</span>
										</div>
									</div>
								</CardContent>
								<CardFooter className='bg-secondary px-4 py-2 flex justify-between items-center'>
									<div className='flex items-center'>
										<Star className='text-yellow-400 mr-1' size={16} />
										<span className='text-sm font-semibold'>{unit.rating}</span>
									</div>
									<Button variant={'default'} size='sm'>
										View Details
									</Button>
								</CardFooter>
							</Card>
						))}
					</div>
				</section>
			</div>
		</main>
	);
}
