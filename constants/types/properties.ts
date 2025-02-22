import { TUnit } from './units';

const propertyFetch: TPropertyFetch = {
	total: 2,
	documents: [
		{
			name: 'Første property',
			address: 'Ekelyveien 1D',
			type: 'singlehome',
			owner: '671bf5b70024ad3767dc',
			$id: '67a7d8e30007be247652',
			$createdAt: '2025-02-08T22:21:23.288+00:00',
			$updatedAt: '2025-02-08T22:25:43.247+00:00',
			$permissions: [
				'read("user:671bf5b70024ad3767dc")',
				'update("user:671bf5b70024ad3767dc")',
				'delete("user:671bf5b70024ad3767dc")',
			],
			$databaseId: 'rentrdb',
			$collectionId: 'properties',
            units: [],
		},
		{
			name: 'Andre property',
			address: 'Pilestredet 29a',
			type: 'multiunit',
			owner: '671bf5b70024ad3767dc',
			$id: '67a7da1e003c330b5f50',
			$createdAt: '2025-02-08T22:26:39.131+00:00',
			$updatedAt: '2025-02-08T22:26:57.114+00:00',
			$permissions: [
				'read("user:671bf5b70024ad3767dc")',
				'update("user:671bf5b70024ad3767dc")',
				'delete("user:671bf5b70024ad3767dc")',
			],
			$databaseId: 'rentrdb',
			$collectionId: 'properties',
            units: [], 
		},
	],
};


type TPropertyFetch = {
    documents: TProperty[];
    total: number;
};

type TProperty = {
    name: string;
    address: string;
    type: 'singlehome' | 'multiunit';
    owner: string;
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    $permissions: string[];
    $databaseId: string;
    $collectionId: string;
    units: TUnit[] | null;
};

export type { TPropertyFetch, TProperty };