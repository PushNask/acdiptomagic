import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { InvoiceForm } from '../InvoiceForm';
import { describe, it, expect, beforeEach } from 'vitest';

// Mock the toast functionality
const mockToast = vi.fn();
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: mockToast
  })
}));

// Mock URL.createObjectURL and URL.revokeObjectURL
URL.createObjectURL = vi.fn();
URL.revokeObjectURL = vi.fn();

describe('InvoiceForm', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  it('renders all form fields correctly', () => {
    render(<InvoiceForm />);
    
    // Check for required fields
    expect(screen.getByLabelText(/client name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/client email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/amount/i)).toBeInTheDocument();
    
    // Check for optional fields
    expect(screen.getByLabelText(/client phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/client address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/services description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/additional notes/i)).toBeInTheDocument();
  });

  it('validates required fields before form submission', async () => {
    render(<InvoiceForm />);
    
    // Try to submit empty form
    fireEvent.click(screen.getByText(/generate invoice/i));
    
    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        title: "Error",
        description: "Please enter client name",
        variant: "destructive",
      });
    });
  });

  it('successfully generates invoice when all required fields are filled', async () => {
    render(<InvoiceForm />);
    
    // Fill in required fields
    await userEvent.type(screen.getByLabelText(/client name/i), 'John Doe');
    await userEvent.type(screen.getByLabelText(/client email/i), 'john@example.com');
    await userEvent.type(screen.getByLabelText(/amount/i), '1000');
    
    // Submit form
    fireEvent.click(screen.getByText(/generate invoice/i));
    
    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        title: "Success",
        description: "Invoice generated successfully!",
      });
    });
  });

  it('handles currency selection correctly', async () => {
    render(<InvoiceForm />);
    
    // Open currency select
    const currencySelect = screen.getByRole('combobox');
    fireEvent.click(currencySelect);
    
    // Select EUR currency
    const eurOption = screen.getByText('EUR (€)');
    fireEvent.click(eurOption);
    
    expect(currencySelect).toHaveTextContent('EUR (€)');
  });
});