import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ServiceRequest } from "@/types/service-request";

interface ServiceRequestTableProps {
  requests: ServiceRequest[];
  getStatusColor: (status: string) => string;
  getPriorityColor: (priority: string) => string;
}

export const ServiceRequestTable = ({
  requests,
  getStatusColor,
  getPriorityColor,
}: ServiceRequestTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Client</TableHead>
          <TableHead>Service</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Assigned To</TableHead>
          <TableHead>Cost</TableHead>
          <TableHead>Paid</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests?.map((request) => {
          const totalPaid = request.payments?.reduce(
            (sum, payment) =>
              sum + (payment.status === "completed" ? payment.amount : 0),
            0
          ) || 0;

          return (
            <TableRow key={request.id}>
              <TableCell className="font-medium">
                {request.id.slice(0, 8)}
              </TableCell>
              <TableCell>
                {request.profiles?.full_name}
                <br />
                <span className="text-sm text-muted-foreground">
                  {request.profiles?.email}
                </span>
              </TableCell>
              <TableCell>{request.service_types?.name}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(request.status)}>
                  {request.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={getPriorityColor(request.priority)}>
                  {request.priority}
                </Badge>
              </TableCell>
              <TableCell>{request.assigned?.full_name || "Unassigned"}</TableCell>
              <TableCell>${request.cost?.toFixed(2)}</TableCell>
              <TableCell>${totalPaid.toFixed(2)}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};