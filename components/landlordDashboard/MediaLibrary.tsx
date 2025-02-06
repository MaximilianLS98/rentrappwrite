import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Image as ImageIcon } from "lucide-react";

export default function MediaLibrary() {
    return (
		<Card key='media-library' className='h-full overflow-auto'>
			<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
				<CardTitle className='text-md font-medium'>Bilder</CardTitle>
				<ImageIcon className='h-4 w-4 text-muted-foreground' />
			</CardHeader>
			<CardContent>
				<div className='grid grid-cols-3 gap-2'>
					{[1, 2, 3, 4, 5, 6].map((i) => (
						<div key={i} className='aspect-square bg-muted rounded' />
					))}
				</div>
			</CardContent>
		</Card>
	);
}