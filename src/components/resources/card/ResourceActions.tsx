import { Button } from "@/components/ui/button";
import { DollarSign } from 'lucide-react';
import ShareButtons from "@/components/shared/ShareButtons";

interface ResourceActionsProps {
  resource: any;
  shareUrl: string;
  onBuyClick: (resource: any) => void;
}

const ResourceActions = ({ resource, shareUrl, onBuyClick }: ResourceActionsProps) => {
  return (
    <div className="flex-1 flex flex-col">
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
    </div>
  );
};

export default ResourceActions;