import { Link } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface UserNavProps {
  onSignOut: () => void;
  userType?: string | null;
}

const UserNav = ({ onSignOut, userType }: UserNavProps) => {
  const handleSignOut = async () => {
    try {
      console.log('Attempting to sign out...');
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      console.log('Sign out successful');
      toast.success('Signed out successfully');
      onSignOut();
    } catch (error) {
      console.error('Sign out error:', error);
      toast.error('Failed to sign out');
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <User className="w-4 h-4 mr-2" />
          Account
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem asChild>
          <Link to="/dashboard" className="w-full">Dashboard</Link>
        </DropdownMenuItem>
        {userType === 'admin' && (
          <DropdownMenuItem asChild>
            <Link to="/admin" className="w-full">Admin Dashboard</Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNav;