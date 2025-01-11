import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
  requiresAuth?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  adminOnly = false,
  requiresAuth = true
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Session error:', sessionError);
          toast.error("Authentication error. Please try logging in again.");
          setLoading(false);
          return;
        }

        const currentUser = session?.user;
        setUser(currentUser ?? null);

        if (currentUser) {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('user_type')
            .eq('id', currentUser.id)
            .single();
          
          if (profileError) {
            console.error('Profile fetch error:', profileError);
            toast.error("Error fetching user profile");
            setIsAdmin(false);
          } else {
            setIsAdmin(profile?.user_type === 'admin');
          }
        }
      } catch (error) {
        console.error('Auth check error:', error);
        toast.error("Authentication check failed");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      const currentUser = session?.user;
      setUser(currentUser ?? null);

      if (currentUser) {
        try {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('user_type')
            .eq('id', currentUser.id)
            .single();
          
          if (profileError) {
            console.error('Profile fetch error:', profileError);
            setIsAdmin(false);
          } else {
            setIsAdmin(profile?.user_type === 'admin');
          }
        } catch (error) {
          console.error('Profile fetch error:', error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }

      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-blue"></div>
          <p className="text-gray-600">Verifying access...</p>
        </div>
      </div>
    );
  }

  // Handle auth routes (login/signup)
  if (!requiresAuth) {
    if (user) {
      // If user is already logged in, redirect to appropriate dashboard
      return <Navigate to={isAdmin ? "/admin" : "/dashboard"} replace />;
    }
    return <>{children}</>;
  }

  // Handle protected routes
  if (!user) {
    toast.error("Please log in to access this page");
    // Save the attempted URL to redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly && !isAdmin) {
    toast.error("You don't have permission to access this page");
    return <Navigate to="/dashboard" replace />;
  }

  // Redirect admin to admin dashboard if trying to access regular dashboard
  if (isAdmin && !adminOnly && location.pathname === '/dashboard') {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
};