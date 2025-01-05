import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Invoice = () => {
  const [invoiceData, setInvoiceData] = useState({
    clientName: "",
    clientEmail: "",
    clientAddress: "",
    services: "Consulting service for Business plan, and website design",
    amount: "",
    notes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInvoiceData({ ...invoiceData, [e.target.name]: e.target.value });
  };

  const generateInvoice = () => {
    const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;
    const date = new Date().toLocaleDateString();
    
    const invoiceHTML = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; }
            .header { text-align: center; margin-bottom: 30px; }
            .invoice-details { margin-bottom: 30px; }
            .company-details { text-align: right; margin-bottom: 30px; }
            .service-details { margin-bottom: 30px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>INVOICE</h1>
            <p>Invoice #: ${invoiceNumber}</p>
            <p>Date: ${date}</p>
          </div>
          
          <div class="company-details">
            <h2>AcDiToPush</h2>
            <p>USA: +1 832 857 0043</p>
            <p>CMR: +237 671 154 588</p>
            <p>www.acditopush.com</p>
          </div>

          <div class="invoice-details">
            <h3>Bill To:</h3>
            <p>${invoiceData.clientName}</p>
            <p>${invoiceData.clientEmail}</p>
            <p>${invoiceData.clientAddress}</p>
          </div>

          <div class="service-details">
            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>${invoiceData.services}</td>
                  <td>$${invoiceData.amount}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="notes">
            <h3>Notes:</h3>
            <p>${invoiceData.notes}</p>
          </div>
        </body>
      </html>
    `;

    const blob = new Blob([invoiceHTML], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Invoice-${invoiceNumber}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success("Invoice generated successfully!");
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Generate Invoice</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="clientName">Client Name</Label>
            <Input
              id="clientName"
              name="clientName"
              value={invoiceData.clientName}
              onChange={handleChange}
              placeholder="Enter client name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="clientEmail">Client Email</Label>
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
            <Label htmlFor="amount">Amount ($)</Label>
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
            disabled={!invoiceData.clientName || !invoiceData.amount}
          >
            Generate Invoice
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Invoice;