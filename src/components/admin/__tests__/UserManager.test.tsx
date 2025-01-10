import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UserManager from '../UserManager';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

// Mock data
const mockUsers = [
  {
    id: '1',
    full_name: 'John Doe',
    email: 'john@example.com',
    user_type: 'user',
    created_at: '2024-01-01T00:00:00Z',
    user_purchases: []
  }
];

// Mock Supabase client
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        order: vi.fn(() => Promise.resolve({ data: mockUsers, error: null }))
      }))
    }))
  }
}));

describe('UserManager', () => {
  it('renders loading state initially', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <UserManager />
      </QueryClientProvider>
    );
    expect(screen.getByText(/loading users/i)).toBeInTheDocument();
  });

  it('displays users when loaded', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <UserManager />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });

  it('displays correct user information', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <UserManager />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
      expect(screen.getByText('user')).toBeInTheDocument();
    });
  });
});