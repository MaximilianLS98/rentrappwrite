import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface MaintenanceRequest {
	id: string;
	unit: string;
  description: string;
	priority: 'Low' | 'Medium' | 'High';
	status: 'Open' | 'In Progress' | 'Closed';
}

interface MaintenanceRequestsProps {
  requests: MaintenanceRequest[]
}

export function MaintenanceRequests({ requests }: MaintenanceRequestsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Maintenance Requests</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {requests.map((request) => (
            <div key={request.id} className="flex items-center justify-between border-b pb-2">
              <div>
                <p className="font-medium">{request.unit}</p>
                <p className="text-sm text-muted-foreground">{request.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge
                  variant={
                    request.priority === "High"
                      ? "destructive"
                      : request.priority === "Medium"
                        ? "default"
                        : "secondary"
                  }
                >
                  {request.priority}
                </Badge>
                <Badge
                  variant={
                    request.status === "Open" ? "outline" : request.status === "In Progress" ? "default" : "secondary"
                  }
                >
                  {request.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

