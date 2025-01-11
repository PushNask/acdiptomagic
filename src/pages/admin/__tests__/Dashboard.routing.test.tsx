import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import App from '@/App';

// Mock Supabase client
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(() => Promise.resolve({ data: null, error: null }))
        }))
      }))
    })),
    auth: {
      getSession: vi.fn(() => Promise.resolve({ 
        data: { session: { user: { id: '123' } } }, 
        error: null 
      })),
      onAuthStateChange: vi.fn(() => ({
        data: { subscription: { unsubscribe: vi.fn() } }
      }))
    }
  }
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderWithProviders = (initialRoute = '/') => {
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[initialRoute]}>
        <App />
      </MemoryRouter>
    </QueryClientProvider>
  );
};

describe('Dashboard Routing', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    queryClient.clear();
  });

  it('redirects unauthenticated users to login', async () => {
    vi.mocked(supabase.auth.getSession).mockImplementationOnce(() =>
      Promise.resolve({ data: { session: null }, error: null })
    );

    renderWithProviders('/dashboard');

    await waitFor(() => {
      expect(window.location.pathname).toBe('/login');
    });
  });

  it('redirects regular users to dashboard', async () => {
    vi.mocked(supabase.from).mockImplementationOnce(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(() => Promise.resolve({ 
            data: { user_type: 'user' }, 
            error: null 
          }))
        }))
      }))
    }));

    renderWithProviders('/dashboard');

    await waitFor(() => {
      expect(window.location.pathname).toBe('/dashboard');
    });
  });

  it('redirects admin users to admin dashboard', async () => {
    vi.mocked(supabase.from).mockImplementationOnce(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(() => Promise.resolve({ 
            data: { user_type: 'admin' }, 
            error: null 
          }))
        }))
      }))
    }));

    renderWithProviders('/dashboard');

    await waitFor(() => {
      expect(window.location.pathname).toBe('/admin');
    });
  });

  it('prevents regular users from accessing admin dashboard', async () => {
    vi.mocked(supabase.from).mockImplementationOnce(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(() => Promise.resolve({ 
            data: { user_type: 'user' }, 
            error: null 
          }))
        }))
      }))
    }));

    renderWithProviders('/admin');

    await waitFor(() => {
      expect(window.location.pathname).toBe('/dashboard');
    });
  });

  it('handles profile fetch errors gracefully', async () => {
    vi.mocked(supabase.from).mockImplementationOnce(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(() => Promise.resolve({ 
            data: null, 
            error: new Error('Failed to fetch profile') 
          }))
        }))
      }))
    }));

    renderWithProviders('/dashboard');

    await waitFor(() => {
      expect(window.location.pathname).toBe('/dashboard');
    });
  });
});