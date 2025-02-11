import Link from 'next/link';
import { cookies } from 'next/headers';

export default async function() {
    const session = (await cookies()).get('session')?.value as string;

    const properties = {
        total: 0,
        documents: [],
    };

    return (
        <div className='container'>
            {properties.total === 0 ? (
                <div>
                    <h1>No properties found</h1>
                    <Link href='/properties/new'>
                        Create property
                    </Link>
                </div>
            ) : (
                <h1>Create a new property page</h1>
            )}
        </div>
    );
}