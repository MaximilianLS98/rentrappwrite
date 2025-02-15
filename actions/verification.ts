'use server';

import { createSessionClient } from '@/appwrite/config';
import { cookies } from 'next/headers';

// ? - this file is to be used for verification of the user's email address, and for password reset

const sendVerificationEmail = async () => {
    const session = (await cookies()).get('session')?.value as string;
    const { account } = await createSessionClient(session);
    const result = await account.createVerification('http://localhost:3000/verify');
    // Check what the result is, ideally return an object with a message and a status code
    return result;
}

const verifyAccount = async (userId: string, secret: string) => {
    console.log(`userId: ${userId}, secret: ${secret} in the verifyAccount function in /actions/verification.ts`);
    const session = (await cookies()).get('session')?.value as string;
    const { account } = await createSessionClient(session);
    const result = await account.updateVerification(userId, secret);
    console.log(result);
    return result;
}

const sendPasswordResetEmail = async (email: string) => {
    const session = (await cookies()).get('session')?.value as string;
    const { account } = await createSessionClient(session);
    const result = await account.createRecovery(email, 'http://localhost:3000/reset-password');
    return result;
}


export { sendVerificationEmail, verifyAccount, sendPasswordResetEmail };