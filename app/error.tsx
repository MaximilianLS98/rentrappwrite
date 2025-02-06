'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
	error,
	reset,
}: {
	error: any;
	reset: () => void;
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<div className='container mx-auto p-4'>
			<h2 className='text-4xl font-bold my-4'>Something went wrong!</h2>
			<p>
				<code>{error.message}</code>
			</p>
            <pre className='my-4'>{JSON.stringify(error, null, 2)}</pre>
			<Button
				onClick={
					// Attempt to recover by trying to re-render the segment
					() => reset()
				}>
				Try again
			</Button>
		</div>
	);
}
