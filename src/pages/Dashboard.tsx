import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardTabs from "@/components/dashboard/DashboardTabs";
import MobileNavigation from "@/components/dashboard/MobileNavigation";
import ServiceRequestDialog from "@/components/dashboard/ServiceRequestDialog";

const Dashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
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
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Website
          </Button>
        </div>
        
        <div className="grid gap-6">
          <DashboardTabs 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onServiceRequest={handleServiceRequest}
          />
        </div>
      </div>

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