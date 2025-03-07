'use client';

import type { UseFormReturn } from 'react-hook-form';
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
	Form,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

interface PropertyBasicInfoProps {
	form: UseFormReturn<any>;
}

export function PropertyBasicInfo({ form }: PropertyBasicInfoProps) {
	const propertyTypes = [
		{ value: 'apartment', label: 'Apartment' },
		{ value: 'house', label: 'House' },
		{ value: 'condo', label: 'Condominium' },
		{ value: 'townhouse', label: 'Townhouse' },
		{ value: 'duplex', label: 'Duplex' },
		{ value: 'studio', label: 'Studio' },
		{ value: 'other', label: 'Other' },
	];

	return (
		<div className='space-y-6'>
			<div className='text-lg font-medium'>Basic Property Information</div>

			<Form {...form}>
				<div className='grid gap-4 md:grid-cols-2'>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Property Name</FormLabel>
								<FormControl>
									<Input placeholder='Enter property name' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='type'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Property Type</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Select property type' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{propertyTypes.map((type) => (
											<SelectItem key={type.value} value={type.value}>
												{type.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className='mt-4'>
					<FormField
						control={form.control}
						name='address'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Street Address</FormLabel>
								<FormControl>
									<Input placeholder='Enter street address' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className='mt-4 grid gap-4 md:grid-cols-3'>
					<FormField
						control={form.control}
						name='city'
						render={({ field }) => (
							<FormItem>
								<FormLabel>City</FormLabel>
								<FormControl>
									<Input placeholder='Enter city' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='state'
						render={({ field }) => (
							<FormItem>
								<FormLabel>State</FormLabel>
								<FormControl>
									<Input placeholder='Enter state' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='zipCode'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Zip Code</FormLabel>
								<FormControl>
									<Input placeholder='Enter zip code' {...field} />
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
