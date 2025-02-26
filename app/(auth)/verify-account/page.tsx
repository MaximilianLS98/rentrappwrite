import { Button } from '@/components/ui/button';
import { createSessionClient } from '@/appwrite/config';
import { sendVerificationEmail } from '@/actions/verification';
import { cookies } from 'next/headers';
import auth from '@/utils/auth';

export default async function Page() {
	const session = (await cookies()).get('session')?.value as string;
    const user = await auth.getUser();

    const result = async () => {
        if (user.emailVerification || user.phoneVerification) {
            console.log('User is already verified');
            return { message: 'User is already verified', status: 200 };
        }
        return await sendVerificationEmail();
    }
    const resolvedResult = await result();

	// const sendVerificationEmail = async () => {
    //     if (user.emailVerification || user.phoneVerification) {
    //         console.log('User is already verified');
    //         return;
    //     }
    //     const { account } = await createSessionClient(session);
    //     const result = await account.createVerification('http://localhost:3000/verify');
    //     console.log(result);
	// };
    // sendVerificationEmail();
	return (
		<main className='container mx-auto p-4'>
			<h1 className='text-5xl'>Verify account</h1>
            <pre>{JSON.stringify(user, null, 2)}</pre>
            <pre>{JSON.stringify(resolvedResult, null, 2)}</pre>
		</main>
	);
}
