import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertCircle } from "lucide-react";

const ServiceRequestManager = () => {
  const { data: requests, isLoading } = useQuery({
    queryKey: ["serviceRequests"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("service_requests")
        .select(`
          *,
          service_types (
            name,
            base_cost
          ),
          profiles!service_requests_client_id_fkey (
            full_name,
            email
          ),
          assigned:profiles!service_requests_assigned_to_fkey (
            full_name
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const getStatusColor = (status: string) => {
    const colors = {
      new: "bg-purple-100 text-purple-800",
      in_progress: "bg-blue-100 text-blue-800",
      pending_payment: "bg-yellow-100 text-yellow-800",
      completed: "bg-green-100 text-green-800",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      high: "bg-red-100 text-red-800",
      medium: "bg-yellow-100 text-yellow-800",
      low: "bg-green-100 text-green-800",
    };
    return colors[priority as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-muted-foreground animate-pulse" />
          <span className="text-muted-foreground">Loading requests...</span>
        </div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Service Requests</CardTitle>
      </CardHeader>
      <CardContent>
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
            {requests?.map((request) => (
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
                <TableCell>${request.paid_amount?.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ServiceRequestManager;