import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from 'react';
import ResourceCard from '@/components/resources/ResourceCard';
import PurchaseDialog from '@/components/resources/purchase/PurchaseDialog';

const ResourceSales = () => {
  const { category } = useParams();
  const [selectedResource, setSelectedResource] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: resources, isLoading, error } = useQuery({
    queryKey: ['resources', category],
    queryFn: async () => {
      const { data: resourcesData, error: resourcesError } = await supabase
        .from('resources')
        .select(`
          *,
          resource_images (
            file_path,
            file_name
          )
        `)
        .eq('category', category)
        .order('created_at', { ascending: false });

      if (resourcesError) {
        console.error('Error fetching resources:', resourcesError);
        throw resourcesError;
      }
      
      console.log('Resources data:', resourcesData);
      return resourcesData;
    },
  });

  const handleBuyClick = (resource: any) => {
    setSelectedResource(resource);
    setIsDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-[200px] w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    console.error('Error loading resources:', error);
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-red-500">Error loading resources. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{category} Resources</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources?.map((resource) => (
          <ResourceCard 
            key={resource.id} 
            resource={resource} 
            onBuyClick={handleBuyClick}
          />
        ))}
      </div>

      <PurchaseDialog 
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        selectedResource={selectedResource}
      />
    </div>
  );
};

export default ResourceSales;
