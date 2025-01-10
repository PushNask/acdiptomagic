import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

interface PurchaseActionsProps {
  onContactSales: () => void;
  selectedResource: any;
  onOpenChange: (open: boolean) => void;
}

const PurchaseActions = ({ onContactSales, selectedResource, onOpenChange }: PurchaseActionsProps) => {
  return (
    <div className="flex gap-4">
      <Button 
        className="flex-1"
        onClick={onContactSales}
      >
        <Phone className="mr-2 h-4 w-4" />
        Call Sales Team
      </Button>
      <Button 
        className="flex-1"
        variant="outline"
        onClick={() => {
          window.location.href = `https://wa.me/237671154588?text=I'm%20interested%20in%20purchasing%20${selectedResource?.title}.%20Please%20provide%20payment%20instructions.`;
          onOpenChange(false);
        }}
      >
        Send WhatsApp Message
      </Button>
    </div>
  );
};

export default PurchaseActions;