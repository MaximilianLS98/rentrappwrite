'use client';
import { Button } from '../ui/button';
import { axiosInstanceClient } from '@/utils/clientAxios';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Trash2 } from 'lucide-react';

export default function DeleteButton(props: { id: string, redirect?: boolean }) {
    const router = useRouter();
    const { toast } = useToast();

	const handleDelete = async (e: any) => {
        e.preventDefault();
		console.log(`Deleting unit with id: ${props.id}`);

        try {
            await axiosInstanceClient.delete(`/units/${props.id}`);
            if (props.redirect) {
                router.push('/units');
                router.refresh();
            } else {
                router.refresh();
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
			<Button onClick={(e) => handleDelete(e)} variant={'destructive'} size='sm'>
                <Trash2 size={16} className='mr-1' />
				Delete
			</Button>
		</>
	);
}
