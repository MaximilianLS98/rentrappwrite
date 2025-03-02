'use client';

import { deletePropertyById } from '@/actions/properties';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Trash2 } from 'lucide-react';

type Props = {
	propertyId: string;
};

export default function DeletePropertyButton(props: Props) {
	const deleteProperty = async (id: string) => {
		const sessionCookie = (await fetch('/api/cookie').then((res) => res.json())) || '';
		const result = await deletePropertyById(sessionCookie.session, id);
		if (result.error) {
			toast.error('Kunne ikke slette eiendommen');
		} else {
			toast.success('Eiendommen ble slettet');
		}
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant='destructive'>
                    <Trash2 size={16} />
					Slett eiendom
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Er du sikker?</AlertDialogTitle>
				</AlertDialogHeader>
				<AlertDialogDescription>
					Dette vil slette eiendommen permanent. Denne handlingen kan ikke angres.
				</AlertDialogDescription>
				<AlertDialogFooter>
					<AlertDialogAction asChild>
						<Button
							variant='destructive'
							onClick={() => deleteProperty(props.propertyId)}
                            className='bg-destructive'>
							Slett eiendom
						</Button>
					</AlertDialogAction>
					<AlertDialogCancel asChild>
						<Button variant='secondary'>Avbryt</Button>
					</AlertDialogCancel>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
