import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Bell, 
  Headphones, 
  UserCircle, 
  LogOut,
  Download
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Sidebar, SidebarContent, SidebarTrigger } from "@/components/ui/sidebar";

const DashboardSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Signed out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Error signing out');
    }
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
    <Sidebar>
      <div className="flex h-full flex-col">
        <div className="p-4">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/d9c87483-f0cd-452d-830f-7b426cf762ef.png" 
              alt="AcDiToPush Logo" 
              className="h-8 w-auto"
            />
            <span className="text-xl font-bold">AcDiToPush</span>
          </Link>
        </div>
        <SidebarContent>
          <nav className="space-y-2 px-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-primary text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </SidebarContent>
        <div className="mt-auto p-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
            onClick={handleSignOut}
          >
            <LogOut className="mr-2 h-5 w-5" />
            Sign Out
          </Button>
        </div>
      </div>
      <SidebarTrigger className="absolute right-4 top-4 lg:hidden" />
    </Sidebar>
  );
};

export default DashboardSidebar;