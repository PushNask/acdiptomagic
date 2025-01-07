import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { describe, it, expect, vi } from 'vitest';
import DashboardSidebar from '../DashboardSidebar';

const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        {component}
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('DashboardSidebar', () => {
  it('renders all menu items', () => {
    renderWithProviders(<DashboardSidebar />);
    
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Resources')).toBeInTheDocument();
    expect(screen.getByText('My Downloads')).toBeInTheDocument();
    expect(screen.getByText('Notifications')).toBeInTheDocument();
    expect(screen.getByText('Support')).toBeInTheDocument();
    expect(screen.getByText('My Account')).toBeInTheDocument();
  });

  it('renders sign out button', () => {
    renderWithProviders(<DashboardSidebar />);
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
  });

  it('handles sign out click', async () => {
    renderWithProviders(<DashboardSidebar />);
    const signOutButton = screen.getByText('Sign Out');
    fireEvent.click(signOutButton);
    // Add assertions for sign out behavior
  });
});