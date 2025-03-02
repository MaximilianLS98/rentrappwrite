const exampleFetch =  {
              name: "LBM high res.jpeg",
              type: "image/jpeg",
              size: 9003676,
              $id: "67aa4a5b001a61d30865",
              $createdAt: "2025-02-10T18:50:05.148+00:00",
              $updatedAt: "2025-03-02T20:59:50.135+00:00",
              $permissions: [
                "read(\"user:671bf5b70024ad3767dc\")",
                "update(\"user:671bf5b70024ad3767dc\")",
                "delete(\"user:671bf5b70024ad3767dc\")"
              ],
              $databaseId: "rentrdb",
              $collectionId: "imagemetadata"
            };


type TImageMetaData = {
    name: string;
    type: string;
    size: number;
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    $permissions: string[];
    $databaseId: string;
    $collectionId: string;
}

type TFetchImageMetaData = {
    total: number;
    documents: TImageMetaData[];
}

export type { TImageMetaData, TFetchImageMetaData };