import { EmailTemplate } from '@/components/email/default-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
    try {
        const { data, error } = await resend.emails.send({
            from: 'RentR <onboarding@resend.dev>',
            to: ['delivered@resend.dev'],
            subject: 'Hello world',
            react: EmailTemplate({ firstName: 'Maximilian' }),
        });
        return Response.json(data);
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}

export async function POST() {
	try {
		const { data, error } = await resend.emails.send({
			from: 'Acme <onboarding@resend.dev>',
			to: ['delivered@resend.dev'],
			subject: 'Hello world',
			react: EmailTemplate({ firstName: 'John' }),
		});

		if (error) {
			return Response.json({ error }, { status: 500 });
		}

		return Response.json(data);
	} catch (error) {
		return Response.json({ error }, { status: 500 });
	}
}
