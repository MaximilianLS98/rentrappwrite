'use client';
import { Button } from '../ui/button';
import { axiosInstanceClient } from '@/utils/clientAxios';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Trash2 } from 'lucide-react';
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

// ! - ONLY WORKS FOR DELETING UNITS AS OF NOW
// TODO - Refactor so it can delete from any collection
export default function DeleteButton(props: { id: string; redirect?: boolean; setUnits?: any }) {
	const router = useRouter();
	const { toast } = useToast();

	const handleDelete = async (e: any) => {
		e.preventDefault();
		console.log(`Deleting unit with id: ${props.id}`);

		try {
			const response = await axiosInstanceClient.delete(`api/units/${props.id}`);
			console.log(`Response from delete request: ${JSON.stringify(response)}`);
			if (props.redirect) {
				router.push('/units');
				router.refresh();
			} else {
				router.refresh();
			}
			if (props.setUnits) {
				props.setUnits((prev: any) => {
					return prev.filter((unit: any) => unit.$id !== props.id);
				});
			}
			toast({
				title: 'Unit Deleted',
				description: 'Unit was deleted successfully',
			});
		} catch (error) {
			console.error(error);
			toast({
				title: 'Error',
				description: 'Could not delete unit',
				variant: 'destructive',
			});
		}
	};

	return (
		<>
			{/* <Button
				className='w-full rounded'
				onClick={(e) => handleDelete(e)}
				variant={'destructive'}>
				<Trash2 size={16} className='' />
			</Button> */}
			<AlertDialog>
				<AlertDialogTrigger asChild className='bg-destructive rounded'>
					<Button className='w-full rounded' variant={'destructive'}>
						<Trash2 size={16} className='' />
						Slett
					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							Er du sikker på at du vil slette denne enheten?
						</AlertDialogTitle>
						<AlertDialogDescription>
							Dette kan ikke omgjøres. All informasjon om enheten vil bli slettet.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Avbryt</AlertDialogCancel>
						<AlertDialogAction className='bg-destructive' onClick={(e) => handleDelete(e)}>
							Slett enhet
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
