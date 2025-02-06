import { MessageSquare } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

export default function MessagesComponent() {

    const messages = [
		{
			id: 1,
			tenant: 'John Smith',
			property: '123 Main St',
			preview: 'About the leaky faucet...',
			date: '2023-06-15',
		},
		{
			id: 2,
			tenant: 'Jane Doe',
			property: '456 Elm St',
			preview: 'Regarding the noise complaint...',
			date: '2023-06-14',
		},
		{
			id: 3,
			tenant: 'Bob Johnson',
			property: '789 Oak St',
			preview: 'Question about rent payment...',
			date: '2023-06-13',
		},
	];

    return (
		<Card key='messages' className='h-full overflow-auto'>
			<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
				<CardTitle className='text-sm font-medium'>Meldinger</CardTitle>
				<Link href='/chat' className='no-drag'>
					<MessageSquare className='h-4 w-4 text-muted-foreground hover:text-red' />
				</Link>
			</CardHeader>
			<CardContent>
				<ScrollArea className='h-[300px]'>
					<ul className='space-y-4'>
						{messages.map((message) => (
							<li
								key={message.id}
								className='flex items-center space-x-4 py-2 border-b last:border-b-0 hover:bg-accent'>
								<Avatar>
									<AvatarFallback>
										{message.tenant
											.split(' ')
											.map((n) => n[0])
											.join('')}
									</AvatarFallback>
								</Avatar>
								<Link href={`/chat`} className='no-drag w-full'>
									<div className='flex-1 space-y-1'>
										<p className='text-sm font-medium leading-none'>
											{message.tenant}
										</p>
										<p className='text-sm text-muted-foreground'>
											{message.preview}
										</p>
									</div>
								</Link>
								<p className='text-xs text-muted-foreground'>{message.date}</p>
							</li>
						))}
					</ul>
				</ScrollArea>
			</CardContent>
		</Card>
	);
}