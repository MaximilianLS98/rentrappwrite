import { sendVerificationEmail } from "@/actions/verification";
import { cookies } from "next/headers";
import { Button } from "../ui/button";
import auth from "@/utils/auth";

// This needs to be based on a form, and the form has an action that calls the sendVerificationEmail function
export default async function VerifyAccountBanner() {
    const user = await auth.getUser();
    if (user.emailVerification) {
        // console.log('User is already verified');
		return null;
	}
    async function handleSubmit() {
        'use server';
    
        const result = await sendVerificationEmail();
        console.log(result);
    }

    return (
		<div className='bg-rentr-lightblue p-4 rounded flex justify-between'>
			<div>
				<h1 className='text-lg font-semibold'>Verifiser kontoen din</h1>
				<p className='text-sm'>
					Vi har sendt deg en link på epost for å verifisere kontoen din. For å ta i bruk
					alle tjenestene på denne platformen må kontoen verifiseres.
				</p>
			</div>
			<form action={handleSubmit}>
				<Button className='bg-rentr-secondary' type='submit'>Send på nytt</Button>
			</form>
		</div>
	);
}
