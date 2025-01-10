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
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) throw sessionError;

      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please log in to download resources.",
          variant: "destructive",
        });
        return;
      }

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
          used_by_user_id: session.user.id,
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

      const { error: purchaseError } = await supabase
        .from('user_purchases')
        .insert({
          user_id: session.user.id,
          resource_id: selectedResource.id,
          expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
        });

      if (purchaseError) {
        console.error('Error creating purchase record:', purchaseError);
        toast({
          title: "Warning",
          description: "Your download will proceed, but there was an issue recording the purchase.",
          variant: "destructive",
        });
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