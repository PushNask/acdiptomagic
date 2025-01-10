import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const currencies = [
  { label: "USD ($)", value: "USD", symbol: "$" },
  { label: "EUR (€)", value: "EUR", symbol: "€" },
  { label: "XAF", value: "XAF", symbol: "FCFA" },
];

interface PaymentDetailsSectionProps {
  amount: string;
  currency: string;
  onAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCurrencyChange: (value: string) => void;
}

export const PaymentDetailsSection = ({
  amount,
  currency,
  onAmountChange,
  onCurrencyChange,
}: PaymentDetailsSectionProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="amount">Amount *</Label>
        <Input
          id="amount"
          name="amount"
          type="number"
          value={amount}
          onChange={onAmountChange}
          placeholder="Enter amount"
        />
      </div>
      
      <div className="space-y-2">
        <Label>Currency</Label>
        <Select value={currency} onValueChange={onCurrencyChange}>
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
  );
};