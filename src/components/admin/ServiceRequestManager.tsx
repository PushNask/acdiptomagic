import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ServiceRequestTable } from "./service-requests/ServiceRequestTable";
import { useServiceRequests } from "./service-requests/useServiceRequests";
import { LoadingState } from "./service-requests/LoadingState";
import { ErrorState } from "./service-requests/ErrorState";
import { getStatusColor, getPriorityColor } from "./service-requests/utils";

const ServiceRequestManager = () => {
  const { data: requests, isLoading, error } = useServiceRequests();

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Service Requests</CardTitle>
      </CardHeader>
      <CardContent>
        <ServiceRequestTable
          requests={requests}
          getStatusColor={getStatusColor}
          getPriorityColor={getPriorityColor}
        />
      </CardContent>
    </Card>
  );
};

export default ServiceRequestManager;