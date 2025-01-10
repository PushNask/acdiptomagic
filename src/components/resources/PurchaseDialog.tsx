import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Phone, Download } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

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
    if (!purchaseCode || purchaseCode.length !== 6) {
      toast({
        title: "Invalid Code",
        description: "Please enter a valid 6-digit purchase code.",
        variant: "destructive",
      });
      return;
    }

    setIsVerifying(true);
    try {
      // Get current user session first
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        throw sessionError;
      }

      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please log in to download resources.",
          variant: "destructive",
        });
        return;
      }

      // Then verify the purchase code
      const { data: codeData, error: codeError } = await supabase
        .from('purchase_codes')
        .select('*')
        .eq('code', purchaseCode)
        .eq('is_used', false)
        .single();

      if (codeError) {
        throw codeError;
      }

      if (!codeData) {
        toast({
          title: "Invalid Code",
          description: "This code is invalid or has already been used.",
          variant: "destructive",
        });
        return;
      }

      // Mark the code as used
      const { error: updateError } = await supabase
        .from('purchase_codes')
        .update({
          is_used: true,
          used_at: new Date().toISOString(),
          used_by_user_id: session.user.id,
          used_for_resource_id: selectedResource.id
        })
        .eq('id', codeData.id);

      if (updateError) {
        throw updateError;
      }

      // Create a user purchase record
      const { error: purchaseError } = await supabase
        .from('user_purchases')
        .insert({
          user_id: session.user.id,
          resource_id: selectedResource.id,
          expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() // 1 year access
        });

      if (purchaseError) {
        console.error('Error creating purchase record:', purchaseError);
      }

      // Trigger the download
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
            4. You'll receive a purchase code within 24 hours after payment confirmation.
          </p>
          
          {!showCodeInput ? (
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setShowCodeInput(true)}
            >
              <Download className="mr-2 h-4 w-4" />
              I already have a purchase code
            </Button>
          ) : (
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Enter your 6-digit purchase code"
                value={purchaseCode}
                onChange={(e) => setPurchaseCode(e.target.value.slice(0, 6))}
                maxLength={6}
              />
              <Button 
                className="w-full"
                onClick={handleDownload}
                disabled={isVerifying}
              >
                <Download className="mr-2 h-4 w-4" />
                {isVerifying ? "Verifying..." : "Download"}
              </Button>
            </div>
          )}

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