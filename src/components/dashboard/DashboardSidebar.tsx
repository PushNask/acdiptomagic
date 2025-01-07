import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Bell, 
  Headphones, 
  UserCircle, 
  LogOut,
  Download,
  Menu
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Sidebar, SidebarContent, SidebarTrigger } from "@/components/ui/sidebar";

const DashboardSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: FileText, label: 'Resources', path: '/resources' },
    { icon: Download, label: 'My Downloads', path: '/my-downloads' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
    { icon: Headphones, label: 'Support', path: '/support' },
    { icon: UserCircle, label: 'My Account', path: '/account' },
  ];

  return (
    <Sidebar className="border-r border-gray-200">
      <div className="flex h-full flex-col">
        <div className="p-4 border-b">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/d9c87483-f0cd-452d-830f-7b426cf762ef.png" 
              alt="AcDiToPush Logo" 
              className="h-8 w-auto"
            />
            <span className="text-xl font-bold hidden md:inline">AcDiToPush</span>
          </Link>
        </div>
        <SidebarContent>
          <nav className="space-y-1 px-2 py-4">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-primary text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="hidden md:inline">{item.label}</span>
              </Link>
            ))}
          </nav>
        </SidebarContent>
        <div className="mt-auto p-4 border-t">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
            onClick={handleSignOut}
          >
            <LogOut className="h-5 w-5 md:mr-2" />
            <span className="hidden md:inline">Sign Out</span>
          </Button>
        </div>
      </div>
      <SidebarTrigger className="absolute right-4 top-4 lg:hidden">
        <Menu className="h-6 w-6" />
      </SidebarTrigger>
    </Sidebar>
  );
};

export default DashboardSidebar;