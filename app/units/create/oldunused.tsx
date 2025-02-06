'use client';
import { Button } from '@/components/ui/button';
import { CreateRentalUnitComponent } from '@/components/create-rental-unit';

export default function Page() {
	return (
		// A page for creating a new unit, made with shadcnUI components and use-form hook
        <main className='flex justify-center items-center min-h-screen'>
            <section className='bg-secondary p-8 rounded-lg shadow-md w-full max-w-lg'>
                <h1 className='text-2xl font-bold mb-6 text-center'>Create a new unit</h1>
                <form className='space-y-4'>
                    <div>
                        <label
                            htmlFor='unitName'
                            className='block text-sm font-medium'>
                            Unit Name
                        </label>
                        <input
                            type='text'
                            id='unitName'
                            name='unitName'
                            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-accent sm:text-sm'
                        />
                    </div>
                    <div>
                        <label
                            htmlFor='unitDescription'
                            className='block text-sm font-medium'>
                            Unit Description
                        </label>
                        <textarea
                            id='unitDescription'
                            name='unitDescription'
                            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-accent sm:text-sm'
                        />
                    </div>
                    <div>
                        <label
                            htmlFor='unitPrice'
                            className='block text-sm font-medium'>
                            Unit Price
                        </label>
                        <input
                            type='number'
                            id='unitPrice'
                            name='unitPrice'
                            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-accent sm:text-sm'
                        />
                    </div>
                    <div>
                        <label
                            htmlFor='unitSize'
                            className='block text-sm font-medium'>
                            Unit Size
                        </label>
                        <input
                            type='number'
                            id='unitSize'
                            name='unitSize'
                            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-accent sm:text-sm'
                        />
                    </div>
                    <div>
                        <label
                            htmlFor='unitType'
                            className='block text-sm font-medium'>
                            Unit Type
                        </label>
                        <select
                            id='unitType'
                            name='unitType'
                            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-accent sm:text-sm'>
                            <option value='apartment'>Apartment</option>
                            <option value='house'>House</option>
                            <option value='condo'>Condo</option>
                        </select>
                    </div>
                    <div>
                        <label
                            htmlFor='unitLocation'
                            className='block text-sm font-medium'>
                            Unit Location
                        </label>
                        <input
                            type='text'
                            id='unitLocation'
                            name='unitLocation'
                            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-accent sm:text-sm'
                        />
                    </div>
                    <div>
                        <label
                            htmlFor='unitImages'
                            className='block text-sm font-medium'>
                            Unit Images
                        </label>
                        <input
                            type='file'
                            id='unitImages'
                            name='unitImages'
                            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-accent sm:text-sm'
                        />
                    </div>
                    <Button
                        type='submit'
                        className='w-full py-2 px-4 font-semibold rounded-md shadow-md hover:bg-secondary-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
                        Create Unit
                    </Button>
                </form>
            </section>
        </main>
	);
}
