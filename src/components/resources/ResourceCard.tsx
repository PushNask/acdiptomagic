import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, ImageIcon } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from "@/components/ui/skeleton";
import ShareButtons from "@/components/shared/ShareButtons";
import { Helmet } from 'react-helmet';

interface ResourceCardProps {
  resource: any;
  onBuyClick: (resource: any) => void;
}

const ResourceCard = ({ resource, onBuyClick }: ResourceCardProps) => {
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

  if (!resource) {
    return <Skeleton className="h-[400px] w-full" />;
  }

  const shareUrl = window.location.origin + window.location.pathname + '?resource=' + resource.id;

  return (
    <>
      <Helmet>
        <meta property="og:title" content={resource.title} />
        <meta property="og:description" content={resource.description} />
        {imageUrl && <meta property="og:image" content={imageUrl} />}
        <meta property="og:url" content={shareUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={resource.title} />
        <meta name="twitter:description" content={resource.description} />
        {imageUrl && <meta name="twitter:image" content={imageUrl} />}
      </Helmet>

      <Card className="flex flex-col h-full">
        <CardHeader>
          <div className="relative aspect-[16/9] w-full bg-gray-100 rounded-t-lg mb-4 overflow-hidden">
            {isLoading ? (
              <Skeleton className="absolute inset-0" />
            ) : !loadError && imageUrl ? (
              <img 
                src={imageUrl}
                alt={resource.title}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                <ImageIcon className="h-12 w-12 text-gray-400" />
              </div>
            )}
          </div>
          <CardTitle className="text-xl line-clamp-2">{resource.title}</CardTitle>
          <CardDescription className="line-clamp-3">{resource.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <div className="flex-1" />
          <ShareButtons 
            url={shareUrl}
            title={resource.title}
            description={resource.description || ''}
          />
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
    </>
  );
};

export default ResourceCard;