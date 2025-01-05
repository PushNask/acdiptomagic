import { InvoiceData } from "@/types/invoice";

const getCurrencySymbol = (currency: string) => {
  switch (currency) {
    case "USD":
      return "$";
    case "EUR":
      return "€";
    case "XAF":
      return "FCFA";
    default:
      return "$";
  }
};

export const generateInvoiceHTML = (data: InvoiceData): string => {
  const currencySymbol = getCurrencySymbol(data.currency);
  
  return `
    <html>
      <head>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            margin: 40px;
            color: #333;
          }
          .header { 
            text-align: center; 
            margin-bottom: 30px;
            border-bottom: 2px solid #1E88E5;
            padding-bottom: 20px;
          }
          .invoice-details { 
            margin-bottom: 30px; 
          }
          .company-details { 
            text-align: right; 
            margin-bottom: 30px;
            color: #666;
          }
          .service-details { 
            margin-bottom: 30px; 
          }
          .client-details {
            margin-bottom: 30px;
          }
          table { 
            width: 100%; 
            border-collapse: collapse; 
            margin-bottom: 30px;
          }
          th, td { 
            padding: 12px; 
            text-align: left; 
            border-bottom: 1px solid #ddd; 
          }
          th {
            background-color: #f8f9fa;
          }
          .total {
            text-align: right;
            font-size: 1.2em;
            margin-top: 20px;
          }
          .notes {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
          }
          @media print {
            body { margin: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>INVOICE</h1>
          <p>Invoice #: ${data.invoiceNumber}</p>
          <p>Date: ${data.date}</p>
        </div>
        
        <div class="company-details">
          <h2>AcDiToPush</h2>
          <p>USA: +1 832 857 0043</p>
          <p>CMR: +237 671 154 588</p>
          <p>www.acditopush.com</p>
        </div>

        <div class="client-details">
          <h3>Bill To:</h3>
          <p><strong>${data.clientName}</strong></p>
          <p>${data.clientEmail}</p>
          ${data.clientPhone ? `<p>${data.clientPhone}</p>` : ''}
          ${data.clientAddress ? `<p>${data.clientAddress}</p>` : ''}
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
                <td>${data.services}</td>
                <td>${currencySymbol}${data.amount}</td>
              </tr>
            </tbody>
          </table>
          
          <div class="total">
            <strong>Total: ${currencySymbol}${data.amount}</strong>
          </div>
        </div>

        ${data.notes ? `
          <div class="notes">
            <h3>Notes:</h3>
            <p>${data.notes}</p>
          </div>
        ` : ''}

        <div class="payment-terms">
          <h3>Payment Terms</h3>
          <p>${data.paymentTerms}</p>
        </div>

        <button class="no-print" onclick="window.print()">Print Invoice</button>
      </body>
    </html>
  `;
};