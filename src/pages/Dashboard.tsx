import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Bell, Search, Filter, PlusCircle, Phone, Menu,
  BookOpen, FileText, Download, Wallet
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import QuickStats from "@/components/dashboard/QuickStats";
import ServiceCard from "@/components/dashboard/ServiceCard";
import { ProgressIndicator } from "@/components/dashboard/ProgressIndicator";
import { ContextualHelp } from "@/components/shared/ContextualHelp";
import { useToast } from "@/hooks/use-toast";
import { availableServices } from "@/data/services";

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
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Menu className="h-6 w-6 text-muted-foreground md:hidden" />
              <div>
                <h1 className="text-lg font-semibold">Welcome to AcDiToPush</h1>
                <p className="text-sm text-muted-foreground">Your Business Growth Partner</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <ContextualHelp context="dashboard" />
              <Button variant="outline" size="sm" className="hidden md:flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                Schedule Call
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-destructive rounded-full"></span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 pb-20 md:pb-6">
        <div className="grid gap-6 md:grid-cols-[1fr_300px]">
          <div className="space-y-6">
            <QuickStats />
            
            {/* Search and Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search services..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <Button>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  New Request
                </Button>
              </div>
            </div>

            {/* Tabs Content */}
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

          {/* Sidebar */}
          <div className="space-y-6">
            <ProgressIndicator />
            {/* Additional sidebar content can go here */}
          </div>
        </div>
      </main>

      {/* Mobile Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg md:hidden">
        <div className="grid grid-cols-4 gap-1">
          {[
            { icon: BookOpen, label: "Overview", value: "overview" },
            { icon: FileText, label: "Services", value: "services" },
            { icon: Download, label: "Resources", value: "resources" },
            { icon: Wallet, label: "Billing", value: "billing" }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button 
                key={item.value}
                className={`flex flex-col items-center p-3 ${
                  activeTab === item.value ? "text-primary" : "text-muted-foreground"
                }`}
                onClick={() => setActiveTab(item.value)}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs mt-1">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Service Request Dialog */}
      <Dialog open={showServiceRequest} onOpenChange={setShowServiceRequest}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Request Service: {selectedService?.title}</DialogTitle>
            <DialogDescription>
              Fill out the details below to request this service
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Preferred Start Date</label>
              <Input type="date" className="w-full" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Project Description</label>
              <textarea 
                className="w-full min-h-[100px] p-2 border rounded-md" 
                placeholder="Describe your project requirements..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Budget Range</label>
              <select className="w-full p-2 border rounded-md">
                <option>$500 - $1,000</option>
                <option>$1,000 - $2,500</option>
                <option>$2,500 - $5,000</option>
                <option>$5,000+</option>
              </select>
            </div>
            <div className="pt-4 flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowServiceRequest(false)}>
                Cancel
              </Button>
              <Button onClick={handleRequestSubmit}>Submit Request</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
