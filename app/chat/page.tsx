'use client';
import { useState, useEffect } from 'react';
import { axiosInstanceClient } from '@/utils/clientAxios';
import { createClientSessionClient, createSimpleClient } from '@/lib/appwrite';
import Link from 'next/link';


interface Chat {
	$id: string;
	userA: string;
	userB: string;
	latestMessage: string;
	lastMessageTimestamp: string;
	$permissions: string[];
}

export default function Page() {
	const [sessionCookie, setSessionCookie] = useState('');
	const [chats, setChats] = useState([]);

    useEffect(() => {
        let sessionCookie = '';
        axiosInstanceClient.get('/api/cookie').then((res) => {
            sessionCookie = res.data.session ? res.data.session : 'No session cookie found';
            setSessionCookie(sessionCookie);
        });

        const simpleClient = createSimpleClient(sessionCookie);
        const unsubscribe = simpleClient.subscribe(['collections.testRT.documents', 'documents'], (response) => {
            console.log(`Realtime response in Page from test collection: ${response}`);
            console.log('KEBAB');
        }
        );
        return unsubscribe;
    }
    , []);
   

	useEffect(() => {
		const init = async () => {
			const res = await axiosInstanceClient.get('/api/cookie');
			setSessionCookie(res.data.session ? res.data.session : 'No session cookie found');

			const response = await axiosInstanceClient.get('/api/chats');
			setChats(response.data.documents);

            console.log(`Session cookie in init function in second useeffect: ${res.data.session ? res.data.session : null}`);
			const { client } = await createClientSessionClient(res.data.session ? res.data.session : null);
            client.setSession(res.data.session ? res.data.session : null);
			const unsubscribe = client.subscribe(['databases.rentrdb.collections.chats', 'documents'], (response) => {
                console.log(`Realtime response in the init function in second useeffect: ${response}`);
			});
            
            console.log(`Client in init function in second useeffect: ${JSON.stringify(client)}`);
			return unsubscribe;
		};
		let unsubscribe: any;
		init().then((unsub) => {
			unsubscribe = unsub;
		});
		return () => {
            if (unsubscribe) {
                console.log('Unsubscribing from chats');
                unsubscribe();
            }
		};
        // init(); // ! Get rid of this line
	}, []);

    //  const client = new Client()
	// 		.setEndpoint('https://appwrite.kaktusfamilien.com/v1') // Your API Endpoint
	// 		.setProject('671beebc000c7d11b1a7') // Your project ID
	// 		.setSession(sessionCookie);

    // const unsubscribe = client.subscribe(['databases.rentrdb.collections.chats', 'documents'], (response) => {
    //     console.log(`Realtime response in Page: ${response}`);
    // });
        

	return (
		<div className='container flex flex-wrap gap-5 p-4'>
			{chats.map((chat: Chat) => (
				<Link key={chat.$id} href={`/chat/${chat.$id}`}>
					<div key={chat.$id} className='border p-4'>
						<h2 className='text-xl font-bold mb-2'>
							{chat.userA} and {chat.userB}
						</h2>
						<p>{chat.$id}</p>
						<p>{chat.latestMessage}</p>
						<p>
							{new Date(chat.lastMessageTimestamp).toLocaleString('en-GB', {
								day: '2-digit',
								month: '2-digit',
								year: 'numeric',
								hour: '2-digit',
								minute: '2-digit',
							})}
						</p>
					</div>
				</Link>
			))}
			<p suppressHydrationWarning className=''>
				{JSON.stringify(chats, null, 2)}
			</p>
		</div>
	);
}
