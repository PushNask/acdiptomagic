import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { ProtectedRoute } from '@/components/shared/ProtectedRoute';

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

const renderProtectedRoute = (adminOnly = false) => {
  return render(
    <MemoryRouter>
      <ProtectedRoute adminOnly={adminOnly}>
        <div>Protected Content</div>
      </ProtectedRoute>
    </MemoryRouter>
  );
};

describe('ProtectedRoute', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows loading state initially', () => {
    renderProtectedRoute();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders children when user is authenticated', async () => {
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

    renderProtectedRoute();

    await waitFor(() => {
      expect(screen.getByText('Protected Content')).toBeInTheDocument();
    });
  });

  it('redirects to login when user is not authenticated', async () => {
    vi.mocked(supabase.auth.getSession).mockImplementationOnce(() =>
      Promise.resolve({ data: { session: null }, error: null })
    );

    renderProtectedRoute();

    await waitFor(() => {
      expect(window.location.pathname).toBe('/login');
    });
  });

  it('allows admin access to admin routes', async () => {
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

    renderProtectedRoute(true);

    await waitFor(() => {
      expect(screen.getByText('Protected Content')).toBeInTheDocument();
    });
  });

  it('handles profile fetch errors', async () => {
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

    renderProtectedRoute();

    await waitFor(() => {
      expect(window.location.pathname).toBe('/dashboard');
    });
  });
});