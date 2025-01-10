import { Bell, Phone, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContextualHelp } from "@/components/shared/ContextualHelp";

const DashboardHeader = () => {
  return (
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
  );
};

export default DashboardHeader;