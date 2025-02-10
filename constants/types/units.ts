type FetchUnit = {
    total: number;
    documents: TUnit[];
}

type TUnit = {
    name: string;
    short: string;
    description: string;
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    $permissions: string[];
    $databaseId: string;
    $collectionId: string;
}

export type { TUnit, FetchUnit };