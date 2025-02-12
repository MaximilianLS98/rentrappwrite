'use client';

import { useState, useEffect } from 'react';
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

type Request = {
	id: string;
	title: string;
};

function SimpleKanbanBoard({ total, documents }: TFetchMaintenanceRequests) {
	const formatRequests = (requests: TMaintenanceRequest[]) => {
		const formattedRequests = requests.reduce(
			(acc: { [key: string]: { id: string; title: string } }, request) => {
				acc[request.$id] = { id: request.$id, title: request.title };
				return acc;
			},
			{},
		);
		console.log(`Formatted requests: ${JSON.stringify(formattedRequests, null, 2)}`);
		return formattedRequests;
	};

	const [formattedRequests, setFormattedRequests] = useState<{
		[key: string]: { id: string; title: string };
	}>(formatRequests(documents));
	const [liveRequests, setLiveRequests] = useState<TMaintenanceRequest[]>(documents);
	const [formattedColumns, setFormattedColumns] = useState<{
		[key: string]: { id: string; title: string; requestIds: string[] };
	}>(initialData.columns);

	const [columnOrder, setColumnOrder] = useState(initialData.columnOrder);

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
		console.log(`Formatted columns: ${JSON.stringify(formattedColumns, null, 2)}`);
		return formattedColumns;
	};

	useEffect(
		() =>
			unstable_batchedUpdates(() => {
				// formatRequests(liveRequests);
				// assignRequestsToColumns(liveRequests);
				setFormattedRequests(formatRequests(liveRequests));
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
        // First letter of the word should be capitalized, and in case the word is "inprogress" should be "In Progress"
        const newTitle = title === 'inprogress' ? 'In Progress' : title.charAt(0).toUpperCase() + title.slice(1);
        return newTitle;
    }


	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-2xl font-bold mb-4'>Maintenance Requests</h1>
			<ErrorBoundary fallback={<div>Something went wrong</div>}>
				<DragDropContext onDragEnd={onDragEndLive}>
					<div className='flex gap-4 overflow-x-auto pb-4'>
						{columnOrder.map((columnId) => {
							const column = formattedColumns[columnId];
							console.log(`Column on line 157: ${JSON.stringify(column, null, 2)}`);
							const columnRequests = column.requestIds.map(
								(requestId) =>
									formattedRequests?.[requestId] ?? { id: '', title: '' },
							);
							console.log(
								`Column requests on line 160: ${JSON.stringify(
									columnRequests,
									null,
									2,
								)}`,
							);

							return (
								<div key={columnId} className='flex-1 min-w-[250px]'>
									<h2 className='font-semibold mb-2'>
										{column.title}
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
															<div
																ref={provided.innerRef}
																{...provided.draggableProps}
																{...provided.dragHandleProps}
																className='bg-white p-4 rounded shadow'>
																{request.title}
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
			<div className='flex justify-between'>
				<pre>{JSON.stringify(formattedRequests, null, 2)}</pre>
				<pre>{JSON.stringify(formattedColumns, null, 2)}</pre>
			</div>
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
