import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface PurchaseCodeInputProps {
  purchaseCode: string;
  setPurchaseCode: (code: string) => void;
  contactInfo: string;
  setContactInfo: (info: string) => void;
  isVerifying: boolean;
  onDownload: () => void;
}

const PurchaseCodeInput = ({ 
  purchaseCode, 
  setPurchaseCode,
  contactInfo,
  setContactInfo,
  isVerifying, 
  onDownload 
}: PurchaseCodeInputProps) => {
  return (
    <div className="space-y-4">
      <Input
        type="text"
        placeholder="Enter your 8-character purchase code"
        value={purchaseCode}
        onChange={(e) => setPurchaseCode(e.target.value.slice(0, 8).toUpperCase())}
        maxLength={8}
        className="uppercase"
      />
      <Input
        type="text"
        placeholder="Enter your email or phone number"
        value={contactInfo}
        onChange={(e) => setContactInfo(e.target.value)}
        className="w-full"
      />
      <Button 
        className="w-full"
        onClick={onDownload}
        disabled={isVerifying}
      >
        <Download className="mr-2 h-4 w-4" />
        {isVerifying ? "Verifying..." : "Download"}
      </Button>
    </div>
  );
};

export default PurchaseCodeInput;