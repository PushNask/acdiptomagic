import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Headphones, Calendar, AlertCircle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

const DashboardStats = ({ isAdmin = false }: { isAdmin?: boolean }) => {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['dashboard-stats', isAdmin],
    queryFn: async () => {
      if (isAdmin) {
        const [users, resources, purchases] = await Promise.all([
          supabase.from('profiles').select('count').single(),
          supabase.from('resources').select('count').single(),
          supabase.from('user_purchases').select('count').single(),
        ]);
        
        return {
          totalUsers: users.data?.count || 0,
          totalResources: resources.data?.count || 0,
          totalPurchases: purchases.data?.count || 0,
        };
      } else {
        const { data: userStats } = await supabase
          .from('user_purchases')
          .select('*')
          .eq('user_id', (await supabase.auth.getUser()).data.user?.id);

        return {
          downloads: userStats?.length || 0,
          supportTickets: 0, // Future implementation
          consultations: 0, // Future implementation
        };
      }
    },
  });

  if (isLoading) {
    return (
      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="hover:shadow-lg transition-shadow animate-pulse">
            <CardContent className="flex items-center p-4 md:p-6">
              <Loader2 className="h-8 w-8 animate-spin" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="hover:shadow-lg transition-shadow bg-red-50">
        <CardContent className="flex items-center p-4 md:p-6">
          <AlertCircle className="h-6 w-6 text-red-600 mr-2" />
          <p className="text-red-600">Error loading dashboard stats</p>
        </CardContent>
      </Card>
    );
  }

  if (isAdmin) {
    return (
      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-3">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="flex items-center p-4 md:p-6">
            <div className="rounded-full bg-blue-100 p-2 md:p-3">
              <FileText className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
            </div>
            <div className="ml-3 md:ml-4">
              <p className="text-sm text-gray-500">Total Users</p>
              <h3 className="text-xl md:text-2xl font-bold">{stats?.totalUsers}</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="flex items-center p-4 md:p-6">
            <div className="rounded-full bg-green-100 p-2 md:p-3">
              <FileText className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
            </div>
            <div className="ml-3 md:ml-4">
              <p className="text-sm text-gray-500">Total Resources</p>
              <h3 className="text-xl md:text-2xl font-bold">{stats?.totalResources}</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="flex items-center p-4 md:p-6">
            <div className="rounded-full bg-purple-100 p-2 md:p-3">
              <FileText className="h-5 w-5 md:h-6 md:w-6 text-purple-600" />
            </div>
            <div className="ml-3 md:ml-4">
              <p className="text-sm text-gray-500">Total Purchases</p>
              <h3 className="text-xl md:text-2xl font-bold">{stats?.totalPurchases}</h3>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="flex items-center p-4 md:p-6">
          <div className="rounded-full bg-blue-100 p-2 md:p-3">
            <FileText className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
          </div>
          <div className="ml-3 md:ml-4">
            <p className="text-sm text-gray-500">Total Downloads</p>
            <h3 className="text-xl md:text-2xl font-bold">{stats?.downloads}</h3>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="flex items-center p-4 md:p-6">
          <div className="rounded-full bg-orange-100 p-2 md:p-3">
            <Headphones className="h-5 w-5 md:h-6 md:w-6 text-orange-600" />
          </div>
          <div className="ml-3 md:ml-4">
            <p className="text-sm text-gray-500">Support Tickets</p>
            <h3 className="text-xl md:text-2xl font-bold">{stats?.supportTickets} Open</h3>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow md:col-span-2 lg:col-span-1">
        <CardContent className="flex items-center p-4 md:p-6">
          <div className="rounded-full bg-green-100 p-2 md:p-3">
            <Calendar className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
          </div>
          <div className="ml-3 md:ml-4">
            <p className="text-sm text-gray-500">Consultations</p>
            <h3 className="text-xl md:text-2xl font-bold">{stats?.consultations} Scheduled</h3>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;