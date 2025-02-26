'use client';
import React, { useState } from 'react';
import RentalContractPDF from './generatePDF';

export default function Page() {
	const [formData, setFormData] = useState({
		landlordName: '',
		tenantName: '',
		propertyAddress: '',
		startDate: '',
		endDate: '',
		rentAmount: '',
		securityDeposit: '',
		terms: '',
	});
    const [submitted, setSubmitted] = useState(false);

	interface FormData {
		landlordName: string;
		tenantName: string;
		propertyAddress: string;
		startDate: string;
		endDate: string;
		rentAmount: string;
		securityDeposit: string;
		terms: string;
	}

	interface ChangeEvent {
		target: {
			name: string;
			value: string;
		};
	}

	const handleChange = (e: ChangeEvent) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
        setSubmitted(true);
		console.log('Form submitted', formData);
	};

	return (
		<div className='container mx-auto py-8'>
			<h1 className='text-5xl text-rentr-darkblue mb-4'>Rental Agreement Form</h1>
			<div className='flex'>
				<div className='w-1/2'>
					<form
						onSubmit={handleSubmit}
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: '10px',
							maxWidth: '400px',
							margin: '0 auto',
						}}>
						<input
							type='text'
							name='landlordName'
							placeholder='Landlord Name'
                            disabled={submitted}
							onChange={handleChange}
							required
							style={{
								padding: '10px',
								borderRadius: '5px',
								border: '1px solid #ccc',
							}}
						/>
						<input
							type='text'
							name='tenantName'
							placeholder='Tenant Name'
							onChange={handleChange}
							required
							style={{
								padding: '10px',
								borderRadius: '5px',
								border: '1px solid #ccc',
							}}
						/>
						<input
							type='text'
							name='propertyAddress'
							placeholder='Property Address'
							onChange={handleChange}
							required
							style={{
								padding: '10px',
								borderRadius: '5px',
								border: '1px solid #ccc',
							}}
						/>
						<input
							type='date'
							name='startDate'
							onChange={handleChange}
							required
							style={{
								padding: '10px',
								borderRadius: '5px',
								border: '1px solid #ccc',
							}}
						/>
						<input
							type='date'
							name='endDate'
							onChange={handleChange}
							required
							style={{
								padding: '10px',
								borderRadius: '5px',
								border: '1px solid #ccc',
							}}
						/>
						<input
							type='number'
							name='rentAmount'
							placeholder='Monthly Rent'
							onChange={handleChange}
							required
							style={{
								padding: '10px',
								borderRadius: '5px',
								border: '1px solid #ccc',
							}}
						/>
						<input
							type='number'
							name='securityDeposit'
							placeholder='Security Deposit'
							onChange={handleChange}
							required
							style={{
								padding: '10px',
								borderRadius: '5px',
								border: '1px solid #ccc',
							}}
						/>
						<textarea
							name='terms'
							placeholder='Additional Terms'
							onChange={handleChange}
							style={{
								padding: '10px',
								borderRadius: '5px',
								border: '1px solid #ccc',
								minHeight: '100px',
							}}></textarea>
						<button
							type='submit'
                            disabled={submitted}
							style={{
								padding: '10px',
								borderRadius: '5px',
								border: 'none',
								backgroundColor: '#007BFF',
								color: '#fff',
								cursor: 'pointer',
							}}>
							Generate Contract
						</button>
					</form>
				</div>
				<div className='w-1/2'>
					{submitted && (
						<RentalContractPDF formData={formData} />
					)}
				</div>
			</div>
		</div>
	);
}
