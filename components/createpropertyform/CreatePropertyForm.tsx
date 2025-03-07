'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { PropertyBasicInfo } from './steps/property-basic-info';
import { PropertyDetails } from './steps/property-details';
import { RentalTerms } from './steps/rental-terms';
import { StepIndicator } from './StepIndicator';

// Define the schema for the entire form
const formSchema = z.object({
	// Step 1: Basic Info
	name: z.string().min(2, { message: 'Property name must be at least 2 characters.' }),
	type: z.string().min(1, { message: 'Property type is required.' }),
	address: z.string().min(5, { message: 'Address must be at least 5 characters.' }),
	city: z.string().min(1, { message: 'City is required.' }),
	state: z.string().min(1, { message: 'State is required.' }),
	zipCode: z.string().min(5, { message: 'Zip code must be at least 5 characters.' }),

	// Step 2: Property Details
	bedrooms: z.number().min(0, { message: 'Number of bedrooms must be 0 or greater.' }),
	bathrooms: z.number().min(0, { message: 'Number of bathrooms must be 0 or greater.' }),
	squareFeet: z.number().min(1, { message: 'Square feet must be greater than 0.' }),
	yearBuilt: z
		.number()
		.min(1800, { message: 'Year built must be 1800 or later.' })
		.max(new Date().getFullYear(), { message: 'Year built cannot be in the future.' }),
	amenities: z.array(z.string()).optional(),
	description: z.string().optional(),

	// Step 3: Rental Terms
	monthlyRent: z.number().min(1, { message: 'Monthly rent must be greater than 0.' }),
	securityDeposit: z.number().min(0, { message: 'Security deposit must be 0 or greater.' }),
	availableFrom: z.date(),
	leaseTerm: z.string().min(1, { message: 'Lease term is required.' }),
	petsAllowed: z.boolean().optional(),
	utilities: z.array(z.string()).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreatePropertyForm() {
	const [step, setStep] = useState(1);
	const totalSteps = 3;

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			type: '',
			address: '',
			city: '',
			state: '',
			zipCode: '',
			bedrooms: 1,
			bathrooms: 1,
			squareFeet: 0,
			yearBuilt: 2000,
			amenities: [],
			description: '',
			monthlyRent: 0,
			securityDeposit: 0,
			availableFrom: new Date(),
			leaseTerm: '',
			petsAllowed: false,
			utilities: [],
		},
		mode: 'onChange',
	});

	const nextStep = async () => {
		let fieldsToValidate: string[] = [];

		// Determine which fields to validate based on current step
		if (step === 1) {
			fieldsToValidate = ['name', 'type', 'address', 'city', 'state', 'zipCode'];
		} else if (step === 2) {
			fieldsToValidate = ['bedrooms', 'bathrooms', 'squareFeet', 'yearBuilt'];
		}

		// Validate the fields for the current step
		const result = await form.trigger(fieldsToValidate as any);

		if (result) {
			setStep(Math.min(step + 1, totalSteps));
		}
	};

	const prevStep = () => {
		setStep(Math.max(step - 1, 1));
	};

	const onSubmit = (data: FormValues) => {
		console.log('Form submitted:', data);
		// Here you would typically send the data to your API
		alert('Property created successfully!');
	};

	const steps = [
		{ id: 1, name: 'Basic Info' },
		{ id: 2, name: 'Property Details' },
		{ id: 3, name: 'Rental Terms' },
	];

	return (
		<div className='container max-w-3xl mx-auto py-10 px-4'>
			<Card>
				<CardHeader>
					<CardTitle className='text-2xl'>Create New Rental Property</CardTitle>
					<CardDescription>
						Add a new property to your rental management platform
					</CardDescription>
				</CardHeader>
				<CardContent>
					<StepIndicator steps={steps} currentStep={step} />

					<form onSubmit={form.handleSubmit(onSubmit)} className='mt-8'>
						{step === 1 && <PropertyBasicInfo form={form} />}
						{step === 2 && <PropertyDetails form={form} />}
						{step === 3 && <RentalTerms form={form} />}
					</form>
				</CardContent>
				<CardFooter className='flex justify-between'>
					<Button variant='outline' onClick={prevStep} disabled={step === 1}>
						Previous
					</Button>

					{step < totalSteps ? (
						<Button onClick={nextStep}>Next</Button>
					) : (
						<Button onClick={form.handleSubmit(onSubmit)}>Create Property</Button>
					)}
				</CardFooter>
			</Card>
		</div>
	);
}
