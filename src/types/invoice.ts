export interface ClientDetails {
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  clientPhone: string;
}

export interface InvoiceFormData extends ClientDetails {
  services: string;
  amount: string;
  currency: string;
  notes: string;
  paymentTerms: string;
}

export interface InvoiceData extends InvoiceFormData {
  invoiceNumber: string;
  date: string;
}