import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, User, UserPlus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAdminStatus } from "@/hooks/useAdminStatus";

interface UserMenuProps {
  user: any;
  onSignOut: () => void;
  navigate: (path: string) => void;
}

export const UserMenu = ({ user, onSignOut, navigate }: UserMenuProps) => {
  const { isAdmin } = useAdminStatus(user?.id);

  if (!user) {
    return (
      <div className="flex items-center space-x-2">
        <Button 
          variant="ghost"
          onClick={() => navigate("/login")}
          className="flex items-center"
        >
          <LogIn className="w-4 h-4 mr-2" />
          Sign In
        </Button>
        <Button 
          variant="default"
          onClick={() => navigate("/signup")}
          className="bg-brand-orange hover:bg-brand-orange/90 text-white flex items-center"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Sign Up
        </Button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <User className="w-4 h-4 mr-2" />
          Account
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => navigate(isAdmin ? "/admin" : "/dashboard")}>
          {isAdmin ? "Admin Dashboard" : "Dashboard"}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/invoice")}>
          Invoices
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onSignOut}>
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};