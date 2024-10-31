import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';
import auth from '@/utils/auth';
import Link from 'next/link';

export default async function SignUp() {
	const user = await auth.getUser();
	if (user) {
		redirect('/');
	}

	return (
		<div className='flex flex-col items-center justify-center min-h-screen'>
			<h1 className='text-3xl font-bold mb-6'>Opprett konto</h1>
			<form
				action={auth.signUp}
				className='bg-secondary p-8 rounded shadow-md w-full max-w-sm'>
				<div className='mb-4'>
					<input
						type='email'
						name='email'
						placeholder='Email'
						required
						className='w-full p-2 border border-accent rounded'
					/>
				</div>
				<div className='mb-4'>
					<input
						type='password'
						name='password'
						placeholder='Password'
						required
						className='w-full p-2 border border-accent rounded'
					/>
				</div>
				<Button type='submit' className='w-full p-2 rounded' variant={'default'}>
					Sign Up
				</Button>
			</form>
		</div>
	);
}
