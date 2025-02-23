'use client';
import { Button } from '../ui/button';
import { axiosInstanceClient } from '@/utils/clientAxios';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Trash2 } from 'lucide-react';


// ! - ONLY WORKS FOR DELETING UNITS AS OF NOW
// TODO - Refactor so it can delete from any collection
export default function DeleteButton(props: { id: string, redirect?: boolean, setUnits?: any }) {
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
                props.setUnits( (prev: any) => { return prev.filter((unit: any) => unit.$id !== props.id) });
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
			{/* <pre>{JSON.stringify(props, null, 2)}</pre> */}
			<Button className='w-full rounded' onClick={(e) => handleDelete(e)} variant={'destructive'}>
                {/* <Trash2 size={16} className='mr-1' /> */}
                <Trash2 size={16} className='' />
				{/* Slett */}
			</Button>
		</>
	);
}
