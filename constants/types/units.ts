import { TProperty } from "./properties";
import { TImageMetaData } from "./imageMetaData";

type FetchUnit = {
    total: number;
    documents: TUnit[];
}

// type TUnit = {
//     title: string;
//     short: string;
//     description: string;
//     address: string;
//     $id: string;
//     $createdAt: string;
//     $updatedAt: string;
//     $permissions: string[];
//     $databaseId: string;
//     $collectionId: string;
// }

const exampleUnit: TUnit = {
      "title": "Kam'yanka-Buzka",
      "squaremeters": 45,
      "address": "Narodnogo opolchennya",
      "monthlyrent": 15400,
      "deposit": 291,
      "housingtype": "apartment",
      "description": "Random Description",
      "rating": 3,
      "owner": "671bf5b70024ad3767dc",
      "status": "Occupied",
      "tenant": "Tvorislava",
      "bedrooms": 2,
      "bathrooms": 1,
      "$id": "67292c210011d8300a4c",
      "$createdAt": "2024-11-04T20:18:41.546+00:00",
      "$updatedAt": "2025-02-11T15:22:47.740+00:00",
      "$permissions": [
        "read(\"user:671bf5b70024ad3767dc\")",
        "update(\"user:671bf5b70024ad3767dc\")",
        "delete(\"user:671bf5b70024ad3767dc\")"
      ],
      "properties": null,
      "$databaseId": "rentrdb",
      "$collectionId": "units"
    };

type TUnit = {
    title: string;
    squaremeters: number;
    address: string;
    monthlyrent: number;
    deposit: number | null;
    housingtype?: string;
    description: string;
    rating?: number;
    owner: string;
    status: string;
    tenant: string;
    bedrooms?: number;
    bathrooms?: number;
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    $permissions: string[];
    properties: TProperty | null | string;
    $databaseId: string;
    $collectionId: string;
    unitNumber?: string;
    images?: TImageMetaData[];
}

export type { TUnit, FetchUnit };