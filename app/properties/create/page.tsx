'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
// import { cookies } from 'next/headers';
import { TProperty } from '@/constants/types/properties';
import { TUnit } from '@/constants/types/units';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import dynamic from 'next/dynamic';

const RadioGroup = dynamic(() => import('@/components/ui/radio-group').then(mod => mod.RadioGroup), { ssr: false });
const RadioGroupItem = dynamic(() => import('@/components/ui/radio-group').then(mod => mod.RadioGroupItem), { ssr: false });
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createProperty } from '@/actions/properties';
import { Button } from '@/components/ui/button';

export default function () {
	const [property, setProperty] = useState<Partial<TProperty>>({
			name: '',
			address: '',
			type: 'singlehome',
			units: [] as TUnit[],
        });

    // useEffect for setting the property data from local storage into the state, done this way to avoid hydration issues
    useEffect(() => {
        const saved = localStorage.getItem('propertyData');
        console.log(`Window is defined, saved input for unit: ${saved}`);
        if (saved) {
            setProperty(JSON.parse(saved));
        }
    }
    , []);

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
			type: 'singlehome',
			units: [],
		});
	};

	const submitProperty = async () => {
		const sessionCookie = (await fetch('/api/cookie').then((res) => res.json())) || '';
		console.log(`Session cookie in submitProperty: ${JSON.stringify(sessionCookie)}`);
		const result = await createProperty(sessionCookie.session, property);
		console.log(result);
		cleanUp();
	};

	// ! This needs to be heavily modified, because the units should be POST'ed to the units collection when the property is created/POST'ed
	const handleAddUnit = (unit: TUnit) => {
		setProperty((prev) => ({
			...prev,
			units: [...(prev.units || []), unit],
		}));
	};
	const handleRemoveUnit = (id: string) => {
		setProperty((prev) => ({
			...prev,
			units: prev.units ? prev.units.filter((unit) => unit.$id !== id) : [],
		}));
	};
	// ! This needs to be heavily modified, because the units should be POST'ed to the units collection when the property is created/POST'ed

	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-3xl font-bold mb-6'>Registrer ny eiendom</h1>
			<div className='flex flex-col lg:flex-row gap-8'>
				<div className='w-full lg:w-1/2'>
					<h1>Section 1</h1>
					<div className='space-y-4'>
						<form action={submitProperty}>
							<div>
								<Label htmlFor='name'>Property Name</Label>
								<Input
									id='name'
									value={property.name}
									onChange={(e) => handlePropertyChange({ name: e.target.value })}
								/>
							</div>
							<div>
								<Label htmlFor='address'>Address</Label>
								<Input
									id='address'
									value={property.address}
									onChange={(e) =>
										handlePropertyChange({ address: e.target.value })
									}
								/>
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
							<Button className='my-4'>
								Create Property
							</Button>
						</form>
					</div>
				</div>
				<div className='w-full lg:w-1/2'>
					<h1>Section 2</h1>
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
											<li key={unit.$id}>
												Unit {unit.address}: {unit.bedrooms} bed,{' '}
												{unit.bathrooms} bath, {unit.squaremeters} sqft
											</li>
										))}
									</ul>
								</div>
							)}
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
