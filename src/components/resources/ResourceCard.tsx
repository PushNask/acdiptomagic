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
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;

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
      } 
      // If no resource_images, try cover_image
      else if (resource.cover_image) {
        imagePath = resource.cover_image;
      }

      if (!imagePath) {
        setIsLoading(false);
        return;
      }

      // Clean the path
      imagePath = imagePath.replace(/^\/+/, '').replace(/^lovable-uploads\//, '');

      const { data, error } = await supabase
        .storage
        .from('product-images')
        .createSignedUrl(imagePath, 3600); // 1 hour expiration

      if (error) {
        console.error('Error creating signed URL:', error);
        setIsLoading(false);
        return;
      }

      if (data?.signedUrl) {
        const img = new Image();
        img.crossOrigin = "anonymous";
        
        img.onload = () => {
          setImageUrl(data.signedUrl);
          setIsLoading(false);
          setRetryCount(0); // Reset retry count on success
        };

        img.onerror = () => {
          console.error('Error loading image:', imagePath);
          if (retryCount < MAX_RETRIES) {
            setRetryCount(prev => prev + 1);
            setTimeout(loadImageUrl, 1000 * (retryCount + 1)); // Exponential backoff
          } else {
            setImageUrl(null);
            setIsLoading(false);
            toast.error('Error loading resource image');
          }
        };

        img.src = data.signedUrl;
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error in loadImageUrl:', error);
      setIsLoading(false);
      toast.error('Error loading resource image');
    }
  };

  useEffect(() => {
    loadImageUrl();
  }, [resource, retryCount]);

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