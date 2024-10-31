'use client';
import { useState } from 'react';
// import axios from 'axios';
import { axiosInstanceClient } from '@/utils/clientAxios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload } from 'lucide-react';
// import { useToast } from '@/components/ui/use-toast';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { useRouter } from 'next/navigation';

// interface ImageUploaderProps {
// 	onImagesUploaded: (imageUrls: string[]) => void;
// }

export default function UploadMultipleFiles(/*{ onImagesUploaded }: ImageUploaderProps*/) {
	const [files, setFiles] = useState<File[]>([]);
	const [uploading, setUploading] = useState(false);
	const [progress, setProgress] = useState(0);
	const { toast } = useToast();
    const router = useRouter();

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFiles = Array.from(event.target.files || []);
		setFiles(selectedFiles);
        console.log('Selected files:', selectedFiles);
	};

	const handleUpload = async () => {
        console.log(files.length + ' length of files array in handleUpload');
        
		if (files.length === 0) {
			toast({
				title: 'No files selected',
				description: 'Please select image files to upload.',
				variant: 'destructive',
			});
			return;
		}

		setUploading(true);
		setProgress(0);

		const formData = new FormData();
		files.forEach((file, index) => {
			formData.append(`image${index}`, file);
		});

		try {
			const response = await axiosInstanceClient.post('/bucket/images', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
				onUploadProgress: (progressEvent) => {
					const percentCompleted = Math.round(
						(progressEvent.loaded * 100) / (progressEvent.total || 1),
					);
					setProgress(percentCompleted);
				},
			});
            console.log('Response from image upload:', response);
			// onImagesUploaded(response.data.imageUrls);
			toast({
				title: 'Images uploaded successfully',
				description: `image(s) have been added to the unit.`,
			});
			setFiles([]); // Reset the file input
            router.refresh();
		} catch (error) {
			console.error('Error uploading images:', error);
			toast({
				title: 'Error uploading images',
				description: 'There was a problem uploading your images. Please try again.',
				variant: 'destructive',
			});
		} finally {
			setUploading(false);
			setProgress(0);
		}
	};

	return (
		<div>
			<Label htmlFor='image-upload'>Upload New Images</Label>
			<div className='flex mt-2'>
				<Input
					id='image-upload'
					type='file'
					accept='image/*'
					multiple
					onChange={handleFileChange}
					disabled={uploading}
				/>
				<Button
					type='button'
					className='ml-2'
					onClick={handleUpload}
					disabled={uploading || files.length === 0}>
					{uploading ? (
						<>Uploading...</>
					) : (
						<>
							<Upload className='mr-2 h-4 w-4' /> Upload
						</>
					)}
				</Button>
			</div>
			{uploading && <Progress value={progress} className='mt-2' />}
			{files.length > 0 && (
				<p className='mt-2 text-sm text-muted-foreground'>
					{files.length} file(s) selected
				</p>
			)}
		</div>
	);
}
