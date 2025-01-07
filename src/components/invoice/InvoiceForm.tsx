import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { generateInvoiceHTML } from "@/utils/invoiceGenerator";
import { ClientDetails, InvoiceFormData } from "@/types/invoice";

const currencies = [
  { label: "USD ($)", value: "USD", symbol: "$" },
  { label: "EUR (€)", value: "EUR", symbol: "€" },
  { label: "XAF", value: "XAF", symbol: "FCFA" },
];

export const InvoiceForm = () => {
  const { toast } = useToast();
  const [invoiceData, setInvoiceData] = useState<InvoiceFormData>({
    clientName: "",
    clientEmail: "",
    clientAddress: "",
    clientPhone: "",
    services: "Consulting service for Business plan, and website design",
    amount: "",
    currency: "USD",
    notes: "",
    paymentTerms: "Net 30",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInvoiceData({ ...invoiceData, [e.target.name]: e.target.value });
  };

  const handleCurrencyChange = (value: string) => {
    setInvoiceData({ ...invoiceData, currency: value });
  };

  const validateForm = () => {
    if (!invoiceData.clientName.trim()) {
      toast({
        title: "Error",
        description: "Please enter client name",
        variant: "destructive",
      });
      return false;
    }
    if (!invoiceData.clientEmail.trim()) {
      toast({
        title: "Error",
        description: "Please enter client email",
        variant: "destructive",
      });
      return false;
    }
    if (!invoiceData.amount.trim()) {
      toast({
        title: "Error",
        description: "Please enter amount",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const generateInvoice = () => {
    if (!validateForm()) return;

    const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;
    const date = new Date().toLocaleDateString();
    
    const invoiceHTML = generateInvoiceHTML({
      invoiceNumber,
      date,
      ...invoiceData,
    });

    // Create blob and download
    const blob = new Blob([invoiceHTML], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Invoice-${invoiceNumber}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Success",
      description: "Invoice generated successfully!",
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="clientName">Client Name *</Label>
        <Input
          id="clientName"
          name="clientName"
          value={invoiceData.clientName}
          onChange={handleChange}
          placeholder="Enter client name"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="clientEmail">Client Email *</Label>
        <Input
          id="clientEmail"
          name="clientEmail"
          type="email"
          value={invoiceData.clientEmail}
          onChange={handleChange}
          placeholder="Enter client email"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="clientPhone">Client Phone</Label>
        <Input
          id="clientPhone"
          name="clientPhone"
          value={invoiceData.clientPhone}
          onChange={handleChange}
          placeholder="Enter client phone"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="clientAddress">Client Address</Label>
        <Textarea
          id="clientAddress"
          name="clientAddress"
          value={invoiceData.clientAddress}
          onChange={handleChange}
          placeholder="Enter client address"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="services">Services Description *</Label>
        <Textarea
          id="services"
          name="services"
          value={invoiceData.services}
          onChange={handleChange}
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
            value={invoiceData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
          />
        </div>
        
        <div className="space-y-2">
          <Label>Currency</Label>
          <Select value={invoiceData.currency} onValueChange={handleCurrencyChange}>
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
          value={invoiceData.notes}
          onChange={handleChange}
          placeholder="Enter any additional notes"
        />
      </div>
      
      <Button 
        className="w-full"
        onClick={generateInvoice}
      >
        Generate Invoice
      </Button>
    </div>
  );
};