import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "./DashboardSidebar";
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('Checking authentication status...');
        setIsLoading(true);
        
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Session error:', sessionError);
          throw sessionError;
        }

        if (!session) {
          console.log('No active session found, redirecting to login');
          navigate('/login');
          return;
        }

        console.log('Session found, checking profile...');
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .maybeSingle();

        if (profileError) {
          console.error('Profile fetch error:', profileError);
          throw profileError;
        }

        if (!profile) {
          console.error('No profile found for user:', session.user.id);
          toast.error('User profile not found');
          await supabase.auth.signOut();
          navigate('/login');
          return;
        }

        console.log('Authentication check completed successfully');
      } catch (error) {
        console.error('Dashboard authentication error:', error);
        toast.error('Error loading dashboard');
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event);
      if (event === 'SIGNED_OUT') {
        navigate('/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col md:flex-row w-full">
        <DashboardSidebar />
        <main className="flex-1 p-4 md:p-8 bg-gray-50 w-full overflow-x-hidden">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;