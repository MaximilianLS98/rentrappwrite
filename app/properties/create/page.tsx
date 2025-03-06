'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { TProperty } from '@/constants/types/properties';
import { TUnit } from '@/constants/types/units';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import dynamic from 'next/dynamic';
import { toast } from 'sonner';

const RadioGroup = dynamic(
	() => import('@/components/ui/radio-group').then((mod) => mod.RadioGroup),
	{ ssr: false },
);
const RadioGroupItem = dynamic(
	() => import('@/components/ui/radio-group').then((mod) => mod.RadioGroupItem),
	{ ssr: false },
);
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createProperty } from '@/actions/properties';
import { createUnit } from '@/actions/units';
import { Button } from '@/components/ui/button';

export default function () {
	const [property, setProperty] = useState<Partial<TProperty>>({
		name: '',
		address: '',
		postcode: '',
		bedrooms: 0,
		bathrooms: 0,
		type: 'singlehome',
		squaremeters: 0,
		units: [] as TUnit[],
	});
	// const [unit, setUnit] = useState<TUnit>();
	const [unit, setUnit] = useState<Partial<TUnit>>({
		title: '',
		description: '',
		unitNumber: '',
		address: '',
		bedrooms: 0,
		bathrooms: 0,
		squaremeters: 0,
		monthlyrent: 0,
		status: 'vacant',
	});

	// useEffect for setting the property data from local storage into the state, done this way to avoid hydration issues
	useEffect(() => {
		const saved = localStorage.getItem('propertyData');
		console.log(`Window is defined, saved input for unit: ${saved}`);
		if (saved) {
			setProperty(JSON.parse(saved));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('propertyData', JSON.stringify(property));
	}, [property]);

	const handlePropertyChange = (updatedProperty: Partial<TProperty>) => {
		setProperty((prev) => ({ ...prev, ...updatedProperty }));
	};

	const cleanUp = () => {
		console.log(`Cleaning up the property input and local storage`);
		// Clear the local storage
		localStorage.removeItem('propertyData');
		// Clear the property inputs
		setProperty({
			name: '',
			address: '',
			postcode: '',
			bedrooms: 0,
			bathrooms: 0,
			type: 'singlehome',
			squaremeters: 0,
			units: [],
		});
	};

	const submitProperty = async () => {
		try {
			if (property.type === 'singlehome') {
				// set property.units to a unit with the property data
				setProperty((prev) => ({
					...prev,
					units: [
						{
							title: property.name,
							address: property.address,
							bedrooms: property.bedrooms || 0,
							bathrooms: property.bathrooms || 0,
							squaremeters: property.squaremeters || 0,
							unitNumber: '01',
						} as TUnit,
					],
				}));
			}
			const sessionCookie = (await fetch('/api/cookie').then((res) => res.json())) || '';
			console.log(`Session cookie in submitProperty: ${JSON.stringify(sessionCookie)}`);
			// Create the property first
			const result = (await createProperty(sessionCookie.session, property)) as any;
            toast.success('Property created successfully');
			console.log('Property created:', result);

			if (!result?.$id) {
                toast.error('Property creation failed');
				throw new Error('Property creation failed: No ID returned');
			}

			cleanUp();
		} catch (error) {
            toast.error('Error submitting property');
			console.error('Error submitting property:', error);
		}
	};

	const cleanUpUnitForm = () => {
		setUnit({
			address: '',
			title: '',
			unitNumber: '',
			bedrooms: 0,
			bathrooms: 0,
			squaremeters: 0,
		});
	};

	// These three functions works like this: unitChange updates the unit state with the new values, addUnit adds the unit to the property state and resets the unit state, and removeUnit removes the unit from the property state
	const handleAddUnit = (unit: TUnit) => {
		setProperty((prev) => ({ ...prev, units: [...(prev.units || []), unit] }));
		cleanUpUnitForm();
	};
	const handleUnitChange = (unit: Partial<TUnit>) => {
		setUnit((prev: Partial<TUnit>) => ({ ...prev, ...unit }));
	};
	const handleRemoveUnit = (id: string) => {
		setProperty((prev) => ({
			...prev,
			units: prev.units?.filter((unit) => unit.$id !== id),
		}));
	};

	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-3xl font-bold mb-6'>Registrer ny eiendom</h1>
			<div className='flex flex-col lg:flex-row gap-8'>
				<div className='w-full lg:w-1/2'>
					<div className='space-y-4'>
						<form action={submitProperty}>
							<div>
								<Label htmlFor='title'>Navn på eiendommen</Label>
								<Input
									id='title'
									value={property.name}
									onChange={(e) => handlePropertyChange({ name: e.target.value })}
								/>
							</div>
							<div className='flex gap-4 w-full'>
								<div className='flex-[1_0_auto]'>
									<Label htmlFor='address'>Adresse</Label>
									<Input
										id='address'
										value={property.address}
										onChange={(e) =>
											handlePropertyChange({ address: e.target.value })
										}
									/>
								</div>
								<div>
									<Label htmlFor='postcode'>Postkode</Label>
									<Input
										id='postcode'
										value={property.postcode as string}
										onChange={(e) =>
											handlePropertyChange({ postcode: e.target.value })
										}
									/>
								</div>
							</div>
							<div>
								<Label htmlFor='title'>Kvadratmeter</Label>
								<Input
									id='squaremeters'
									value={property.squaremeters as number}
									type='number'
									onChange={(e) =>
										handlePropertyChange({
											squaremeters: parseInt(e.target.value),
										})
									}
								/>
							</div>
							<div className='flex gap-4'>
								<div className='flex-1'>
									<Label htmlFor='bathrooms'>Antall baderom</Label>
									<Input
										id='bathrooms'
										value={property.bathrooms as number}
										type='number'
										onChange={(e) =>
											handlePropertyChange({
												bathrooms: parseInt(e.target.value),
											})
										}
									/>
								</div>
								<div className='flex-1'>
									<Label htmlFor='bedrooms'>Antall soverom</Label>
									<Input
										id='bedrooms'
										value={property.bedrooms as number}
										type='number'
										onChange={(e) =>
											handlePropertyChange({
												bedrooms: parseInt(e.target.value),
											})
										}
									/>
								</div>
							</div>
							<div>
								<Label>Property Type</Label>
								<RadioGroup
									value={property.type}
									onValueChange={(value) =>
										handlePropertyChange({ type: value } as {
											type: 'singlehome' | 'multiunit';
										})
									}>
									<div className='flex items-center space-x-2'>
										<RadioGroupItem value='singlehome' id='single' />
										<Label htmlFor='single'>Enkel enhet</Label>
									</div>
									<div className='flex items-center space-x-2'>
										<RadioGroupItem value='multiunit' id='multi' />
										<Label htmlFor='multi'>Multi Enhet</Label>
									</div>
								</RadioGroup>
							</div>
							{property.type === 'multiunit' && (
								<div className='mt-8'>
									<h2 className='text-xl font-bold'>
										Legg til enheter i eiendommen
									</h2>
									<p className='text-muted-foreground tex-sm'>
										Dette kan også gjøres senere i oversikten
									</p>
									<div className='grid gap-4'>
										<div>
											<div>
												<Label htmlFor='title'>Tittel</Label>
												<Input
													id='title'
													value={unit.title}
													onChange={(e) =>
														handleUnitChange({
															...unit,
															title: e.target.value || '',
														})
													}
												/>
											</div>
											<div>
												<Label htmlFor='address'>Address</Label>
												<Input
													id='address'
													value={unit.address}
													onChange={(e) =>
														handleUnitChange({
															...unit,
															address: e.target.value || '',
														})
													}
												/>
											</div>
											<div>
												<Label htmlFor='unitnumber'>Enhetsnummer</Label>
												<Input
													id='unitnumber'
													value={unit.unitNumber}
													onChange={(e) =>
														handleUnitChange({
															...unit,
															unitNumber: e.target.value || '',
														})
													}
												/>
											</div>
											<div>
												<Label htmlFor='bedrooms'>Bedrooms</Label>
												<Input
													id='bedrooms'
													value={unit.bedrooms}
													onChange={(e) =>
														handleUnitChange({
															...unit,
															bedrooms: parseInt(e.target.value) || 0,
														})
													}
												/>
											</div>
											<div>
												<Label htmlFor='bathrooms'>Bathrooms</Label>
												<Input
													id='bathrooms'
													value={unit.bathrooms}
													onChange={(e) =>
														handleUnitChange({
															...unit,
															bathrooms:
																parseInt(e.target.value) || 0,
														})
													}
												/>
											</div>
											<div>
												<Label htmlFor='squaremeters'>Square Meters</Label>
												<Input
													id='squaremeters'
													value={unit.squaremeters}
													onChange={(e) =>
														handleUnitChange({
															...unit,
															squaremeters:
																parseInt(e.target.value) || 0,
														})
													}
												/>
											</div>
											<Button
												className='my-4'
												type='button'
												onClick={() => handleAddUnit(unit as TUnit)}>
												Legg til enhet
											</Button>
										</div>
									</div>
								</div>
							)}
							<Button className='my-4'>Opprett eiendom</Button>
						</form>
					</div>
				</div>
				<div className='w-full lg:w-1/2'>
					<Card>
						<CardHeader>
							<CardTitle>Property Preview</CardTitle>
						</CardHeader>
						<CardContent>
							<h2 className='text-2xl font-bold'>
								{property.name || 'Unnamed Property'}
							</h2>
							<p className='text-muted-foreground'>
								{property.address || 'No address provided'}
							</p>
							<p className='mt-2'>
								Type:{' '}
								{property.type === 'singlehome' ? 'Single Unit' : 'Multi Unit'}
							</p>
							{property.units && property.units.length > 0 && (
								<div className='mt-4'>
									<h3 className='text-xl font-semibold'>Units</h3>
									<ul className='list-disc list-inside'>
										{property.units.map((unit) => (
											<li key={unit.title}>
												Unit {unit.address}: {unit.bedrooms} bed,{' '}
												{unit.bathrooms} bath, {unit.squaremeters} sqft
											</li>
										))}
									</ul>
								</div>
							)}
						</CardContent>
						<pre>{JSON.stringify(property.units, null, 2)}</pre>
					</Card>
				</div>
			</div>
		</div>
	);
}
