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
    <nav 
      className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg md:hidden z-50"
      aria-label="Mobile navigation"
    >
      <div className="grid grid-cols-4 gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.value;
          return (
            <button 
              key={item.value}
              className={`flex flex-col items-center justify-center p-4 transition-colors duration-200 ${
                isActive 
                  ? "text-primary bg-primary/5" 
                  : "text-muted-foreground hover:text-primary hover:bg-primary/5"
              }`}
              onClick={() => setActiveTab(item.value)}
              aria-label={`${item.label} tab`}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNavigation;