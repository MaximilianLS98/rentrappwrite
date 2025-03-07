'use client';

import type { UseFormReturn } from 'react-hook-form';
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
	FormDescription,
	Form,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

interface PropertyDetailsProps {
	form: UseFormReturn<any>;
}

export function PropertyDetails({ form }: PropertyDetailsProps) {
	const amenities = [
		{ id: 'parking', label: 'Parking' },
		{ id: 'pool', label: 'Swimming Pool' },
		{ id: 'gym', label: 'Fitness Center' },
		{ id: 'ac', label: 'Air Conditioning' },
		{ id: 'laundry', label: 'In-unit Laundry' },
		{ id: 'dishwasher', label: 'Dishwasher' },
		{ id: 'balcony', label: 'Balcony/Patio' },
		{ id: 'furnished', label: 'Furnished' },
	];

	return (
		<div className='space-y-6'>
			<div className='text-lg font-medium'>Property Details</div>

			<Form {...form}>
				<div className='grid gap-4 md:grid-cols-2'>
					<FormField
						control={form.control}
						name='bedrooms'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Bedrooms</FormLabel>
								<FormControl>
									<Input
										type='number'
										min={0}
										placeholder='Number of bedrooms'
										{...field}
										onChange={(e) => field.onChange(Number(e.target.value))}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='bathrooms'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Bathrooms</FormLabel>
								<FormControl>
									<Input
										type='number'
										min={0}
										step={0.5}
										placeholder='Number of bathrooms'
										{...field}
										onChange={(e) => field.onChange(Number(e.target.value))}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className='mt-4 grid gap-4 md:grid-cols-2'>
					<FormField
						control={form.control}
						name='squareFeet'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Square Feet</FormLabel>
								<FormControl>
									<Input
										type='number'
										min={0}
										placeholder='Property size in sq ft'
										{...field}
										onChange={(e) => field.onChange(Number(e.target.value))}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='yearBuilt'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Year Built</FormLabel>
								<FormControl>
									<Input
										type='number'
										min={1800}
										max={new Date().getFullYear()}
										placeholder='Year property was built'
										{...field}
										onChange={(e) => field.onChange(Number(e.target.value))}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className='mt-6'>
					<FormField
						control={form.control}
						name='amenities'
						render={() => (
							<FormItem>
								<div className='mb-4'>
									<FormLabel>Amenities</FormLabel>
									<FormDescription>
										Select all amenities that apply to this property
									</FormDescription>
								</div>
								<div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
									{amenities.map((amenity) => (
										<FormField
											key={amenity.id}
											control={form.control}
											name='amenities'
											render={({ field }) => {
												return (
													<FormItem
														key={amenity.id}
														className='flex flex-row items-start space-x-3 space-y-0'>
														<FormControl>
															<Checkbox
																checked={field.value?.includes(
																	amenity.id,
																)}
																onCheckedChange={(checked) => {
																	const currentValues =
																		field.value || [];
																	return checked
																		? field.onChange([
																				...currentValues,
																				amenity.id,
																		  ])
																		: field.onChange(
																				currentValues.filter(
																					(
																						value: string,
																					) =>
																						value !==
																						amenity.id,
																				),
																		  );
																}}
															/>
														</FormControl>
														<FormLabel className='font-normal'>
															{amenity.label}
														</FormLabel>
													</FormItem>
												);
											}}
										/>
									))}
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className='mt-6'>
					<FormField
						control={form.control}
						name='description'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Property Description</FormLabel>
								<FormControl>
									<Textarea
										placeholder='Enter a detailed description of the property'
										className='resize-none'
										rows={4}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			</Form>
		</div>
	);
}
