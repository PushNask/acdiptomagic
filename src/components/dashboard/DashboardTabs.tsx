import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import QuickStats from "./QuickStats";
import { ProgressIndicator } from "./ProgressIndicator";
import ServiceCard from "./ServiceCard";
import SearchFilterBar from "./SearchFilterBar";
import { availableServices } from "@/data/services";

interface DashboardTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onServiceRequest: (service: any) => void;
}

const DashboardTabs = ({ 
  activeTab, 
  setActiveTab, 
  searchQuery, 
  setSearchQuery,
  onServiceRequest 
}: DashboardTabsProps) => {
  const navigate = useNavigate();

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
      <TabsList className="grid grid-cols-4 w-full max-w-2xl">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="services">Services</TabsTrigger>
        <TabsTrigger value="resources">Resources</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
      </TabsList>

      <TabsContent value="services" className="space-y-6">
        <SearchFilterBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        {Object.entries(availableServices).map(([category, services]) => (
          <div key={category} className="space-y-4">
            <h2 className="text-xl font-semibold capitalize">
              {category.replace(/([A-Z])/g, ' $1').trim()}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {services
                .filter(service => 
                  service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  service.description.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map(service => (
                  <ServiceCard 
                    key={service.id} 
                    service={service}
                  />
                ))}
            </div>
          </div>
        ))}
      </TabsContent>

      <TabsContent value="overview">
        <div className="grid gap-6">
          <QuickStats />
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Recent Activity</h2>
              <div className="bg-white rounded-lg shadow p-4">
                <p className="text-muted-foreground">
                  Your recent activity will appear here.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <ProgressIndicator />
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="resources">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Your Resources</h2>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-muted-foreground">
              Access your purchased resources and downloads here.
            </p>
            <button 
              onClick={() => navigate('/resources')}
              className="mt-4 inline-flex items-center text-sm text-primary hover:underline"
            >
              Browse available resources
            </button>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="billing">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Billing & Payments</h2>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-muted-foreground">
              View your invoices and manage payment methods here.
            </p>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;