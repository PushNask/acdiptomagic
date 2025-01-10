import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Users, BookOpen, FileText, ShoppingCart, 
  BarChart3, AlertCircle
} from "lucide-react";
import ServiceRequestManager from "@/components/admin/ServiceRequestManager";
import ResourceManager from "@/components/admin/ResourceManager";
import UserManager from "@/components/admin/UserManager";
import { useToast } from "@/components/ui/use-toast";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is admin
  useEffect(() => {
    const checkAdminAccess = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("user_type")
        .eq("id", user.id)
        .single();

      if (profile?.user_type !== "admin") {
        toast({
          title: "Access Denied",
          description: "You don't have permission to access this area.",
          variant: "destructive",
        });
        navigate("/");
      }
    };

    checkAdminAccess();
  }, [navigate, toast]);

  // Fetch dashboard stats
  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const [
        { count: usersCount },
        { count: resourcesCount },
        { count: purchasesCount },
        { data: revenue }
      ] = await Promise.all([
        supabase.from("profiles").select("*", { count: "exact" }),
        supabase.from("resources").select("*", { count: "exact" }),
        supabase.from("user_purchases").select("*", { count: "exact" }),
        supabase.from("user_purchases")
          .select("resources(price)")
          .not("resources", "is", null)
      ]);

      const totalRevenue = revenue?.reduce((sum, purchase) => 
        sum + (purchase.resources?.price || 0), 0
      ) || 0;

      return {
        totalUsers: usersCount || 0,
        totalResources: resourcesCount || 0,
        totalPurchases: purchasesCount || 0,
        totalRevenue
      };
    }
  });

  const StatCard = ({ title, value, icon: Icon }) => (
    <Card>
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-2">{value}</h3>
        </div>
        <Icon className="h-8 w-8 text-primary" />
      </CardContent>
    </Card>
  );

  if (isLoadingStats) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-muted-foreground animate-pulse" />
          <span className="text-muted-foreground">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              title="Total Users" 
              value={stats?.totalUsers} 
              icon={Users} 
            />
            <StatCard 
              title="Total Resources" 
              value={stats?.totalResources} 
              icon={BookOpen} 
            />
            <StatCard 
              title="Total Purchases" 
              value={stats?.totalPurchases} 
              icon={ShoppingCart} 
            />
            <StatCard 
              title="Total Revenue" 
              value={`$${stats?.totalRevenue.toFixed(2)}`} 
              icon={BarChart3} 
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* We'll implement the activity log in the next iteration */}
                <p className="text-muted-foreground text-sm">
                  Activity log coming soon...
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services">
          <ServiceRequestManager />
        </TabsContent>

        <TabsContent value="resources">
          <ResourceManager />
        </TabsContent>

        <TabsContent value="users">
          <UserManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;