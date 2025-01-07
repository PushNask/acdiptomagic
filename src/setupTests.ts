import '@testing-library/jest-dom';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Mock the Supabase client
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    auth: {
      signOut: vi.fn(() => Promise.resolve({ error: null })),
      getSession: vi.fn(() => Promise.resolve({ data: { session: null }, error: null })),
      onAuthStateChange: vi.fn(() => ({
        data: { subscription: { unsubscribe: vi.fn() } },
      })),
    },
  },
}));

// Automatically cleanup after each test
afterEach(() => {
  cleanup();
});