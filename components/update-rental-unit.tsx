'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { axiosInstanceClient } from '@/utils/clientAxios';
import { X } from 'lucide-react';
import { AxiosResponse } from 'axios';

interface UnitImage {
	file: File;
	preview: string;
}

export function UpdateRentalUnitComponent(props: any) {
	const router = useRouter();
	const { toast } = useToast();
	// const session = getCookie('session');
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [images, setImages] = useState<UnitImage[]>([]);
	const [unit, setUnit] = useState({
		title: props.title,
		housingtype: props.housingtype,
		bedrooms: props.bedrooms,
		bathrooms: props.bathrooms,
		squaremeters: props.squaremeters,
		address: props.address,
		monthlyrent: props.monthlyrent,
		description: props.description,
        $id: props.$id,
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setUnit({ ...unit, [e.target.name]: e.target.value });
	};

	const handleSelectChange = (value: string, name: string) => {
		setUnit({ ...unit, [name]: value });
	};

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || []);
		const newImages: UnitImage[] = files.map((file) => ({
			file,
			preview: URL.createObjectURL(file),
		}));
		setImages([...images, ...newImages]);
	};

	const removeImage = (index: number) => {
		const newImages = [...images];
		URL.revokeObjectURL(newImages[index].preview);
		newImages.splice(index, 1);
		setImages(newImages);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const formData = new FormData();

		Object.entries(unit).forEach(([key, value]) => {
			console.log(`Key: ${key}, Value: ${value} in create-rental-unit handleSubmit`);
			formData.append(key, value.toString());
			console.log(
				`Full formData in create-rental-unit: ${JSON.stringify(
					formData.entries(),
				)} after appending key value pair`,
			);
		});

		// images.forEach((image, index) => {
		// 	formData.append(`image${index}`, image.file);
		// });
		// console.log(
		// 	`Form data in create-rental-unit: ${JSON.stringify(
		// 		formData,
		// 	)} but before try catch block`,
		// );

		try {
			// console.log(
			// 	`Form data in create-rental-unit: ${JSON.stringify(formData.get('title'))}`,
			// );
			const response = await fetch('/api/units', {
				method: 'PUT',
				body: formData,
			});
			if (response.status === 200) {
				toast({
					title: 'Success',
					description: 'Rental unit updated successfully',
				});
				router.push('/units');
				router.refresh();
			} else {
				throw new Error('Failed to update rental unit');
			}
		} catch (error) {
			toast({
				title: 'Error',
				description: 'Failed to update rental unit',
				variant: 'destructive',
			});
		}
	};

	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-2xl font-bold mb-6'>Rediger enhet</h1>
			<div className='flex flex-col lg:flex-row gap-6'>
				<form onSubmit={handleSubmit} className='space-y-4 flex-1'>
					<div>
						<Label htmlFor='title'>Tittel</Label>
						<Input
							id='title'
							name='title'
							value={unit.title}
							onChange={handleChange}
							required
						/>
					</div>
					<div>
						<Label htmlFor='housingtype'>Type enhet</Label>
						<Select
							name='housingtype'
							value={unit.housingtype}
							onValueChange={(value) => handleSelectChange(value, 'housingtype')}>
							<SelectTrigger>
								<SelectValue placeholder='Select unit type' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='apartment'>Leilighet</SelectItem>
								<SelectItem value='house'>Enebolig</SelectItem>
								<SelectItem value='condo'>Condo</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className='flex gap-4'>
						<div className='flex-1'>
							<Label htmlFor='bedrooms'>Soverom</Label>
							<Input
								id='bedrooms'
								name='bedrooms'
								type='number'
								value={unit.bedrooms}
								onChange={handleChange}
								required
							/>
						</div>
						<div className='flex-1'>
							<Label htmlFor='bathrooms'>Bad</Label>
							<Input
								id='bathrooms'
								name='bathrooms'
								type='number'
								value={unit.bathrooms}
								onChange={handleChange}
								required
							/>
						</div>
					</div>
					<div>
						<Label htmlFor='squaremeters'>Kvadratmeter</Label>
						<Input
							id='squaremeters'
							name='squaremeters'
							type='number'
							value={unit.squaremeters}
							onChange={handleChange}
							required
						/>
					</div>
					<div>
						<Label htmlFor='address'>Adresse</Label>
						<Input
							id='address'
							name='address'
							value={unit.address}
							onChange={handleChange}
							required
						/>
					</div>
					<div>
						<Label htmlFor='monthlyrent'>Månedlig leie</Label>
						<Input
							id='monthlyrent'
							name='monthlyrent'
							type='number'
							value={unit.monthlyrent}
							onChange={handleChange}
							required
						/>
					</div>
					<div>
						<Label htmlFor='description'>Beskrivelse</Label>
						<Textarea
							id='description'
							name='description'
							value={unit.description}
							onChange={handleChange}
							rows={4}
						/>
					</div>
					<div>
						<Label htmlFor='images'>Bilder</Label>
						<Input
							id='images'
							type='file'
							accept='image/*'
							multiple
							onChange={handleImageUpload}
							className='hidden'
							ref={fileInputRef}
						/>
						<Button
							type='button'
							variant='outline'
							onClick={() => fileInputRef.current?.click()}
							className='w-full rounded'>
							Last opp bilder
						</Button>
					</div>
					{images.length > 0 && (
						<div className='grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4'>
							{images.map((image, index) => {
								if (index > 5) return null;
								return (
									<div key={index} className='relative'>
										<img
											src={image.preview}
											alt={`Unit preview ${index + 1}`}
											className='w-full h-32 object-contain rounded-md'
										/>
										<button
											type='button'
											onClick={() => removeImage(index)}
											className='absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1'
											aria-label={`Remove image ${index + 1}`}>
											<X size={16} />
										</button>
									</div>
								);
							})}
							{images.length > 6 && (
								<p className='text-sm text-muted-foreground mt-2'>
									+ {images.length - 6}{' '}
									{images.length - 6 === 1 ? 'bilde' : 'bilder'} valgt for
									opplastning
								</p>
							)}
						</div>
					)}
					<Button type='submit' className='w-full rounded'>
						Oppdater enhet
					</Button>
				</form>

				<Card className='flex-1 lg:max-w-[50%]'>
					<CardHeader>
						<CardTitle>Forhåndsvisning av Enhet</CardTitle>
					</CardHeader>
					<CardContent>
						<h2 className='text-xl font-semibold mb-2'>{unit.title || 'Unit Title'}</h2>
						{images.length > 0 && (
							<div className='mb-4'>
								<img
									src={images[0].preview}
									alt='Primary unit image'
									className='w-full h-56 object-cover rounded-md'
								/>
							</div>
						)}
						<p className='text-muted-foreground mb-2'>
							{unit.housingtype.charAt(0).toUpperCase() + unit.housingtype.slice(1)}
						</p>
						<p className='mb-2'>
							{unit.bedrooms} Soverom • {unit.bathrooms} Bad • {unit.squaremeters} kvm
						</p>
						<p className='mb-2'>{unit.address}</p>
						<p className='text-lg font-bold mb-2'>{unit.monthlyrent}NOK/måneden</p>
						<p className='text-sm text-muted-foreground'>{unit.description}</p>
						{/* <pre>{JSON.stringify(unit, null, 2)}</pre> */}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
