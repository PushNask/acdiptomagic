import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface PurchaseCodeInputProps {
  purchaseCode: string;
  setPurchaseCode: (code: string) => void;
  isVerifying: boolean;
  onDownload: () => void;
}

const PurchaseCodeInput = ({ 
  purchaseCode, 
  setPurchaseCode, 
  isVerifying, 
  onDownload 
}: PurchaseCodeInputProps) => {
  return (
    <div className="space-y-2">
      <Input
        type="text"
        placeholder="Enter your 8-character purchase code"
        value={purchaseCode}
        onChange={(e) => setPurchaseCode(e.target.value.slice(0, 8).toUpperCase())}
        maxLength={8}
        className="uppercase"
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