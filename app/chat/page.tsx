'use client';
import { useState, useEffect, useRef } from 'react';
import { axiosInstanceClient } from '@/utils/clientAxios';
import { createClientSessionClient, createSimpleClient } from '@/lib/appwrite';
import Link from 'next/link';
import { Query } from 'appwrite';
import { RealtimeResponseEvent } from 'appwrite';
import { Client } from 'appwrite';
import { getAllChats } from '@/actions/chats';


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

	const initialized = useRef(false); // Ref to track if effect has been run

	// ? useEffect for getting and setting the session cookie
	useEffect(() => {
		fetch('/api/cookie').then((res) => res.json()).then((data) => {
			setSessionCookie(data.session);
			console.log('Session cookie:', data.session);
		});
	}
	, [sessionCookie]);

	// ? useEffect for getting the initial chats
	useEffect(() => {
		if (!sessionCookie) return;

		const getInitialChats = async () => {
			const chats = await getAllChats(sessionCookie);
			console.log(`Initial chats: ${JSON.stringify(chats)}`);
			
			if ('documents' in chats) {
				setChats(chats.documents.map((doc: any) => ({
					$id: doc.$id,
					userA: doc.userA,
					userB: doc.userB,
					latestMessage: doc.latestMessage,
					lastMessageTimestamp: doc.lastMessageTimestamp,
					$permissions: doc.$permissions,
				})));
			} else {
				console.error('Error fetching chats:', chats);
			}
		};

		if (!initialized.current) {
			getInitialChats();
			initialized.current = true;
		}
	}
	, [sessionCookie]);


	// ? useEffect for subscribing to real-time changes in the chats collection
	// ! For some reason in the AppWrite backend, it does not authenticate the user when subscribing to real-time changes, with SSR auth, so document level security
	// ! does not work. This means that any user can subscribe to real-time changes in the chats collection, and get all the chats. This is a security issue, but keeping it for testing purposes
	useEffect(() => {
		if (!sessionCookie) return;

		const client = new Client()
			.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
			.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string)
			.setSession(sessionCookie);

		const unsubscribe = client.subscribe(
			[`databases.rentrdb.collections.chats.documents`, `documents`],
			(response: RealtimeResponseEvent<unknown>) => {
				const payload = response.payload as Chat;
				console.log(`Payload in the page: ${JSON.stringify(payload)}`);
				setChats((prevChats) => {
					const index = prevChats.findIndex((chat) => chat.$id === payload.$id);
					if (index === -1) {
						return [...prevChats, payload];
					}
					return prevChats.map((chat) => (chat.$id === payload.$id ? payload : chat));
				});
			},
		);

		return () => {
			console.log('Unsubscribing from chats collection in chat.tsx');
			unsubscribe();
		};
	}
	, [sessionCookie]);

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
