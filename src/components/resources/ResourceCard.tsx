import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import ResourceImage from './card/ResourceImage';
import ResourceMeta from './card/ResourceMeta';
import ResourceActions from './card/ResourceActions';

interface ResourceCardProps {
  resource: any;
  onBuyClick: (resource: any) => void;
}

const ResourceCard = ({ resource, onBuyClick }: ResourceCardProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  if (!resource) {
    return <Skeleton className="h-[400px] w-full" />;
  }

  const shareUrl = window.location.origin + window.location.pathname + '?resource=' + resource.id;

  return (
    <Card className="flex flex-col h-full">
      <ResourceMeta 
        title={resource.title}
        description={resource.description}
        imageUrl={imageUrl}
        shareUrl={shareUrl}
      />
      
      <CardHeader>
        <div className="relative aspect-[16/9] w-full bg-gray-100 rounded-t-lg mb-4 overflow-hidden">
          <ResourceImage resource={resource} />
        </div>
        <CardTitle className="text-xl line-clamp-2">{resource.title}</CardTitle>
        <CardDescription className="line-clamp-3">{resource.description}</CardDescription>
      </CardHeader>

      <CardContent>
        <ResourceActions 
          resource={resource}
          shareUrl={shareUrl}
          onBuyClick={onBuyClick}
        />
      </CardContent>
    </Card>
  );
};

export default ResourceCard;