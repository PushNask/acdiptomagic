import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import ResourceList from "./resources/ResourceList";
import AddResourceDialog from "./resources/AddResourceDialog";
import EditResourceDialog from "./resources/EditResourceDialog";

const ResourceManager = () => {
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedResource, setSelectedResource] = useState<any>(null);

  const { data: resources, isLoading, refetch } = useQuery({
    queryKey: ["adminResources"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("resources")
        .select(`
          *,
          resource_images (
            file_path
          ),
          user_purchases (
            id
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const handleCreate = async (formData: any, coverImage: File | null, pdfFile: File | null) => {
    setIsSubmitting(true);

    try {
      let coverImageUrl = "";
      let fileUrl = "";
      
      if (pdfFile) {
        const fileExt = "pdf";
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('digital-products')
          .upload(filePath, pdfFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('digital-products')
          .getPublicUrl(filePath);

        fileUrl = publicUrl;
      }

      if (coverImage) {
        const fileExt = coverImage.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(filePath, coverImage);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath);

        coverImageUrl = publicUrl;
      }

      const { error } = await supabase.from("resources").insert([
        {
          title: formData.title,
          description: formData.description,
          category: formData.category,
          price: parseFloat(formData.price),
          file_url: fileUrl,
          cover_image: coverImageUrl,
        },
      ]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Resource created successfully",
      });

      setIsAddDialogOpen(false);
      refetch();
    } catch (error) {
      console.error("Error creating resource:", error);
      toast({
        title: "Error",
        description: "Failed to create resource. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = async (formData: any, coverImage: File | null, pdfFile: File | null) => {
    if (!selectedResource) return;
    setIsSubmitting(true);

    try {
      const updates: any = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        price: parseFloat(formData.price),
      };

      if (pdfFile) {
        const fileExt = "pdf";
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('digital-products')
          .upload(filePath, pdfFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('digital-products')
          .getPublicUrl(filePath);

        updates.file_url = publicUrl;
      }

      if (coverImage) {
        const fileExt = coverImage.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(filePath, coverImage);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath);

        updates.cover_image = publicUrl;
      }

      const { error } = await supabase
        .from("resources")
        .update(updates)
        .eq("id", selectedResource.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Resource updated successfully",
      });

      setIsEditDialogOpen(false);
      refetch();
    } catch (error) {
      console.error("Error updating resource:", error);
      toast({
        title: "Error",
        description: "Failed to update resource. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
            onSubmit={handleEdit}
            isSubmitting={isSubmitting}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default ResourceManager;