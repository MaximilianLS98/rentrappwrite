import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface Unit {
	id: string;
	name: string;
	type: 'Single' | 'Multi';
	totalUnits?: number;
	occupiedUnits?: number;
	status: 'Occupied' | 'Vacant' | 'Partially Occupied' | 'Maintenance';
	rent: number;
}

interface UnitListProps {
  units: Unit[]
}

function getOccupancy(unit: TUnit) {
  if (unit.status === 'Occupied') {
    return unit.tenant;
  } else if (unit.status === 'Partially Occupied') {
    return `${unit.tenant} + others`;
  } else {
    return 'No';
  }
}

type TProps = {
    units: {
        documents: TUnit[]
        total: number;
    }
};

type TUnit = {
  title: string;
  squaremeters: number;
  address: string;
  monthlyrent: number;
  deposit: number;
  housingtype: string;
  description: string;
  rating: number;
  owner: string;  
  status: string;
  tenant: string;
  bedrooms: number;
  bathrooms: number;
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  $databaseId: string;
  $collectionId: string;
};

// export function UnitList({ units }: UnitListProps) {
export function UnitList(props:TProps) {
  const units = props.units.documents;
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Enheter</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Navn</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Utleid</TableHead>
              <TableHead className="text-right">Leie</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {units.map((unit) => (
              <TableRow key={unit.$id}>
                <TableCell className="font-medium">{unit.title}</TableCell>
                <TableCell>{unit.housingtype}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      unit.status === "Occupied"
                        ? "default"
                        : unit.status === "Vacant"
                          ? "secondary"
                          : unit.status === "Partially Occupied"
                            ? "outline"
                            : "destructive"
                    }
                  >
                    {unit.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {getOccupancy(unit)}
                </TableCell>
                <TableCell className="text-right">{unit.monthlyrent}NOK</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

