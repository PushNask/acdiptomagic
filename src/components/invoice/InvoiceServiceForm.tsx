import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const currencies = [
  { label: "USD ($)", value: "USD", symbol: "$" },
  { label: "EUR (€)", value: "EUR", symbol: "€" },
  { label: "XAF", value: "XAF", symbol: "FCFA" },
];

interface ServiceFormProps {
  serviceData: {
    services: string;
    amount: string;
    currency: string;
    notes: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onCurrencyChange: (value: string) => void;
}

export const InvoiceServiceForm = ({ serviceData, onChange, onCurrencyChange }: ServiceFormProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="services">Services Description *</Label>
        <Textarea
          id="services"
          name="services"
          value={serviceData.services}
          onChange={onChange}
          placeholder="Describe the services provided"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Amount *</Label>
          <Input
            id="amount"
            name="amount"
            type="number"
            value={serviceData.amount}
            onChange={onChange}
            placeholder="Enter amount"
          />
        </div>
        
        <div className="space-y-2">
          <Label>Currency</Label>
          <Select value={serviceData.currency} onValueChange={onCurrencyChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((currency) => (
                <SelectItem key={currency.value} value={currency.value}>
                  {currency.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Additional Notes</Label>
        <Textarea
          id="notes"
          name="notes"
          value={serviceData.notes}
          onChange={onChange}
          placeholder="Enter any additional notes"
        />
      </div>
    </>
  );
};