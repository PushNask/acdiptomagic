import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
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
      }))
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
});