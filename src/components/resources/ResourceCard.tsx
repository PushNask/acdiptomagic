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

  const loadImageUrl = async () => {
    try {
      if (!resource) {
        setIsLoading(false);
        return;
      }

      let imagePath = null;

      // First try to get image from resource_images
      if (resource.resource_images?.[0]?.file_path) {
        imagePath = resource.resource_images[0].file_path;
        console.log('Using resource_images path:', imagePath);
      } 
      // If no resource_images, try cover_image
      else if (resource.cover_image) {
        imagePath = resource.cover_image;
        console.log('Using cover_image path:', imagePath);
      }

      if (!imagePath) {
        console.log('No image path found for resource:', resource.id);
        setIsLoading(false);
        return;
      }

      // Log the full resource object for debugging
      console.log('Resource object:', resource);

      // Get public URL directly since bucket is public
      const { data } = supabase
        .storage
        .from('product-images')
        .getPublicUrl(imagePath);

      if (data?.publicUrl) {
        console.log('Generated public URL:', data.publicUrl);
        
        // Verify the URL is accessible
        const response = await fetch(data.publicUrl, { method: 'HEAD' });
        if (!response.ok) {
          throw new Error(`Image URL returned status ${response.status}`);
        }

        const img = new Image();
        img.crossOrigin = "anonymous";
        
        img.onload = () => {
          console.log('Image loaded successfully:', data.publicUrl);
          setImageUrl(data.publicUrl);
          setIsLoading(false);
        };

        img.onerror = (error) => {
          console.error('Error loading image:', {
            imagePath,
            publicUrl: data.publicUrl,
            error
          });
          setImageUrl(null);
          setIsLoading(false);
          toast.error('Error loading resource image');
        };

        img.src = data.publicUrl;
      } else {
        console.error('No public URL generated for path:', imagePath);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error in loadImageUrl:', {
        resourceId: resource?.id,
        error
      });
      setIsLoading(false);
      toast.error('Error loading resource image');
    }
  };

  useEffect(() => {
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
              loading="lazy"
              crossOrigin="anonymous"
              onError={(e) => {
                console.error('Image render error:', {
                  src: imageUrl,
                  error: e
                });
                const target = e.target as HTMLImageElement;
                target.onerror = null; // Prevent infinite error loop
                setImageUrl(null);
                toast.error('Error displaying resource image');
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