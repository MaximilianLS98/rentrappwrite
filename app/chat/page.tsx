'use client';
import { useState, useEffect, useRef } from 'react';
import { axiosInstanceClient } from '@/utils/clientAxios';
import { createClientSessionClient, createSimpleClient } from '@/lib/appwrite';
import Link from 'next/link';
import { Query } from 'appwrite';
import { RealtimeResponseEvent } from 'appwrite';


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
	const [chats, setChats] = useState<Chat[]>([]);
	const [chatId, setChatId] = useState('');

	const initialized = useRef(false); // Ref to track if effect has been run

	// ? this is for testing purposes with the testRT collection, should be removed
	// useEffect(() => {
	// 	let sessionCookie = '';
	// 	axiosInstanceClient.get('/api/cookie').then((res) => {
	// 		sessionCookie = res.data.session ? res.data.session : 'No session cookie found';
	// 		setSessionCookie(sessionCookie);
	// 	});

	// 	const simpleClient = createSimpleClient(sessionCookie);
	// 	const unsubscribe = simpleClient.subscribe(
	// 		['collections.testRT.documents', 'documents'],
	// 		(response) => {
	// 			console.log(`Realtime response in Page from test collection: ${response}`);
	// 			console.log('KEBAB');
	// 		},
	// 	);
	// 	return unsubscribe;
	// }, []);

	useEffect(() => {
		// if (!chatId || typeof chatId !== 'string') return;

		// Get the initial messages
		const getInitialChats = async () => {
			const res = await axiosInstanceClient.get('/api/cookie');
			const sessionCookie = res.data.session ? res.data.session : false;
			if (!sessionCookie) {
				console.error('No session cookie found when trying to get initial chats');
				return;
			}

			const { client, databases } = await createClientSessionClient(sessionCookie);
			console.log(`Session cookie in getInitialChats: ${sessionCookie}`);
			client.setSession(sessionCookie);
			databases
				.listDocuments('rentrdb', 'chats')
				.then((response) => {
					console.log(`Initial chats: ${JSON.stringify(response)}`);
					setChats(
						response.documents.map((doc: any) => ({
							$id: doc.$id,
							userA: doc.userA,
							userB: doc.userB,
							latestMessage: doc.latestMessage,
							lastMessageTimestamp: doc.lastMessageTimestamp,
							$permissions: doc.$permissions,
						})),
					);
				});
			// Subscribe to real-time changes in the Messages collection
			const unsubscribe = client.subscribe(
				[`databases.rentrdb.collections.chats.documents`, `documents`],
				(response: RealtimeResponseEvent<unknown>) => {
					// ? This runs every time there is a change in the messages collection
					const payload = response.payload as Chat;
					console.log(`Payload in the page: ${JSON.stringify(payload)}`);
					// * Made by copilot, not sure if it works
					setChats((prevChats) => {
						const index = prevChats.findIndex((chat) => chat.$id === payload.$id);
						if (index === -1) {
							return [...prevChats, payload];
						}
						return prevChats.map((chat) => (chat.$id === payload.$id ? payload : chat));
					});
					
				},
			);
			return unsubscribe;
		};
		let unsubscribe: (() => void) | undefined;
		// Only fetch messages if this effect hasn't been initialized
		if (!initialized.current) {
			getInitialChats().then((unsub) => {
				unsubscribe = unsub;
			});
			initialized.current = true; // Mark as initialized to avoid re-running in Strict Mode
		}

		return () => {
			if (unsubscribe) {
				console.log(`Unsubscribing from chats collection, this isnt supposed to run before the component unmounts`);
				// unsubscribe();
			}
		};
	}, [chats]);

	// ? This useEffect is for fetching the chats from the chats collection and subscribing to real-time changes in the chats collection
	// useEffect(() => {
	// 	let sessionCookie = '';
	// 	axiosInstanceClient.get('/api/cookie').then((res) => {
	// 		sessionCookie = res.data.session ? res.data.session : 'No session cookie found';
	// 		setSessionCookie(sessionCookie);
	// 	});

	// 	const { client, databases } = await createClientSessionClient(sessionCookie);
	// 	client.setSession(sessionCookie);
	// 	const unsubscribe = client.subscribe(
	// 		['databases.rentrdb.collections.chats.documents', 'documents'],
	// 		(response) => {
	// 			console.log(
	// 				`Realtime response in Page from test collection: ${JSON.stringify(response)}`,
	// 			);
	// 			console.log('KEBAB with chats');
	// 		},
	// 	);
	// 	return unsubscribe;
	// }, []);

	// ! Not sure if this one works at all
	// useEffect(() => {
	// 	const init = async () => {
	// 		const res = await axiosInstanceClient.get('/api/cookie');
	// 		setSessionCookie(res.data.session ? res.data.session : 'No session cookie found');

	// 		const response = await axiosInstanceClient.get('/api/chats');
	// 		setChats(response.data.documents);

	// 		console.log(
	// 			`Session cookie in init function in second useeffect: ${
	// 				res.data.session ? res.data.session : null
	// 			}`,
	// 		);
	// 		const { client } = await createClientSessionClient(
	// 			res.data.session ? res.data.session : null,
	// 		);
	// 		client.setSession(res.data.session ? res.data.session : null);
	// 		const unsubscribe = client.subscribe(
	// 			['databases.rentrdb.collections.chats', 'documents'],
	// 			(response) => {
	// 				console.log(
	// 					`Realtime response in the init function in second useeffect: ${response}`,
	// 				);
	// 			},
	// 		);

	// 		console.log(`Client in init function in second useeffect: ${JSON.stringify(client)}`);
	// 		return unsubscribe;
	// 	};
	// 	let unsubscribe: any;
	// 	init().then((unsub) => {
	// 		unsubscribe = unsub;
	// 	});
	// 	return () => {
	// 		if (unsubscribe) {
	// 			console.log('Unsubscribing from chats');
	// 			unsubscribe();
	// 		}
	// 	};
	// }, []);

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
