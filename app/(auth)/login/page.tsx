import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';
import auth from '@/utils/auth';
import Link from 'next/link';

export default async function Login() {
      const user = await auth.getUser();
    if (user) {
        redirect('/');
    } 

    return (
		<div className='flex flex-col items-center justify-center pb-8 lg:justify-normal lg:mt-12 min-h-screen'>
			<h1 className='text-3xl font-bold mb-6'>Logg inn</h1>
			<form
				action={auth.createSession}
				className='bg-secondary p-8 rounded shadow-md w-full max-w-sm'>
				<div className='mb-4'>
					<input
						type='email'
						name='email'
						placeholder='Email'
						required
						className='w-full p-2 border border-accent rounded'
						defaultValue={'maxi@ways.no'} // ! TODO: Remove this
					/>
				</div>
				<div className='mb-4'>
					<input
						type='password'
						name='password'
						placeholder='Passord'
						required
						className='w-full p-2 border border-accent rounded'
						defaultValue={'Maxi123498'} // ! TODO: Remove this
					/>
				</div>
				<Button type='submit' className='w-full p-2 rounded' variant={'default'}>
					Logg inn
				</Button>
				<Link href='/signup'>
					<p className='text-accent-foreground text-center mt-4'>Har du ikke en bruker? Registrer deg her</p>
				</Link>
			</form>
		</div>
	);
}