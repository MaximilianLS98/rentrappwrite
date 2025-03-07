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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

interface RentalTermsProps {
	form: UseFormReturn<any>;
}

export function RentalTerms({ form }: RentalTermsProps) {
	const leaseTerms = [
		{ value: 'month-to-month', label: 'Month to Month' },
		{ value: '3-month', label: '3 Months' },
		{ value: '6-month', label: '6 Months' },
		{ value: '1-year', label: '1 Year' },
		{ value: '2-year', label: '2 Years' },
		{ value: 'custom', label: 'Custom' },
	];

	const utilities = [
		{ id: 'water', label: 'Water' },
		{ id: 'electricity', label: 'Electricity' },
		{ id: 'gas', label: 'Gas' },
		{ id: 'internet', label: 'Internet' },
		{ id: 'cable', label: 'Cable TV' },
		{ id: 'trash', label: 'Trash' },
		{ id: 'sewer', label: 'Sewer' },
	];

	return (
		<div className='space-y-6'>
			<div className='text-lg font-medium'>Rental Terms</div>

			<Form {...form}>
				<div className='grid gap-4 md:grid-cols-2'>
					<FormField
						control={form.control}
						name='monthlyRent'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Monthly Rent ($)</FormLabel>
								<FormControl>
									<Input
										type='number'
										min={0}
										placeholder='Enter monthly rent'
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
						name='securityDeposit'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Security Deposit ($)</FormLabel>
								<FormControl>
									<Input
										type='number'
										min={0}
										placeholder='Enter security deposit'
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
						name='availableFrom'
						render={({ field }) => (
							<FormItem className='flex flex-col'>
								<FormLabel>Available From</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant={'outline'}
												className={`w-full pl-3 text-left font-normal ${
													!field.value ? 'text-muted-foreground' : ''
												}`}>
												{field.value ? (
													format(field.value, 'PPP')
												) : (
													<span>Pick a date</span>
												)}
												<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className='w-auto p-0' align='start'>
										<Calendar
											mode='single'
											selected={field.value}
											onSelect={field.onChange}
											disabled={(date) => date < new Date()}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='leaseTerm'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Lease Term</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Select lease term' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{leaseTerms.map((term) => (
											<SelectItem key={term.value} value={term.value}>
												{term.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className='mt-6'>
					<FormField
						control={form.control}
						name='petsAllowed'
						render={({ field }) => (
							<FormItem className='flex flex-row items-start space-x-3 space-y-0'>
								<FormControl>
									<Checkbox
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
								<div className='space-y-1 leading-none'>
									<FormLabel>Pets Allowed</FormLabel>
									<FormDescription>
										Check this if pets are allowed in the property
									</FormDescription>
								</div>
							</FormItem>
						)}
					/>
				</div>

				<div className='mt-6'>
					<FormField
						control={form.control}
						name='utilities'
						render={() => (
							<FormItem>
								<div className='mb-4'>
									<FormLabel>Included Utilities</FormLabel>
									<FormDescription>
										Select all utilities that are included in the rent
									</FormDescription>
								</div>
								<div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
									{utilities.map((utility) => (
										<FormField
											key={utility.id}
											control={form.control}
											name='utilities'
											render={({ field }) => {
												return (
													<FormItem
														key={utility.id}
														className='flex flex-row items-start space-x-3 space-y-0'>
														<FormControl>
															<Checkbox
																checked={field.value?.includes(
																	utility.id,
																)}
																onCheckedChange={(checked) => {
																	const currentValues =
																		field.value || [];
																	return checked
																		? field.onChange([
																				...currentValues,
																				utility.id,
																		  ])
																		: field.onChange(
																				currentValues.filter(
																					(
																						value: string,
																					) =>
																						value !==
																						utility.id,
																				),
																		  );
																}}
															/>
														</FormControl>
														<FormLabel className='font-normal'>
															{utility.label}
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
			</Form>
		</div>
	);
}
