import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  adminOnly = false 
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const currentUser = session?.user;
        setUser(currentUser ?? null);

        if (currentUser) {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('user_type')
            .eq('id', currentUser.id)
            .single();
          
          if (error) {
            console.error('Error fetching profile:', error);
            setIsAdmin(false);
          } else {
            setIsAdmin(profile?.user_type === 'admin');
          }
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_, session) => {
      const currentUser = session?.user;
      setUser(currentUser ?? null);

      if (currentUser) {
        try {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('user_type')
            .eq('id', currentUser.id)
            .single();
          
          if (error) {
            console.error('Error fetching profile:', error);
            setIsAdmin(false);
          } else {
            setIsAdmin(profile?.user_type === 'admin');
          }
        } catch (error) {
          console.error('Profile fetch error:', error);
          setIsAdmin(false);
        }
      }

      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  if (isAdmin && !adminOnly && window.location.pathname === '/dashboard') {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
};