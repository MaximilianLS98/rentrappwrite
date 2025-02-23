import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { currencyFormatter } from "@/utils/helpers"
import { FetchUnit, TUnit } from "@/constants/types/units"

function getOccupancy(unit: TUnit) {
  if (unit.status === 'Occupied') {
    return unit.tenant;
  } else if (unit.status === 'Partially Occupied') {
    return `${unit.tenant} + others`;
  } else {
    return 'No';
  }
}

type Props = {
  units: FetchUnit;
}

// export function UnitList({ units }: UnitListProps) {
export function UnitList({ units }: Props) {
  // const units = props.units.documents;
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
              <TableHead>Leietaker</TableHead>
              <TableHead className="text-right">Leie</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {units.documents.map((unit) => (
              <TableRow key={unit.$id}>
                <TableCell className="font-medium">{unit.title}</TableCell>
                <TableCell>{unit.housingtype}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      unit.status === "vacant"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {unit.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {unit.tenant}
                </TableCell>
                <TableCell className="text-right">{currencyFormatter(unit.monthlyrent, false)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

