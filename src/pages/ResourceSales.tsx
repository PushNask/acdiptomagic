import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ShoppingCart, DollarSign, Phone } from 'lucide-react';
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const ResourceSales = () => {
  const { category } = useParams();
  const [selectedResource, setSelectedResource] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const { data: resources, isLoading, error } = useQuery({
    queryKey: ['resources', category],
    queryFn: async () => {
      // First, get the resources
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

      if (resourcesError) throw resourcesError;
      
      console.log('Resources data:', resourcesData); // Debug log
      return resourcesData;
    },
  });

  const getImageUrl = async (resource) => {
    if (!resource) return '/placeholder.svg';

    // If the resource has associated images, use the first one
    if (resource.resource_images && resource.resource_images[0]) {
      const { data: publicUrl } = supabase
        .storage
        .from('product-images')
        .getPublicUrl(resource.resource_images[0].file_path);
      
      console.log('Public URL:', publicUrl); // Debug log
      return publicUrl.publicUrl;
    }

    // Fallback to cover_image if no resource_images
    if (resource.cover_image) {
      if (resource.cover_image.startsWith('http')) {
        return resource.cover_image;
      }
      
      const { data: publicUrl } = supabase
        .storage
        .from('product-images')
        .getPublicUrl(resource.cover_image);
      
      return publicUrl.publicUrl;
    }

    // Final fallback
    return '/placeholder.svg';
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-[200px] w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4 mt-4" />
                <Skeleton className="h-4 w-full mt-2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-full mt-4" />
              </CardContent>
            </Card>
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

  const handleBuyClick = (resource) => {
    setSelectedResource(resource);
    setIsDialogOpen(true);
  };

  const handleContactSales = () => {
    if (selectedResource) {
      const phoneNumber = "+237671154588";
      window.location.href = `tel:${phoneNumber}`;
      toast({
        title: "Contact Sales",
        description: "Redirecting to phone call...",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{category} Resources</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources?.map((resource) => (
          <Card key={resource.id} className="flex flex-col">
            <CardHeader>
              <div className="relative aspect-[16/9] w-full bg-gray-100 rounded-t-lg mb-4 overflow-hidden">
                <img 
                  src={getImageUrl(resource)}
                  alt={resource.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    console.error('Image load error for:', resource);
                    e.currentTarget.src = '/placeholder.svg';
                  }}
                />
              </div>
              <CardTitle className="text-xl line-clamp-2">{resource.title}</CardTitle>
              <CardDescription className="line-clamp-3">{resource.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <div className="flex-1" />
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-green-600 mr-1" />
                  <span className="text-xl font-bold">${resource.price.toFixed(2)}</span>
                </div>
                <Button 
                  onClick={() => handleBuyClick(resource)}
                  className="bg-primary hover:bg-primary/90"
                >
                  Order Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Order Instructions</DialogTitle>
            <DialogDescription>
              Follow these steps to get your copy of {selectedResource?.title}:
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm">
              1. Contact our sales team at <span className="font-medium">+237 671 154 588</span>
            </p>
            <p className="text-sm">
              2. Reference the resource: {selectedResource?.title}
            </p>
            <p className="text-sm">
              3. Price: ${selectedResource?.price?.toFixed(2)}
            </p>
            <p className="text-sm">
              4. You'll receive access instructions within 24 hours after payment confirmation.
            </p>
            <div className="flex gap-4">
              <Button 
                className="flex-1"
                onClick={handleContactSales}
              >
                <Phone className="mr-2 h-4 w-4" />
                Call Sales Team
              </Button>
              <Button 
                className="flex-1"
                variant="outline"
                onClick={() => {
                  window.location.href = `https://wa.me/237671154588?text=I'm%20interested%20in%20purchasing%20${selectedResource?.title}.%20Please%20provide%20payment%20instructions.`;
                  setIsDialogOpen(false);
                }}
              >
                Send WhatsApp Message
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResourceSales;