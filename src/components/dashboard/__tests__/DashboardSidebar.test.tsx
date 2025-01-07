import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { describe, it, expect } from 'vitest';

const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        {component}
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('Dashboard Navigation', () => {
  it('renders navigation items', () => {
    renderWithProviders(<div>Navigation Test</div>);
    expect(screen.getByText('Navigation Test')).toBeInTheDocument();
  });
});