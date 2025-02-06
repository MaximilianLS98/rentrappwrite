'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { createClientSessionClient } from '@/lib/appwrite';
import { RealtimeResponseEvent } from 'appwrite';
import { Query } from 'appwrite';
import { axiosInstanceClient } from '@/utils/clientAxios';
import AddRandomMessage from '@/components/temp/AddRandomMessage';

export interface Message {
	$id: string;
	chatId: string;
	senderId: string;
	content: string;
	timestamp: string;
}

export interface RealtimeEvent {
	event: string;
	payload: Message;
}

const ChatPage = () => {
	const chatId = useParams<{ id: string }>().id;

	const initialized = useRef(false); // Ref to track if effect has been run
	const [messages, setMessages] = useState<Message[]>([]);
	const [payload, setPayload] = useState<RealtimeEvent | any>(null);

	useEffect(() => {
		if (!chatId || typeof chatId !== 'string') return;

		// Get the initial messages
		const getInitialMessages = async () => {
			const res = await axiosInstanceClient.get('/api/cookie');
			const sessionCookie = res.data.session ? res.data.session : false;
			if (!sessionCookie) {
				console.error('No session cookie found when trying to get initial messages');
				return;
			}

			const { client, databases } = await createClientSessionClient(sessionCookie);
			databases
				.listDocuments('rentrdb', 'messages', [
					Query.equal('chatId', chatId),
					Query.orderAsc('timestamp'),
				])
				.then((response) => {
					setMessages(
						response.documents.map((doc: any) => ({
							$id: doc.$id,
							chatId: doc.chatId,
							senderId: doc.senderId,
							content: doc.content,
							timestamp: doc.timestamp,
						})),
					);
				});
			// Subscribe to real-time changes in the Messages collection
			const unsubscribe = client.subscribe(
				[`databases.rentrdb.collections.messages.documents`, `documents`],
				(response: RealtimeResponseEvent<unknown>) => {
					const payload = response.payload as Message;
					console.log(`Realtime response in the page: ${response}`);
					setPayload(response);
					if (payload.chatId === chatId) {
						if (
							response.events.includes(
								'databases.rentrdb.collections.messages.documents.*.create',
							)
						) {
							console.log(`Adding message to chat: ${payload}`);
							setMessages((prevMessages) => [...prevMessages, payload]);
						} else if (
							response.events.includes(
								'databases.rentrdb.collections.messages.documents.*.update',
							)
						) {
							console.log(`Updating message in chat: ${payload}`);
							setMessages((prevMessages) =>
								prevMessages.map((msg) =>
									msg.$id === payload.$id ? payload : msg,
								),
							);
						} else if (
							response.events.includes(
								'databases.rentrdb.collections.messages.documents.*.delete',
							)
						) {
							console.log(`Deleting message from chat: ${payload}`);
							setMessages((prevMessages) =>
								prevMessages.filter((msg) => msg.$id !== payload.$id),
							);
						}
					}
				},
			);
			return unsubscribe;
		};
		let unsubscribe: (() => void) | undefined;
		// Only fetch messages if this effect hasn't been initialized
		if (!initialized.current) {
		getInitialMessages().then((unsub) => {
			unsubscribe = unsub;
		});
		initialized.current = true; // Mark as initialized to avoid re-running in Strict Mode
		}

		return () => {
			if (unsubscribe) {
				console.log(`Unsubscribing from chat: ${chatId}`);
				unsubscribe();
			}
		};
	}, [chatId]);

	return (
		<div>
			<h1>Chat</h1>
			{/* <p>{cookies.get('session')} Her skulle det vært en cookie</p> */}
			<div>
				{messages.map((message) => (
					<div key={message.$id}>
						<strong>{message.senderId}:</strong> {message.content}
					</div>
				))}
				{/* <pre>{JSON.stringify(payload, null, 2)}</pre> */}
			</div>
			<div className='absolute left-10 bottom-10'>
				<AddRandomMessage chatId={chatId} />
			</div>
		</div>
	);
};

export default ChatPage;
