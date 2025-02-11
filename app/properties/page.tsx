import { axiosInstance } from '@/utils/axios';
import { cookies } from 'next/headers';
import { Card, CardContent, CardFooter, CardHeader, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import { Suspense } from 'react';
import Dashboard from '@/app/properties/dashboard';
import { getAllProperties } from '@/actions/properties';
import { getAllUnits } from '@/actions/units';

type PropertyFetch = {
    total: number;
    documents: Property[];
}

type Property = {
	name: string;
	address: string;
	type: string;
	owner: string;
	$id: string;
	$createdAt: string;
	$updatedAt: string;
	$permissions: string[];
	$databaseId: string;
	$collectionId: string;
};

type UnitFetch = {
    total: number;
    documents: Unit[];
}

type Unit = {
    name: string;
    type: string;
    owner: string;
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    $permissions: string[];
    $databaseId: string;
    $collectionId: string;
};

export default async function Page() {
	const session = (await cookies()).get('session')?.value as string;

    const units = await getAllUnits(session) as UnitFetch;
    const properties = await getAllProperties(session) as PropertyFetch;

	return (
		<div className='container'>
            {properties.total === 0 ? (
                <div>
                    <h1>No properties found</h1>
                    <Link href='/properties/new'>
                        <a className='btn btn-primary'>Create property</a>
                    </Link>
                </div>
            ) : (
                <Dashboard properties={properties} units={units} />
            )}
		</div>
	);
}
