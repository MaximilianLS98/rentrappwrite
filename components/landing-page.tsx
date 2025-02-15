'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Building, FileText, Calendar, Image, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export function LandingPageComponent() {
	return (
		<div className='flex flex-col min-h-screen'>
			<main className='flex-1'>
				<section className='w-full py-12 md:py-24 lg:py-32 xl:py-48'>
					<div className='absolute inset-0 overflow-hidden z-[-1]'>
						<div className='absolute -top-1/2 -left-1/2 w-[200%] h-[200%] rounded-full bg-gradient-to-br from-primary/40 via-secondary/30 to-accent/20 blur-3xl' />
					</div>
					<div className='container px-4 md:px-6'>
						<div className='flex flex-col items-center space-y-4 text-center gap-4'>
							<div className='space-y-2'>
								<h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none mb-8'>
									Full kontroll over dine utleieenheter
								</h1>
								<p className='mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400'>
									RentR hjelper deg med å holde dokumenter, bilder, frister og
									annet organisert og lett tilgjengelig, på ett sted. Spar tid og
									øk effektiviteten.
								</p>
							</div>
							<div className='space-x-4'>
								<Button className='bg-rentr-main'>Kom igang</Button>
								<Button variant='outline'>Les mer</Button>
							</div>
						</div>
					</div>
				</section>
				<section
					id='features'
					className='w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800'>
					<div className='container px-4 md:px-6'>
						<h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12'>
							Key Features
						</h2>
						<div className='grid gap-10 sm:grid-cols-2 md:grid-cols-3'>
							<div className='flex flex-col items-center text-center'>
								<Image className='h-12 w-12 mb-4 text-primary' />
								<h3 className='text-xl font-bold mb-2'>Image Organization</h3>
								<p className='text-gray-500 dark:text-gray-400'>
									Easily upload and organize photos of your properties.
								</p>
							</div>
							<div className='flex flex-col items-center text-center'>
								<FileText className='h-12 w-12 mb-4 text-primary' />
								<h3 className='text-xl font-bold mb-2'>Document Management</h3>
								<p className='text-gray-500 dark:text-gray-400'>
									Store and access important documents securely in one place.
								</p>
							</div>
							<div className='flex flex-col items-center text-center'>
								<Calendar className='h-12 w-12 mb-4 text-primary' />
								<h3 className='text-xl font-bold mb-2'>Availability Tracking</h3>
								<p className='text-gray-500 dark:text-gray-400'>
									Keep track of occupied and vacant units with ease.
								</p>
							</div>
						</div>
					</div>
				</section>
				<section id='benefits' className='w-full py-12 md:py-24 lg:py-32'>
					<div className='container px-4 md:px-6'>
						<h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12'>
							Benefits
						</h2>
						<div className='grid gap-8 sm:grid-cols-2'>
							<div className='flex items-start space-x-4'>
								<CheckCircle className='h-6 w-6 text-green-500 mt-1' />
								<div>
									<h3 className='text-xl font-bold mb-2'>Save Time</h3>
									<p className='text-gray-500 dark:text-gray-400'>
										Streamline your property management tasks and reduce
										administrative work.
									</p>
								</div>
							</div>
							<div className='flex items-start space-x-4'>
								<CheckCircle className='h-6 w-6 text-green-500 mt-1' />
								<div>
									<h3 className='text-xl font-bold mb-2'>Increase Efficiency</h3>
									<p className='text-gray-500 dark:text-gray-400'>
										Manage all your properties from a single, intuitive
										dashboard.
									</p>
								</div>
							</div>
							<div className='flex items-start space-x-4'>
								<CheckCircle className='h-6 w-6 text-green-500 mt-1' />
								<div>
									<h3 className='text-xl font-bold mb-2'>Improve Organization</h3>
									<p className='text-gray-500 dark:text-gray-400'>
										Keep all property-related information organized and easily
										accessible.
									</p>
								</div>
							</div>
							<div className='flex items-start space-x-4'>
								<CheckCircle className='h-6 w-6 text-green-500 mt-1' />
								<div>
									<h3 className='text-xl font-bold mb-2'>
										Enhance Decision Making
									</h3>
									<p className='text-gray-500 dark:text-gray-400'>
										Gain insights from comprehensive reports and analytics.
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section
					id='pricing'
					className='w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800'>
					<div className='container px-4 md:px-6'>
						<h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12'>
							Simple Pricing
						</h2>
						<div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
							<div className='flex flex-col p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg'>
								<h3 className='text-2xl font-bold mb-4'>Basic</h3>
								<p className='text-4xl font-bold mb-4'>
									$19<span className='text-base font-normal'>/month</span>
								</p>
								<ul className='mb-6 space-y-2'>
									<li className='flex items-center'>
										<CheckCircle className='h-5 w-5 text-green-500 mr-2' />
										Up to 5 properties
									</li>
									<li className='flex items-center'>
										<CheckCircle className='h-5 w-5 text-green-500 mr-2' />
										Basic document storage
									</li>
									<li className='flex items-center'>
										<CheckCircle className='h-5 w-5 text-green-500 mr-2' />
										Availability tracking
									</li>
								</ul>
								<Button className='mt-auto'>Get Started</Button>
							</div>
							<div className='flex flex-col p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg border-2 border-primary'>
								<h3 className='text-2xl font-bold mb-4'>Pro</h3>
								<p className='text-4xl font-bold mb-4'>
									$49<span className='text-base font-normal'>/month</span>
								</p>
								<ul className='mb-6 space-y-2'>
									<li className='flex items-center'>
										<CheckCircle className='h-5 w-5 text-green-500 mr-2' />
										Up to 20 properties
									</li>
									<li className='flex items-center'>
										<CheckCircle className='h-5 w-5 text-green-500 mr-2' />
										Advanced document management
									</li>
									<li className='flex items-center'>
										<CheckCircle className='h-5 w-5 text-green-500 mr-2' />
										Financial reporting
									</li>
								</ul>
								<Button className='mt-auto'>Get Started</Button>
							</div>
							<div className='flex flex-col p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg'>
								<h3 className='text-2xl font-bold mb-4'>Enterprise</h3>
								<p className='text-4xl font-bold mb-4'>Custom</p>
								<ul className='mb-6 space-y-2'>
									<li className='flex items-center'>
										<CheckCircle className='h-5 w-5 text-green-500 mr-2' />
										Unlimited properties
									</li>
									<li className='flex items-center'>
										<CheckCircle className='h-5 w-5 text-green-500 mr-2' />
										Custom integrations
									</li>
									<li className='flex items-center'>
										<CheckCircle className='h-5 w-5 text-green-500 mr-2' />
										Dedicated support
									</li>
								</ul>
								<Button className='mt-auto'>Contact Sales</Button>
							</div>
						</div>
					</div>
				</section>
				<section className='w-full py-12 md:py-24 lg:py-32'>
					<div className='container px-4 md:px-6'>
						<div className='flex flex-col items-center justify-center space-y-4 text-center'>
							<div className='space-y-2'>
								<h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
									Ready to Simplify Your Property Management?
								</h2>
								<p className='mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400'>
									Join thousands of landlords who are saving time and increasing
									efficiency with LandlordPro.
								</p>
							</div>
							<div className='w-full max-w-sm space-y-2'>
								<form className='flex space-x-2'>
									<Input
										className='max-w-lg flex-1'
										placeholder='Enter your email'
										type='email'
									/>
									<Button type='submit'>Get Started</Button>
								</form>
								<p className='text-xs text-gray-500 dark:text-gray-400'>
									By signing up, you agree to our{' '}
									<Link className='underline underline-offset-2' href='#'>
										Terms & Conditions
									</Link>
								</p>
							</div>
						</div>
					</div>
				</section>
			</main>
			<footer className='flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t'>
				<p className='text-xs text-gray-500 dark:text-gray-400'>
					© 2024 LandlordPro. All rights reserved.
				</p>
				<nav className='sm:ml-auto flex gap-4 sm:gap-6'>
					<Link className='text-xs hover:underline underline-offset-4' href='#'>
						Terms of Service
					</Link>
					<Link className='text-xs hover:underline underline-offset-4' href='#'>
						Privacy
					</Link>
				</nav>
			</footer>
		</div>
	);
}
