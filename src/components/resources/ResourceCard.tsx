import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

interface ResourceCardProps {
  resource: any;
  onBuyClick: (resource: any) => void;
}

const ResourceCard = ({ resource, onBuyClick }: ResourceCardProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadImageUrl = async () => {
      try {
        if (!resource) {
          setIsLoading(false);
          return;
        }

        // If the resource has associated images, use the first one
        if (resource.resource_images && resource.resource_images[0]) {
          const { data: publicUrl } = supabase
            .storage
            .from('product-images')
            .getPublicUrl(resource.resource_images[0].file_path);
          
          setImageUrl(publicUrl.publicUrl);
        } 
        // Use cover_image if no resource_images
        else if (resource.cover_image) {
          let finalImagePath = resource.cover_image;
          
          // Remove /lovable-uploads/ prefix if present
          if (finalImagePath.startsWith('/lovable-uploads/')) {
            finalImagePath = finalImagePath.replace('/lovable-uploads/', '');
          }
          
          const { data: publicUrl } = supabase
            .storage
            .from('product-images')
            .getPublicUrl(finalImagePath);
          
          console.log('Loading image for resource:', resource.id);
          console.log('Final image path:', finalImagePath);
          console.log('Public URL:', publicUrl);
          
          if (publicUrl) {
            setImageUrl(publicUrl.publicUrl);
          }
        }
      } catch (error) {
        console.error('Error loading image for resource:', error);
        toast.error('Error loading resource image');
      } finally {
        setIsLoading(false);
      }
    };

    loadImageUrl();
  }, [resource]);

  if (!resource) {
    return <Skeleton className="h-[400px] w-full" />;
  }

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="relative aspect-[16/9] w-full bg-gray-100 rounded-t-lg mb-4 overflow-hidden">
          {isLoading ? (
            <Skeleton className="absolute inset-0" />
          ) : imageUrl ? (
            <img 
              src={imageUrl}
              alt={resource.title}
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                console.error('Image load error for:', resource);
                setImageUrl(null);
              }}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
              <span className="text-gray-400">No image available</span>
            </div>
          )}
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
            onClick={() => onBuyClick(resource)}
            className="bg-primary hover:bg-primary/90"
          >
            Order Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourceCard;