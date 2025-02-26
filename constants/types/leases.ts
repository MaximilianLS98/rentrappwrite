import { TUnit } from "./units";

const leasesFetchExample: TFetchLeases = {
	total: 1,
	documents: [
		{
			unit_id: '67292c210011d8300a4c',
			start_date: '2025-02-10T17:02:40.182+00:00',
			end_date: '2026-02-11T17:02:42.231+00:00',
			monthly_rent: 20000,
			tenant_id: null,
			$id: '67aa2339000c285c55b6',
			$createdAt: '2025-02-10T16:03:05.331+00:00',
			$updatedAt: '2025-02-23T13:54:31.473+00:00',
			$permissions: ['read("users")', 'update("users")', 'delete("users")'],
			units: {
				title: "Jonathan's rom",
				squaremeters: 10,
				address: 'Ekelyveien 1D',
				monthlyrent: 7500,
				deposit: null,
				housingtype: 'house',
				description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
				rating: 4.8,
				owner: '671bf5b70024ad3767dc',
				tenant: 'Ola Nordmann',
				bedrooms: 1,
				bathrooms: 1,
				status: 'vacant',
				$id: '67ba1f7c002d56601a7e',
				$createdAt: '2025-02-22T19:03:25.887+00:00',
				$updatedAt: '2025-02-22T21:11:05.197+00:00',
				$permissions: [
					'read("user:671bf5b70024ad3767dc")',
					'update("user:671bf5b70024ad3767dc")',
					'delete("user:671bf5b70024ad3767dc")',
				],
				properties: {
					name: 'Ekelyveien 1D',
					address: 'Ekelyveien 1D',
					type: 'multiunit',
					owner: '671bf5b70024ad3767dc',
					$id: '67a7d8e30007be247652',
					$createdAt: '2025-02-08T22:21:23.288+00:00',
					$updatedAt: '2025-02-22T20:54:34.431+00:00',
					$permissions: [
						'read("user:671bf5b70024ad3767dc")',
						'update("user:671bf5b70024ad3767dc")',
						'delete("user:671bf5b70024ad3767dc")',
					],
					$databaseId: 'rentrdb',
					$collectionId: 'properties',
                    units: null,
				},
				$databaseId: 'rentrdb',
				$collectionId: 'units',
			},
			$databaseId: 'rentrdb',
			$collectionId: 'leases',
		},
	],
};

export type TLease = {
    unit_id: string;
    start_date: string;
    end_date: string;
    monthly_rent: number;
    tenant_id: string | null;
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    $permissions: string[];
    units: TUnit;
    $databaseId: string;
    $collectionId: string;
}

export type TFetchLeases = {
    total: number;
    documents: TLease[],
}
