import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { generateInvoiceHTML } from "@/utils/invoiceGenerator";
import { InvoiceFormData } from "@/types/invoice";
import { InvoiceClientForm } from "./InvoiceClientForm";
import { InvoiceServiceForm } from "./InvoiceServiceForm";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

export const InvoiceForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
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

  const generateInvoice = async () => {
    if (!validateForm()) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to generate invoices",
          variant: "destructive",
        });
        navigate("/login");
        return;
      }

      const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;
      const date = new Date().toLocaleDateString();
      
      // Save invoice to Supabase
      const { error: saveError } = await supabase
        .from('invoices')
        .insert({
          user_id: user.id,
          invoice_number: invoiceNumber,
          client_name: invoiceData.clientName,
          client_email: invoiceData.clientEmail,
          client_address: invoiceData.clientAddress,
          amount: parseFloat(invoiceData.amount),
          currency: invoiceData.currency,
          items: { services: invoiceData.services, notes: invoiceData.notes },
          status: 'draft'
        });

      if (saveError) {
        console.error('Error saving invoice:', saveError);
        toast({
          title: "Error",
          description: "Failed to save invoice",
          variant: "destructive",
        });
        return;
      }

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
    } catch (error) {
      console.error('Error generating invoice:', error);
      toast({
        title: "Error",
        description: "Failed to generate invoice",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <InvoiceClientForm 
        clientData={invoiceData}
        onChange={handleChange}
      />
      
      <InvoiceServiceForm
        serviceData={invoiceData}
        onChange={handleChange}
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