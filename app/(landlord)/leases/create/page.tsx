'use client';
import React, { useState, useEffect } from 'react';
import RentalContractPDF from './generatePDF';
import { createLease } from '@/actions/leases';
import { getAllUnits } from '@/actions/units';
import { getAllProperties } from '@/actions/properties';
import { FetchUnit, TUnit } from '@/constants/types/units';
import { TPropertyFetch, TProperty } from '@/constants/types/properties';
import { parse } from 'path';

export default function Page() {
	const [allProperties, setAllProperties] = useState<TProperty[]>([]);
	const [formData, setFormData] = useState({
		landlord_id: '',
		tenant_id: '',
		propertyAddress: '',
		start_date: '',
		end_date: '',
		monthly_rent: '',
		additional_terms: '',
		active: true,
		properties: '',
		units: '',
	});
	const [submitted, setSubmitted] = useState(false);

	interface FormData {
		landlord_id: string;
		tenant_id: string;
		propertyAddress: string;
		start_date: string;
		end_date: string;
		monthly_rent: string;
		additional_terms: string;
		active: boolean;
		properties?: string;
		units: string;
	}

	interface ChangeEvent {
		target: {
			name: string;
			value: string;
		};
	}

	useEffect(() => {
		const fetchProperties = async () => {
			const response = await fetch('/api/cookie');
			const sessionCookie = await response.json();
			const properties = (await getAllProperties(sessionCookie.session)) as TPropertyFetch;
			setAllProperties(properties.documents);
		};
		fetchProperties();
	}, []);

	const handleChange = (e: ChangeEvent) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

    const parseFormData = (formData: FormData) => {
        const timeNow = new Date().toISOString();
        const parsedFormData = {
            landlord_id: formData.landlord_id,
            tenant_id: formData.tenant_id,
            // propertyAddress: formData.propertyAddress,
            start_date: formData.start_date,
            end_date: formData.end_date,
            monthly_rent: parseInt(formData.monthly_rent, 10),
            additional_terms: formData.additional_terms,
            active: formData.active,
            // properties: formData.properties,
            units: formData.units,
            unit_id: formData.units,
            status: timeNow > formData.end_date ? 'expired' : 'draft',
        }
        return parsedFormData;
    }

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
        const leaseObj = parseFormData(formData);
        const sessionCookie = await fetch('/api/cookie').then(res => res.json());
        createLease(sessionCookie.session, leaseObj);
		setSubmitted(true);
		console.log('Form submitted', formData);
	};

	return (
		<div className='container mx-auto py-8'>
			<h1 className='text-5xl text-rentr-darkblue mb-4'>Sett opp ny leiekontrakt</h1>
			<div className='flex'>
				<div className='w-1/2'>
					<form onSubmit={handleSubmit} className='flex flex-col gap-2 max-w-xs mx-auto'>
						<input
							type='text'
							name='landlord_id'
							placeholder='Landlord Name'
							disabled={submitted}
							onChange={handleChange}
							required
							className='p-2 rounded border border-gray-300'
						/>
						<input
							type='text'
							name='tenant_id'
							placeholder='Tenant Name'
							onChange={handleChange}
							required
							className='p-2 rounded border border-gray-300'
						/>
						<select
							name='properties'
							onChange={handleChange}
							required
							className='p-2 rounded border border-gray-300'>
							<option value=''>Choose a property</option>
							{allProperties.map((property) => (
								<option key={property.$id} value={property.$id}>
									{property.name}
								</option>
							))}
						</select>
						<select
							name='units'
							onChange={handleChange}
							required
							className='p-2 rounded border border-gray-300'>
							<option value=''>Velg en enhet</option>
							{/* I need to list out every unit, but only the ones for the currently selected property, saved as "properties" in formdata state */}
							{
								formData.properties && allProperties.find(property => property.$id === formData.properties)?.units?.map((unit) => (
                                    <option key={unit.$id} value={unit.$id}>
                                        {unit.title}
                                    </option>
                                ))
                            }
						</select>
						<input
							type='text'
							name='propertyAddress'
							placeholder='Property Address'
							onChange={handleChange}
							required
							className='p-2 rounded border border-gray-300'
						/>
						<input
							type='date'
							name='start_date'
							onChange={handleChange}
							required
							className='p-2 rounded border border-gray-300'
						/>
						<input
							type='date'
							name='end_date'
							onChange={handleChange}
							required
							className='p-2 rounded border border-gray-300'
						/>
						<input
							type='number'
							name='monthly_rent'
							placeholder='Monthly Rent'
							onChange={handleChange}
							required
							className='p-2 rounded border border-gray-300'
						/>
						<textarea
							name='additional_terms'
							placeholder='Additional Terms'
							onChange={handleChange}
							className='p-2 rounded border border-gray-300 min-h-[100px]'></textarea>
						<button
							type='submit'
							disabled={submitted}
							className='p-2 rounded border-none bg-blue-500 text-white cursor-pointer disabled:bg-slate-500 disabled:cursor-not-allowed'>
							Opprett kontrakt
						</button>
					</form>
				</div>
				<div className='w-1/2'></div>
				{submitted && <RentalContractPDF formData={formData} />}
			</div>
		</div>
	);
}
