import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import ResourceList from "./resources/ResourceList";
import AddResourceDialog from "./resources/AddResourceDialog";

const ResourceManager = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (formData: any, coverImage: File | null, pdfFile: File | null) => {
    setIsSubmitting(true);

    try {
      let coverImageUrl = "";
      let fileUrl = "";
      
      // Upload PDF file
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

      // Upload cover image
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

      setIsDialogOpen(false);
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

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Resources</CardTitle>
        <AddResourceDialog
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </CardHeader>
      <CardContent>
        <ResourceList resources={resources} isLoading={isLoading} />
      </CardContent>
    </Card>
  );
};

export default ResourceManager;