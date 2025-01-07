import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import DashboardLayout from '../DashboardLayout';

const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        {component}
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('DashboardLayout', () => {
  it('renders loading state when user is not loaded', () => {
    renderWithProviders(<DashboardLayout>Test Content</DashboardLayout>);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders children when user is loaded', () => {
    renderWithProviders(<DashboardLayout>Test Content</DashboardLayout>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders sidebar', () => {
    renderWithProviders(<DashboardLayout>Test Content</DashboardLayout>);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});