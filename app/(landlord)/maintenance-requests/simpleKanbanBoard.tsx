'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd';
import { ErrorBoundary } from 'react-error-boundary';
import {
	TFetchMaintenanceRequests,
	TMaintenanceRequest,
} from '@/constants/types/maintenancerequests';
import { unstable_batchedUpdates } from 'react-dom';
import { updateMaintenanceRequestById } from '@/actions/maintenanceRequests';

const statusColumns = ['backlog', 'open', 'inprogress', 'closed'];

const initialData = {
	requests: {
		req1: { id: 'req1', title: 'Request one' },
		req2: { id: 'req2', title: 'Request two' },
		req3: { id: 'req3', title: 'Request three' },
		req4: { id: 'req4', title: 'Request four' },
	},
	columns: {
		backlog: {
			id: 'backlog',
			title: 'backlog',
			requestIds: [],
		},
		open: {
			id: 'open',
			title: 'open',
			requestIds: [],
		},
		inprogress: {
			id: 'inprogress',
			title: 'inprogress',
			requestIds: [],
		},
		closed: {
			id: 'closed',
			title: 'closed',
			requestIds: [],
		},
	},
	columnOrder: ['backlog', 'open', 'inprogress', 'closed'],
};

function SimpleKanbanBoard({ total, documents }: TFetchMaintenanceRequests) {
	const formatRequests = (requests: TMaintenanceRequest[]) => {
		const formattedRequests = requests.reduce(
			(
				acc: {
					[key: string]: {
						id: string;
						title: string;
						type: string;
						priority: string;
						status: string;
						$createdAt: string;
						description: string;
						units: any;
					};
				},
				request,
			) => {
				acc[request.$id] = {
					id: request.$id,
					title: request.title,
					type: request.type,
					priority: request.priority,
					status: request.status,
					$createdAt: request.$createdAt,
					description: request.description,
					units: request.units,
				};
				return acc;
			},
			{},
		);
		return formattedRequests;
	};

	const [formattedRequests, setFormattedRequests] = useState<{
		[key: string]: {
			id: string;
			title: string;
			type: string;
			priority: string;
			status: string;
		};
	}>(formatRequests(documents));
	const [liveRequests, setLiveRequests] = useState<TMaintenanceRequest[]>(documents);
	const [formattedColumns, setFormattedColumns] = useState<{
		[key: string]: { id: string; title: string; requestIds: string[] };
	}>(initialData.columns);
	const [columnOrder, setColumnOrder] = useState(initialData.columnOrder);
	const [selectedRequest, setSelectedRequest] = useState<any | null>(null);
	const [newComment, setNewComment] = useState('');

	const assignRequestsToColumns = (requests: TMaintenanceRequest[]) => {
		// there should always be 4 columns, backlog, open, in progress, closed - the requests should be assigned to the columns based on their status
		const formattedColumns = statusColumns.reduce(
			(
				acc: { [key: string]: { id: string; title: string; requestIds: string[] } },
				column,
			) => {
				acc[column.toLowerCase()] = {
					id: column.toLowerCase(),
					title: column,
					requestIds:
						requests
							.filter((request) => request.status === column)
							.map((request) => request.$id) || [],
				};
				return acc;
			},
			{},
		);
		return formattedColumns;
	};

	useEffect(
		() =>
			unstable_batchedUpdates(() => {
				// formatRequests(liveRequests);
				// assignRequestsToColumns(liveRequests);
				// setFormattedRequests(formatRequests(liveRequests));
				setFormattedColumns(assignRequestsToColumns(liveRequests));
			}),
		[liveRequests],
	);

	const onDragEndLive = (result: DropResult) => {
		const { destination, source, draggableId } = result;

		if (!destination) return;
		if (destination.droppableId === source.droppableId && destination.index === source.index)
			return;

		const start = formattedColumns[source.droppableId];
		const finish = formattedColumns[destination.droppableId];

		if (start === finish) {
			const newRequestIds = Array.from(start.requestIds);
			newRequestIds.splice(source.index, 1);
			newRequestIds.splice(destination.index, 0, draggableId);

			const newColumn = {
				...start,
				requestIds: newRequestIds,
			};

			setFormattedColumns({
				...formattedColumns,
				[newColumn.id]: newColumn,
			});
		} else {
			const startRequestIds = Array.from(start.requestIds);
			startRequestIds.splice(source.index, 1);
			const newStart = {
				...start,
				requestIds: startRequestIds,
			};

			const finishRequestIds = Array.from(finish.requestIds);
			finishRequestIds.splice(destination.index, 0, draggableId);
			const newFinish = {
				...finish,
				requestIds: finishRequestIds,
			};

			setFormattedColumns({
				...formattedColumns,
				[newStart.id]: newStart,
				[newFinish.id]: newFinish,
			});
			// Only update the database if the request is moved to a different column and therefore has a different status
			updateMaintenanceRequestById(draggableId, { status: finish.title });
		}
	};

	const formatTitle = (title: string) => {
		switch (title) {
			case 'backlog':
				return 'Backlog';
			case 'open':
				return 'Åpen';
			case 'inprogress':
				return 'Under arbeid';
			case 'closed':
				return 'Lukket';
			default:
				return title;
		}
	};

	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-2xl font-bold mb-4'>Maintenance Requests</h1>
			<ErrorBoundary fallback={<div>Something went wrong</div>}>
				<DragDropContext onDragEnd={onDragEndLive}>
					<div className='flex gap-4 overflow-x-auto pb-4'>
						{columnOrder.map((columnId) => {
							const column = formattedColumns[columnId];
							const columnRequests = column.requestIds.map(
								(requestId) =>
									formattedRequests?.[requestId] ?? { id: '', title: '' },
							);
							return (
								<div key={columnId} className='flex-1 min-w-[250px]'>
									<h2 className='font-semibold mb-2'>
										{formatTitle(column.title)}
									</h2>
									<Droppable droppableId={columnId} key={columnId}>
										{(provided) => (
											<div
												ref={provided.innerRef}
												{...provided.droppableProps}
												className='space-y-2 bg-gray-100 rounded shadow-md min-h-[600px] p-2'>
												{columnRequests.map((request, index) => (
													<Draggable
														key={request.id}
														draggableId={request.id}
														index={index}>
														{(provided) => (
															// <div
															// 	ref={provided.innerRef}
															// 	{...provided.draggableProps}
															// 	{...provided.dragHandleProps}
															// 	className='bg-white p-4 rounded shadow'>
															// 	{request.title}
															// </div>
															<div
																ref={provided.innerRef}
																{...provided.draggableProps}
																{...provided.dragHandleProps}
																className='mb-2'>
																<Card
																	onClick={() =>
																		setSelectedRequest(request)
																	}>
																	<CardContent className='p-4'>
																		<h3 className='font-semibold mb-2'>
																			{request.title}
																		</h3>
																		<div className='flex gap-2'>
																			<Badge>
																				{request.type}
																			</Badge>
																			<Badge
																				className={
																					request.priority ===
																					'low'
																						? 'bg-green-500'
																						: request.priority ===
																						  'medium'
																						? 'bg-yellow-500'
																						: request.priority ===
																						  'high'
																						? 'bg-orange-500'
																						: request.priority ===
																						  'critical'
																						? 'bg-red-500'
																						: ''
																				}>
																				{request.priority}
																			</Badge>
																		</div>
																	</CardContent>
																</Card>
															</div>
														)}
													</Draggable>
												))}
												{provided.placeholder}
											</div>
										)}
									</Droppable>
								</div>
							);
						})}
					</div>
				</DragDropContext>
			</ErrorBoundary>
			<div className='flex justify-between'></div>
			<Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>{selectedRequest?.title}</DialogTitle>
						<DialogDescription>{selectedRequest?.description}</DialogDescription>
					</DialogHeader>
					<div className='grid gap-4 py-4'>
						<div className='grid grid-cols-2 gap-4'>
							<div>
								<Label>Enhet</Label>
								<p className='border-2 border-black p-2'>
									{selectedRequest?.units.address}
								</p>
							</div>
							<div>
								<Label>Type</Label>
								<p className='border-2 border-black p-2'>{selectedRequest?.type}</p>
							</div>
							<div>
								<Label>Priority</Label>
								<p className='border-2 border-black p-2'>
									{selectedRequest?.priority}
								</p>
							</div>
							<div>
								<Label>Status</Label>
								<p className='border-2 border-black p-2'>
									{formatTitle(selectedRequest?.status)}
								</p>
							</div>
						</div>
						<div>
							<Label>Dato registrert</Label>
							<p className='border-2 border-black p-2'>
								{new Date(selectedRequest?.$createdAt).toLocaleString('no-NO')}
							</p>
						</div>
					</div>
					<DialogFooter></DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}

export default function MaintenanceRequestsPageWrapper(props: TFetchMaintenanceRequests) {
	return (
		<ErrorBoundary fallback={<div>Something went wrong</div>}>
			<SimpleKanbanBoard {...props} />
		</ErrorBoundary>
	);
}
