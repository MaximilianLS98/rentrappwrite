'use client';
import { useState } from 'react';
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Upload } from "lucide-react";
import { axiosInstanceClient } from '@/utils/clientAxios';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export default function UploadFile() {
   const [file, setFile] = useState<File | null>(null);
    // const [files, setFiles] = useState<FileList | null>(null);
   const [uploading, setUploading] = useState(false);
   const { toast } = useToast();
    const router = useRouter();

   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files?.[0];
        // Support multiple files
        // const selectedFile = event.target.files;
		if (selectedFile) {
			setFile(selectedFile);
            // setFiles(selectedFile);
		}
   };

   const handleUpload = async () => {
		if (!file) {
			toast({
				title: 'No file selected',
				description: 'Please select an image file to upload.',
				variant: 'destructive',
			});
			return;
		}

		setUploading(true);

		const formData = new FormData();
		formData.append('image', file);

        console.log('Uploading image:', file);
        

		try {
			const response = await axiosInstanceClient.post('api/bucket/images', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
                    'cache-control': 'no-cache',
				},
			});
            console.log('Image uploaded:', JSON.stringify(response.data));
			toast({
				title: 'Image uploaded successfully',
				description: 'Your new image has been added to the unit.',
			});
			setFile(null); // Reset the file input
            router.refresh();
		} catch (error) {
			console.error('Error uploading image:', error);
			toast({
				title: 'Error uploading image',
				description: 'There was a problem uploading your image. Please try again.',
				variant: 'destructive',
			});
		} finally {
			setUploading(false);
		}
   };

   return (
		<div>
			<Label htmlFor='image-upload'>Upload New Image</Label>
			<div className='flex mt-2'>
				<Input
					id='image-upload'
					type='file'
					accept='image/*'
					onChange={handleFileChange}
                    multiple={true}
					disabled={uploading}
				/>
				<Button
					type='button'
					className='ml-2'
					onClick={() => {
                        handleUpload()
                    }
                    }
					disabled={uploading || !file}>
					{uploading ? (
						<>Uploading...</>
					) : (
						<>
							<Upload className='mr-2 h-4 w-4' /> Upload
						</>
					)}
				</Button>
			</div>
		</div>
   );
}