import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { availableServices } from "@/data/services";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import SearchFilterBar from "@/components/dashboard/SearchFilterBar";
import MobileNavigation from "@/components/dashboard/MobileNavigation";
import ServiceRequestDialog from "@/components/dashboard/ServiceRequestDialog";
import QuickStats from "@/components/dashboard/QuickStats";
import ServiceCard from "@/components/dashboard/ServiceCard";
import { ProgressIndicator } from "@/components/dashboard/ProgressIndicator";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [showServiceRequest, setShowServiceRequest] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);

  const handleServiceRequest = (service: any) => {
    setSelectedService(service);
    setShowServiceRequest(true);
  };

  const handleRequestSubmit = () => {
    setShowServiceRequest(false);
    setSelectedService(null);
    toast({
      title: "Service Request Submitted",
      description: "We'll get back to you within 24 hours.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <main className="max-w-7xl mx-auto px-4 py-6 pb-20 md:pb-6">
        <div className="grid gap-6 md:grid-cols-[1fr_300px]">
          <div className="space-y-6">
            <QuickStats />
            <SearchFilterBar 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid grid-cols-4 w-full max-w-2xl">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
              </TabsList>

              <TabsContent value="services" className="space-y-6">
                {Object.entries(availableServices).map(([category, services]) => (
                  <div key={category} className="space-y-4">
                    <h2 className="text-xl font-semibold capitalize">
                      {category.replace(/([A-Z])/g, ' $1').trim()}
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {services.map(service => (
                        <ServiceCard 
                          key={service.id} 
                          service={service}
                          onRequest={handleServiceRequest}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="overview">
                <div className="grid gap-4">
                  <h2 className="text-xl font-semibold">Welcome to Your Dashboard</h2>
                  <p className="text-muted-foreground">
                    Track your projects, manage services, and access resources all in one place.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <ProgressIndicator />
          </div>
        </div>
      </main>

      <MobileNavigation 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <ServiceRequestDialog 
        showServiceRequest={showServiceRequest}
        setShowServiceRequest={setShowServiceRequest}
        selectedService={selectedService}
        onRequestSubmit={handleRequestSubmit}
      />
    </div>
  );
};

export default Dashboard;