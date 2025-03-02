import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';
import auth from '@/utils/auth';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { GitHubLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import { Icons } from '../icons';

export default async function Login() {
	
	const user = await auth.getUser();
	if (user) {
		redirect('/');
	}

	return (
		<div className='min-h-screen flex justify-center bg-gradient-to-r from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-900 p-4'>
			<Card className='w-full max-w-md max-h-fit rounded my-12'>
				<CardHeader>
					<CardTitle className='text-2xl font-bold text-center'>Login</CardTitle>
					<CardDescription className='text-center'>
						Enter your credentials to access your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form action={auth.createSession}>
						<div className='space-y-4'>
							<div className='space-y-2'>
								<Label htmlFor='email'>Email</Label>
								<Input
									id='email'
									name='email'
									type='email'
									placeholder='m@example.com'
									defaultValue={'maxi@ways.no'} // ! TODO: Remove this
									required
								/>
							</div>
							<div className='space-y-2'>
								<Label htmlFor='password'>Password</Label>
								<Input
									id='password'
									type='password'
									name='password'
									defaultValue={'Maxi123498'}
									required
								/>
							</div>
							<Button type='submit' className='w-full'>
								Login
							</Button>
						</div>
					</form>
					<div className='mt-4 text-center text-sm'>
						<Link
							href='/forgot-password'
							className='text-blue-600 hover:underline dark:text-blue-400'>
							Forgot password?
						</Link>
					</div>
					{/* TODO - Add this section back when we have working social login */}
					{/* <div className='mt-6'>
						<div className='relative'>
							<div className='absolute inset-0 flex items-center'>
								<span className='w-full border-t border-gray-300 dark:border-gray-600' />
							</div>
							<div className='relative flex justify-center text-xs uppercase'>
								<span className='bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400'>
									Or continue with
								</span>
							</div>
						</div>
						<div className='mt-4 flex gap-2'>
							<Button variant='outline' className='w-full'>
								<GitHubLogoIcon className='mr-2 h-4 w-4' /> GitHub
							</Button>
							<Button variant='outline' className='w-full'>
								<Icons.google className='mr-2 h-4 w-4' /> Google
							</Button>
							<Button variant='outline' className='w-full'>
								<TwitterLogoIcon className='mr-2 h-4 w-4' /> Twitter
							</Button>
						</div>
					</div> */}
				</CardContent>
				<CardFooter className='flex justify-center'>
					<p className='text-sm text-gray-600 dark:text-gray-400'>
						Don't have an account?{' '}
						<Link
							href='/signup'
							className='text-blue-600 hover:underline dark:text-blue-400'>
							Sign up
						</Link>
					</p>
				</CardFooter>
			<div>
				<p>maximilian+tester@kaktusfamilien.no</p>
				<p>Test1234</p>
			</div>
			</Card>
		</div>
	);
}
