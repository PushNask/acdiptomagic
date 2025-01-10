import { BookOpen, FileText, Download, Wallet } from "lucide-react";

interface MobileNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const MobileNavigation = ({ activeTab, setActiveTab }: MobileNavigationProps) => {
  const navItems = [
    { icon: BookOpen, label: "Overview", value: "overview" },
    { icon: FileText, label: "Services", value: "services" },
    { icon: Download, label: "Resources", value: "resources" },
    { icon: Wallet, label: "Billing", value: "billing" }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg md:hidden">
      <div className="grid grid-cols-4 gap-1">
        {navItems.map((item) => {
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
  );
};

export default MobileNavigation;