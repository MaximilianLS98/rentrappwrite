'use client';
// ! Not in use, using ./simpleKanbanBoard.tsx instead
import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd';
import { sampleRequests, type MaintenanceRequest } from './sample-requests';
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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ErrorBoundary } from 'react-error-boundary';

const statusColumns = ['Backlog', 'Open', 'In Progress', 'Closed'];

function MaintenanceRequestsPage() {
	const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
	const [selectedRequest, setSelectedRequest] = useState<MaintenanceRequest | null>(null);
	const [newComment, setNewComment] = useState('');
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setRequests(sampleRequests);
		setIsClient(true);
	}, []);

	const onDragEnd = (result: DropResult) => {
		if (!result.destination) return;

		const newRequests = Array.from(requests);
		const [reorderedItem] = newRequests.splice(result.source.index, 1);
		reorderedItem.status = result.destination.droppableId as MaintenanceRequest['status'];
		newRequests.splice(result.destination.index, 0, reorderedItem);

		setRequests(newRequests);
	};

	const handleAddComment = () => {
		if (selectedRequest && newComment.trim()) {
			const updatedRequest = {
				...selectedRequest,
				comments: [
					...selectedRequest.comments,
					{
						id: Date.now().toString(),
						text: newComment,
						date: new Date().toISOString().split('T')[0],
					},
				],
			};
			setRequests(requests.map((r) => (r.id === updatedRequest.id ? updatedRequest : r)));
			setSelectedRequest(updatedRequest);
			setNewComment('');
		}
	};

	if (!isClient) {
		return <div>Loading...</div>;
	}

	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-2xl font-bold mb-4'>Maintenance Requests</h1>
			<ErrorBoundary fallback={<div>Something went wrong</div>}>
				<DragDropContext onDragEnd={onDragEnd}>
					<div className='flex gap-4 overflow-x-auto pb-4'>
						{statusColumns.map((status) => (
							<div key={status} className='flex-1 min-w-[250px]'>
								<h2 className='font-semibold mb-2'>{status}</h2>
								<Droppable 
									droppableId={status}
									renderClone={(provided, snapshot, rubric) => (
										<div
											{...provided.draggableProps}
											{...provided.dragHandleProps}
											ref={provided.innerRef}
											className='bg-white p-2 rounded-md shadow-md'>
											<Card>
												<CardContent className='p-4'>
													<h3 className='font-semibold mb-2'>
														{requests[rubric.source.index].title}
													</h3>
													<p className='text-sm text-gray-600 mb-2'>
														{requests[rubric.source.index].unit}
													</p>
													<div className='flex gap-2'>
														<Badge>
															{requests[rubric.source.index].type}
														</Badge>
														<Badge
															variant={
																requests[rubric.source.index].priority ===
																'High'
																	? 'destructive'
																	: requests[rubric.source.index].priority ===
																	  'Medium'
																	? 'default'
																	: 'secondary'
															}>
															{requests[rubric.source.index].priority}
														</Badge>
													</div>
												</CardContent>
											</Card>
										</div>
									)
									}
									>
									{(provided: any) => (
										<div
											{...provided.droppableProps}
											ref={provided.innerRef}
											className='bg-gray-100 p-2 rounded-md min-h-[500px]'>
											{requests
												.filter((r) => r.status === status)
												.map((request, index) => (
													<Draggable
														key={request.id}
														draggableId={request.id}
														index={index}>
														{(provided) => (
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
																		<p className='text-sm text-gray-600 mb-2'>
																			{request.unit}
																		</p>
																		<div className='flex gap-2'>
																			<Badge>
																				{request.type}
																			</Badge>
																			<Badge
																				variant={
																					request.priority ===
																					'High'
																						? 'destructive'
																						: request.priority ===
																						  'Medium'
																						? 'default'
																						: 'secondary'
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
						))}
					</div>
				</DragDropContext>
			</ErrorBoundary>
			<pre>{JSON.stringify(requests, null, 2)}</pre>

			<Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>{selectedRequest?.title}</DialogTitle>
						<DialogDescription>{selectedRequest?.description}</DialogDescription>
					</DialogHeader>
					<div className='grid gap-4 py-4'>
						<div className='grid grid-cols-2 gap-4'>
							<div>
								<Label>Unit</Label>
								<Input value={selectedRequest?.unit} readOnly />
							</div>
							<div>
								<Label>Type</Label>
								<Input value={selectedRequest?.type} readOnly />
							</div>
							<div>
								<Label>Priority</Label>
								<Input value={selectedRequest?.priority} readOnly />
							</div>
							<div>
								<Label>Status</Label>
								<Input value={selectedRequest?.status} readOnly />
							</div>
						</div>
						<div>
							<Label>Comments</Label>
							<div className='max-h-40 overflow-y-auto'>
								{selectedRequest?.comments.map((comment) => (
									<div key={comment.id} className='mb-2'>
										<p className='text-sm'>{comment.text}</p>
										<p className='text-xs text-gray-500'>{comment.date}</p>
									</div>
								))}
							</div>
						</div>
						<div>
							<Label htmlFor='new-comment'>Add Comment</Label>
							<Input
								id='new-comment'
								value={newComment}
								onChange={(e) => setNewComment(e.target.value)}
								placeholder='Type your comment here...'
							/>
						</div>
					</div>
					<DialogFooter>
						<Button onClick={handleAddComment}>Add Comment</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}

export default function KanbanBoard() {
	return (
		<ErrorBoundary fallback={<div>Something went wrong</div>}>
			<MaintenanceRequestsPage />
		</ErrorBoundary>
	);
}
