export interface ServiceRequest {
  id: string;
  status: string;
  priority: string;
  cost?: number;
  service_types?: {
    name: string;
    base_cost: number;
  };
  profiles?: {
    full_name: string;
    email: string;
  };
  assigned?: {
    full_name: string;
  };
  payments?: Array<{
    amount: number;
    status: string;
  }>;
}