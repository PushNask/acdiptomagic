import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "./DashboardSidebar";
import { useUser } from '@supabase/auth-helpers-react';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const user = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
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

        // Verify profile exists
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

        console.log('User authenticated and profile loaded successfully');
      } catch (error) {
        console.error('Dashboard authentication error:', error);
        toast.error('Error loading dashboard');
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate]);

  if (!user) {
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