import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { generateInvoiceHTML } from "@/utils/invoiceGenerator";
import { InvoiceFormData } from "@/types/invoice";
import { ClientDetailsSection } from "./sections/ClientDetailsSection";
import { ServiceDetailsSection } from "./sections/ServiceDetailsSection";
import { PaymentDetailsSection } from "./sections/PaymentDetailsSection";

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
      <ClientDetailsSection 
        clientDetails={invoiceData} 
        onChange={handleChange}
      />
      
      <ServiceDetailsSection
        services={invoiceData.services}
        notes={invoiceData.notes}
        onChange={handleChange}
      />
      
      <PaymentDetailsSection
        amount={invoiceData.amount}
        currency={invoiceData.currency}
        onAmountChange={handleChange}
        onCurrencyChange={handleCurrencyChange}
      />
      
      <Button 
        className="w-full"
        onClick={generateInvoice}
      >
        Generate Invoice
      </Button>
    </div>
  );
};