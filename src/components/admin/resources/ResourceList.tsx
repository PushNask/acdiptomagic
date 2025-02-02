import { AlertCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditResourceDialog from "./EditResourceDialog";

interface ResourceListProps {
  resources: any[];
  isLoading: boolean;
  onEditClick: (resource: any) => void;
}

const ResourceList = ({ resources, isLoading, onEditClick }: ResourceListProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-muted-foreground animate-pulse" />
          <span className="text-muted-foreground">Loading resources...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Purchases</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {resources?.map((resource) => (
            <TableRow key={resource.id}>
              <TableCell className="font-medium">{resource.title}</TableCell>
              <TableCell>{resource.category}</TableCell>
              <TableCell>${resource.price.toFixed(2)}</TableCell>
              <TableCell>{resource.user_purchases?.length || 0}</TableCell>
              <TableCell>
                {new Date(resource.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <EditResourceDialog
                  resource={resource}
                  isOpen={false}
                  onOpenChange={() => {}}
                  onSubmit={async () => {}}
                  isSubmitting={false}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ResourceList;