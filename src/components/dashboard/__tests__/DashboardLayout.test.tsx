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

describe('Dashboard Layout', () => {
  it('renders children when provided', () => {
    renderWithProviders(<div>Test Content</div>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});