import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import AdminErrorBoundary from '@/components/admin/AdminErrorBoundary';
import DashboardStats from '@/components/dashboard/DashboardStats';
import UserManagement from '@/components/admin/UserManagement';
import ResourceManagement from '@/components/admin/ResourceManagement';
import PurchaseHistory from '@/components/admin/PurchaseHistory';
import AdminSettings from '@/components/admin/AdminSettings';

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Fetch admin status with proper error handling
  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['admin-profile'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Not authenticated');
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
      
      if (error) throw error;
      if (!data || data.user_type !== 'admin') {
        throw new Error('Unauthorized: Admin access required');
      }
      
      return data;
    },
    retry: false,
    meta: {
      errorMessage: 'An error occurred'
    },
  });

  React.useEffect(() => {
    if (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
      navigate('/dashboard');
    }
  }, [error, navigate]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || !profile) {
    return null; // Navigation will occur due to useEffect
  }

  return (
    <AdminErrorBoundary>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        {/* Stats Overview */}
        <div className="mb-8">
          <DashboardStats isAdmin />
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:w-[400px]">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="purchases">Purchases</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card>
              <UserManagement />
            </Card>
          </TabsContent>

          <TabsContent value="resources">
            <Card>
              <ResourceManagement />
            </Card>
          </TabsContent>

          <TabsContent value="purchases">
            <Card>
              <PurchaseHistory />
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <AdminSettings />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminErrorBoundary>
  );
};

export default AdminDashboard;