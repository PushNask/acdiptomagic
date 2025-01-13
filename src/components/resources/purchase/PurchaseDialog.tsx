import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import PurchaseInstructions from "./PurchaseInstructions";
import PurchaseCodeInput from "./PurchaseCodeInput";
import PurchaseActions from "./PurchaseActions";

interface PurchaseDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedResource: any | null;
}

const PurchaseDialog = ({ isOpen, onOpenChange, selectedResource }: PurchaseDialogProps) => {
  const { toast } = useToast();
  const [purchaseCode, setPurchaseCode] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [showCodeInput, setShowCodeInput] = useState(false);

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

  const handleDownload = async () => {
    if (!purchaseCode || purchaseCode.length !== 8) {
      toast({
        title: "Invalid Code",
        description: "Please enter a valid 8-character purchase code.",
        variant: "destructive",
      });
      return;
    }

    if (!contactInfo) {
      toast({
        title: "Contact Information Required",
        description: "Please enter your email address or phone number.",
        variant: "destructive",
      });
      return;
    }

    const codeFormat = /^[A-Z0-9]{8}$/;
    if (!codeFormat.test(purchaseCode)) {
      toast({
        title: "Invalid Code Format",
        description: "Purchase code must contain only uppercase letters and numbers.",
        variant: "destructive",
      });
      return;
    }

    setIsVerifying(true);
    try {
      const { data: codeData, error: codeError } = await supabase
        .from('purchase_codes')
        .select('*')
        .eq('code', purchaseCode)
        .eq('is_used', false)
        .single();

      if (codeError || !codeData) {
        toast({
          title: "Invalid Code",
          description: "This code is invalid or has already been used.",
          variant: "destructive",
        });
        return;
      }

      const { error: updateError } = await supabase
        .from('purchase_codes')
        .update({
          is_used: true,
          used_at: new Date().toISOString(),
          contact_info: contactInfo,
          used_for_resource_id: selectedResource.id
        })
        .eq('id', codeData.id)
        .eq('is_used', false);

      if (updateError) {
        console.error('Error updating purchase code:', updateError);
        toast({
          title: "Error",
          description: "Failed to process the purchase code. Please try again.",
          variant: "destructive",
        });
        return;
      }

      const link = document.createElement('a');
      link.href = selectedResource.file_url;
      link.download = selectedResource.title;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Success!",
        description: "Your download has started. The purchase code has been marked as used.",
      });

      onOpenChange(false);
      setPurchaseCode("");
      setContactInfo("");
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Error",
        description: "An error occurred while processing your request.",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Order Instructions</DialogTitle>
        </DialogHeader>
        
        <PurchaseInstructions selectedResource={selectedResource} />
        
        {!showCodeInput ? (
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => setShowCodeInput(true)}
          >
            I already have a purchase code
          </Button>
        ) : (
          <PurchaseCodeInput
            purchaseCode={purchaseCode}
            setPurchaseCode={setPurchaseCode}
            contactInfo={contactInfo}
            setContactInfo={setContactInfo}
            isVerifying={isVerifying}
            onDownload={handleDownload}
          />
        )}

        <PurchaseActions
          onContactSales={handleContactSales}
          selectedResource={selectedResource}
          onOpenChange={onOpenChange}
        />
      </DialogContent>
    </Dialog>
  );
};

export default PurchaseDialog;