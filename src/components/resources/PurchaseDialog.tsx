import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Phone } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface PurchaseDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedResource: any | null;
}

const PurchaseDialog = ({ isOpen, onOpenChange, selectedResource }: PurchaseDialogProps) => {
  const { toast } = useToast();

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
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
                onOpenChange(false);
              }}
            >
              Send WhatsApp Message
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PurchaseDialog;