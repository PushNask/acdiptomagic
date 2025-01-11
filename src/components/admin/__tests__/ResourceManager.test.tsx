import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ResourceManager from '../ResourceManager';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

// Mock data
const mockResources = [
  {
    id: '1',
    title: 'Business Guide 1',
    category: 'Business Guides',
    price: 99.99,
    created_at: '2024-01-01T00:00:00Z',
    user_purchases: []
  }
];

// Mock Supabase client
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        order: vi.fn(() => Promise.resolve({ data: mockResources, error: null }))
      })),
      insert: vi.fn(() => Promise.resolve({ error: null }))
    }))
  }
}));

describe('ResourceManager', () => {
  it('renders loading state initially', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ResourceManager />
      </QueryClientProvider>
    );
    expect(screen.getByText(/loading resources/i)).toBeInTheDocument();
  });

  it('displays resources when loaded', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ResourceManager />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Business Guide 1')).toBeInTheDocument();
    });
  });

  it('displays correct resource information', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ResourceManager />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('$99.99')).toBeInTheDocument();
      expect(screen.getByText('Business Guides')).toBeInTheDocument();
    });
  });

  it('opens create resource dialog when add button is clicked', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ResourceManager />
      </QueryClientProvider>
    );

    await waitFor(() => {
      const addButton = screen.getByText('Add Resource');
      fireEvent.click(addButton);
      expect(screen.getByText('Create New Resource')).toBeInTheDocument();
    });
  });

  it('submits new resource form correctly', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ResourceManager />
      </QueryClientProvider>
    );

    await waitFor(() => {
      const addButton = screen.getByText('Add Resource');
      fireEvent.click(addButton);
    });

    const titleInput = screen.getByLabelText('Title');
    const descriptionInput = screen.getByLabelText('Description');
    const categoryInput = screen.getByLabelText('Category');
    const priceInput = screen.getByLabelText('Price');
    const fileUrlInput = screen.getByLabelText('File URL');

    fireEvent.change(titleInput, { target: { value: 'New Resource' } });
    fireEvent.change(descriptionInput, { target: { value: 'Description' } });
    fireEvent.change(categoryInput, { target: { value: 'Test Category' } });
    fireEvent.change(priceInput, { target: { value: '49.99' } });
    fireEvent.change(fileUrlInput, { target: { value: 'https://example.com/file' } });

    const submitButton = screen.getByText('Create Resource');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.queryByText('Create New Resource')).not.toBeInTheDocument();
    });
  });
});