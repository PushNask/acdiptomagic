import { ImageIcon } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ResourceImageProps {
  resource: any;
}

const ResourceImage = ({ resource }: ResourceImageProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const loadImageUrl = async () => {
    try {
      if (!resource) {
        setIsLoading(false);
        return;
      }

      let imagePath = null;

      if (resource.resource_images?.[0]?.file_path) {
        imagePath = resource.resource_images[0].file_path;
      } else if (resource.cover_image) {
        imagePath = resource.cover_image;
      }

      if (!imagePath) {
        setIsLoading(false);
        setLoadError(true);
        return;
      }

      const { data: publicUrlData } = supabase
        .storage
        .from('product-images')
        .getPublicUrl(imagePath);

      if (publicUrlData?.publicUrl) {
        const img = new Image();
        
        img.onload = () => {
          setImageUrl(publicUrlData.publicUrl);
          setIsLoading(false);
          setLoadError(false);
        };

        img.onerror = () => {
          setImageUrl(null);
          setIsLoading(false);
          setLoadError(true);
        };

        img.src = publicUrlData.publicUrl;
      } else {
        setIsLoading(false);
        setLoadError(true);
      }
    } catch (error) {
      console.error('Error in loadImageUrl:', error);
      setIsLoading(false);
      setLoadError(true);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setLoadError(false);
    loadImageUrl();
  }, [resource]);

  if (isLoading) {
    return <Skeleton className="absolute inset-0" />;
  }

  if (!loadError && imageUrl) {
    return (
      <img 
        src={imageUrl}
        alt={resource.title}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
    );
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
      <ImageIcon className="h-12 w-12 text-gray-400" />
    </div>
  );
};

export default ResourceImage;