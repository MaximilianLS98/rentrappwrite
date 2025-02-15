import Link from 'next/link';
import { Button } from '@/components/ui/button';
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
import { sendPasswordResetEmail } from '@/actions/verification';

export default function ForgotPasswordPage() {
    'use server';
    const initiatePasswordReset = async (formData: FormData) => {
        const email = formData.get('email') as string;
        await sendPasswordResetEmail(email);
    }
	return (
		<div className='min-h-screen flex justify-center bg-gradient-to-r from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-900 p-4'>
			<Card className='w-full max-w-md rounded max-h-fit my-12'>
				<CardHeader>
					<CardTitle className='text-2xl font-bold text-center'>
						Forgot Password
					</CardTitle>
					<CardDescription className='text-center'>
						Enter your email to reset your password
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form
                    action={initiatePasswordReset}
                    >
						<div className='space-y-4'>
							<div className='space-y-2'>
								<Label htmlFor='email'>Email</Label>
								<Input
									id='email'
									type='email'
                                    name='email'
									placeholder='m@example.com'
									required
								/>
							</div>
							<Button type='submit' className='w-full'>
								Reset Password
							</Button>
						</div>
					</form>
				</CardContent>
				<CardFooter className='flex justify-center'>
					<p className='text-sm text-gray-600 dark:text-gray-400'>
						Remember your password?{' '}
						<Link
							href='/login'
							className='text-blue-600 hover:underline dark:text-blue-400'>
							Login
						</Link>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}
