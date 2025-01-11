import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ResourceList from "./resources/ResourceList";
import AddResourceDialog from "./resources/AddResourceDialog";
import EditResourceDialog from "./resources/EditResourceDialog";
import { useResources } from "@/hooks/useResources";
import { useResourceMutations } from "@/hooks/useResourceMutations";

const ResourceManager = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<any>(null);

  const { data: resources, isLoading, refetch } = useResources();
  const { handleCreate, handleEdit, isSubmitting } = useResourceMutations(refetch);

  const handleEditClick = (resource: any) => {
    setSelectedResource(resource);
    setIsEditDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Resources</CardTitle>
        <AddResourceDialog
          isOpen={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onSubmit={handleCreate}
          isSubmitting={isSubmitting}
        />
      </CardHeader>
      <CardContent>
        <ResourceList 
          resources={resources} 
          isLoading={isLoading} 
          onEditClick={handleEditClick}
        />
        {selectedResource && (
          <EditResourceDialog
            resource={selectedResource}
            isOpen={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
            onSubmit={(formData, coverImage, pdfFile) => 
              handleEdit(selectedResource.id, formData, coverImage, pdfFile)
            }
            isSubmitting={isSubmitting}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default ResourceManager;