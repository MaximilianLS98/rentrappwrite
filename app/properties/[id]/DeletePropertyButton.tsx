'use client';

import { deletePropertyById } from '@/actions/properties';
import { Button } from '@/components/ui/button';

type Props = {
	propertyId: string;
};

export default function DeletePropertyButton(props: Props) {
	const deleteProperty = async (id: string) => {
        try {
            const sessionCookie = (await fetch('/api/cookie').then((res) => res.json())) || '';
            // console.log(`Session cookie in DeletePropertyButton: ${JSON.stringify(sessionCookie)}`);
            const result = await deletePropertyById(sessionCookie.session, id);
            // console.log(`Result of deletePropertyById: ${JSON.stringify(result)}`);
        } catch {
            console.error('Error deleting property');
        }
	};

	return (
		<Button variant='destructive' onClick={() => deleteProperty(props.propertyId)}>
			Delete
		</Button>
	);
}
