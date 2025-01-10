import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardTabs from "@/components/dashboard/DashboardTabs";
import MobileNavigation from "@/components/dashboard/MobileNavigation";
import ServiceRequestDialog from "@/components/dashboard/ServiceRequestDialog";

const Dashboard = () => {
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
        <div className="grid gap-6">
          <DashboardTabs 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onServiceRequest={handleServiceRequest}
          />
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