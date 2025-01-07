import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ClientFormProps {
  clientData: {
    clientName: string;
    clientEmail: string;
    clientAddress: string;
    clientPhone: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const InvoiceClientForm = ({ clientData, onChange }: ClientFormProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="clientName">Client Name *</Label>
        <Input
          id="clientName"
          name="clientName"
          value={clientData.clientName}
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
          value={clientData.clientEmail}
          onChange={onChange}
          placeholder="Enter client email"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="clientPhone">Client Phone</Label>
        <Input
          id="clientPhone"
          name="clientPhone"
          value={clientData.clientPhone}
          onChange={onChange}
          placeholder="Enter client phone"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="clientAddress">Client Address</Label>
        <Textarea
          id="clientAddress"
          name="clientAddress"
          value={clientData.clientAddress}
          onChange={onChange}
          placeholder="Enter client address"
        />
      </div>
    </>
  );
};