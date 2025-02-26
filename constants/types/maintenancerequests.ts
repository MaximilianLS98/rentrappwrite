import { TUnit } from './units';

const fetchedData = {
  "total": 1,
  "documents": [
    {
      "title": "Leaky faucet",
      "description": "The faucet in the kitchen is leaking",
      "status": "backlog",
      "type": "Plumbing",
      "$id": "67ac6a8200241c6f90b0",
      "$createdAt": "2025-02-12T09:31:46.739+00:00",
      "$updatedAt": "2025-02-12T09:32:15.693+00:00",
      "$permissions": [
        "read(\"user:671bf5b70024ad3767dc\")",
        "update(\"user:671bf5b70024ad3767dc\")",
        "delete(\"user:671bf5b70024ad3767dc\")"
      ],
      "units": null,
      "$databaseId": "rentrdb",
      "$collectionId": "maintenancerequests"
    }
  ]
}

type TFetchMaintenanceRequests = {
    total: number;
    documents: TMaintenanceRequest[];
};


type TMaintenanceRequest = {
	title: string;
	description: string;
	priority: 'low' | 'medium' | 'high' | 'critical';
	status: 'open' | 'inprogress' | 'closed' | 'backlog';
	type: string;
	$id: string;
	$createdAt: string;
	$updatedAt: string;
	$permissions: string[];
	units: TUnit;
	$databaseId: string;
	$collectionId: string;
};

export type { TFetchMaintenanceRequests, TMaintenanceRequest };