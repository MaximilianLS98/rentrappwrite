'use client';
import { Button } from '../ui/button';
import { axiosInstanceClient } from '@/utils/clientAxios';
import { getCookie } from 'cookies-next';
import { useToast } from '@/hooks/use-toast';

interface TrandomData {
	$id?: string;
	title: string;
	address: string;
	monthlyrent: number;
	deposit: number;
	housingtype: string;
	description: string;
	squaremeters: number;
	rating: number;
}

export default function AddRandomMessage({ chatId }: { chatId: string }) {
	const { toast } = useToast();

	const randomData = {
        chatId: chatId,
        senderId: 'Maxim',
        content: 'Random Message',
        timestamp: new Date().toISOString(),
	};

	const session = getCookie('session');
	const handleClick = async () => {
		try {

			const response = await axiosInstanceClient.post('api/chats/messages', {
				headers: {
					'Content-Type': 'application/json',
					cookie: `session=${session}`,
				},
				data: randomData,
			});
			const realId = response.data.$id;
			toast({
				title: 'Message sent',
                description: `Message sent with id: ${realId}`,
			});
		} catch (error) {
			console.error(error);
			toast({
				title: 'Error',
				description: 'Could not send message',
				variant: 'destructive',
			});
		}
	};

	return <Button onClick={() => handleClick()}>Add Random Message</Button>;
}
