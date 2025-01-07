import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { shopping-cart, dollar-sign } from 'lucide-react';
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";

const ResourceSales = () => {
  const { category } = useParams();
  const [selectedResource, setSelectedResource] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const { data: resources, isLoading, error } = useQuery({
    queryKey: ['resources', category],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <p>Loading resources...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-red-500">Error loading resources. Please try again later.</p>
        </div>
      </div>
    );
  }

  const handleBuyClick = (resource) => {
    setSelectedResource(resource);
    setIsDialogOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{category} Resources</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources?.map((resource) => (
          <Card key={resource.id} className="flex flex-col">
            <CardHeader>
              <div className="aspect-video w-full bg-gray-100 rounded-t-lg mb-4">
                {resource.cover_image ? (
                  <img 
                    src={resource.cover_image} 
                    alt={resource.title}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <shopping-cart className="h-12 w-12 text-gray-400" />
                  </div>
                )}
              </div>
              <CardTitle>{resource.title}</CardTitle>
              <CardDescription>{resource.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <div className="flex-1" />
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center">
                  <dollar-sign className="h-5 w-5 text-green-600 mr-1" />
                  <span className="text-xl font-bold">${resource.price}</span>
                </div>
                <Button onClick={() => handleBuyClick(resource)}>
                  Buy Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Purchase Instructions</DialogTitle>
            <DialogDescription>
              Follow these steps to access {selectedResource?.title}:
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm">
              1. Contact our sales team at <span className="font-medium">sales@acdito-push.com</span>
            </p>
            <p className="text-sm">
              2. Reference the resource: {selectedResource?.title}
            </p>
            <p className="text-sm">
              3. Price: ${selectedResource?.price}
            </p>
            <p className="text-sm">
              4. You'll receive access instructions within 24 hours after payment confirmation.
            </p>
            <Button 
              className="w-full"
              onClick={() => {
                window.location.href = `mailto:sales@acdito-push.com?subject=Purchase%20Request:%20${selectedResource?.title}&body=I'm%20interested%20in%20purchasing%20${selectedResource?.title}.%20Please%20provide%20payment%20instructions.`;
                setIsDialogOpen(false);
              }}
            >
              Contact Sales Team
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResourceSales;