import { describe, it, expect } from 'vitest';
import { generateInvoiceHTML } from '../invoiceGenerator';
import { InvoiceData } from '@/types/invoice';

describe('generateInvoiceHTML', () => {
  const mockInvoiceData: InvoiceData = {
    invoiceNumber: 'INV-123456',
    date: '2024-03-20',
    clientName: 'John Doe',
    clientEmail: 'john@example.com',
    clientAddress: '123 Main St',
    clientPhone: '+1234567890',
    services: 'Consulting Services',
    amount: '1000',
    currency: 'USD',
    notes: 'Thank you for your business',
    paymentTerms: 'Net 30'
  };

  it('generates HTML with correct invoice data', () => {
    const html = generateInvoiceHTML(mockInvoiceData);
    
    // Check if essential invoice data is present in the generated HTML
    expect(html).toContain(mockInvoiceData.invoiceNumber);
    expect(html).toContain(mockInvoiceData.clientName);
    expect(html).toContain(mockInvoiceData.clientEmail);
    expect(html).toContain(mockInvoiceData.services);
    expect(html).toContain(mockInvoiceData.amount);
  });

  it('handles different currencies correctly', () => {
    // Test USD
    let html = generateInvoiceHTML(mockInvoiceData);
    expect(html).toContain('$1000');

    // Test EUR
    html = generateInvoiceHTML({ ...mockInvoiceData, currency: 'EUR' });
    expect(html).toContain('€1000');

    // Test XAF
    html = generateInvoiceHTML({ ...mockInvoiceData, currency: 'XAF' });
    expect(html).toContain('FCFA1000');
  });

  it('includes optional fields when provided', () => {
    const html = generateInvoiceHTML(mockInvoiceData);
    
    expect(html).toContain(mockInvoiceData.clientPhone);
    expect(html).toContain(mockInvoiceData.clientAddress);
    expect(html).toContain(mockInvoiceData.notes);
  });

  it('handles missing optional fields gracefully', () => {
    const minimalData: InvoiceData = {
      ...mockInvoiceData,
      clientPhone: '',
      clientAddress: '',
      notes: ''
    };

    const html = generateInvoiceHTML(minimalData);
    
    // Should still generate valid HTML without optional fields
    expect(html).toContain(minimalData.invoiceNumber);
    expect(html).toContain(minimalData.clientName);
    expect(html).not.toContain('undefined');
  });
});