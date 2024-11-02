'use client';
import { Button } from '../ui/button';
import { axiosInstanceClient } from '@/utils/clientAxios';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

type props = {
    setUnits: any;
}

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

export default function AddRandomUnit(props: props) {
	const router = useRouter();
	const { toast } = useToast();

	const randomData = {
		title: 'Random Title',
		address: 'Random Location',
		monthlyrent: 1000,
		deposit: 1000,
		housingtype: 'Random Type',
		description: 'Random Description',
		squaremeters: 100,
		rating: 4.8,
	};

	const session = getCookie('session');
	const handleClick = async () => {
		try {
			const getRandomData = async () => {
				const data = await axios.get('https://randomuser.me/api/', {
					params: {
						results: 1,
					},
				});
				// console.log(`Random data: ${JSON.stringify(data, null, 2)}`);
				const parsedObject: TrandomData = {
					title: data.data.results[0].location.city,
					address: data.data.results[0].location.street.name,
					monthlyrent: Math.floor(Math.random() * 1000),
					deposit: Math.floor(Math.random() * 1000),
					housingtype: data.data.results[0].gender,
					description: 'Random Description',
					squaremeters: Math.floor(Math.random() * 100),
					rating: Math.floor(Math.random() * 5 + 1),
				};
				return parsedObject;
			};

			const randomDataNew = await getRandomData().then((data) => {
				return data;
			});

			const response = await axiosInstanceClient.post('api/units', {
				headers: {
					'Content-Type': 'application/json',
					cookie: `session=${session}`,
				},
				data: randomDataNew,
			});
            const realId = response.data.$id;
            randomDataNew.$id = realId;
            props.setUnits((prev: any) => [...prev, randomDataNew]);
			router.refresh();
			toast({
				title: 'Unit Added',
				description: 'Unit was added successfully',
			});
		} catch (error) {
			console.error(error);
			toast({
				title: 'Error',
				description: 'Could not add unit',
				variant: 'destructive',
			});
		}
	};

	return <Button onClick={() => handleClick()}>Add Random Unit</Button>;
}
