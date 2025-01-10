import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ClientDetails } from "@/types/invoice";

interface ClientDetailsSectionProps {
  clientDetails: ClientDetails;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const ClientDetailsSection = ({ clientDetails, onChange }: ClientDetailsSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="clientName">Client Name *</Label>
        <Input
          id="clientName"
          name="clientName"
          value={clientDetails.clientName}
          onChange={onChange}
          placeholder="Enter client name"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="clientEmail">Client Email *</Label>
        <Input
          id="clientEmail"
          name="clientEmail"
          type="email"
          value={clientDetails.clientEmail}
          onChange={onChange}
          placeholder="Enter client email"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="clientPhone">Client Phone</Label>
        <Input
          id="clientPhone"
          name="clientPhone"
          value={clientDetails.clientPhone}
          onChange={onChange}
          placeholder="Enter client phone"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="clientAddress">Client Address</Label>
        <Textarea
          id="clientAddress"
          name="clientAddress"
          value={clientDetails.clientAddress}
          onChange={onChange}
          placeholder="Enter client address"
        />
      </div>
    </div>
  );
};