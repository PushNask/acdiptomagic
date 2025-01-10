import { Link } from "react-router-dom";
import { MenuItem } from "@/types/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface MobileMenuProps {
  isOpen: boolean;
  menuItems: MenuItem[];
  servicesSubmenu: MenuItem[];
  onClose: () => void;
  onSignOut?: () => void;
  user: any;
}

export const MobileMenu = ({
  isOpen,
  menuItems,
  servicesSubmenu,
  onClose,
  onSignOut,
  user,
}: MobileMenuProps) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkUserType = async () => {
      if (user) {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('user_type')
          .eq('id', user.id)
          .single();

        if (!error && profile) {
          setIsAdmin(profile.user_type === 'admin');
        }
      }
    };

    checkUserType();
  }, [user]);

  if (!isOpen) return null;

  return (
    <div className="md:hidden py-4">
      <div className="flex flex-col space-y-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="text-gray-600 hover:text-brand-blue transition-colors"
            onClick={onClose}
          >
            {item.label}
          </Link>
        ))}
        <div className="pl-4 space-y-2">
          {servicesSubmenu.map((subItem) => (
            <Link
              key={subItem.path}
              to={subItem.path}
              className="block text-sm text-gray-600 hover:text-brand-blue transition-colors"
              onClick={onClose}
            >
              {subItem.label}
            </Link>
          ))}
        </div>
        {user ? (
          <>
            <Link
              to={isAdmin ? "/admin" : "/dashboard"}
              className="text-gray-600 hover:text-brand-blue transition-colors"
              onClick={onClose}
            >
              {isAdmin ? "Admin Dashboard" : "Dashboard"}
            </Link>
            <Link
              to="/invoice"
              className="text-gray-600 hover:text-brand-blue transition-colors"
              onClick={onClose}
            >
              Invoices
            </Link>
            <button
              className="text-left text-gray-600 hover:text-brand-blue transition-colors"
              onClick={() => {
                if (onSignOut) onSignOut();
                onClose();
              }}
            >
              Sign Out
            </button>
          </>
        ) : (
          <div className="flex flex-col space-y-2">
            <Link
              to="/login"
              className="text-gray-600 hover:text-brand-blue transition-colors"
              onClick={onClose}
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="text-gray-600 hover:text-brand-blue transition-colors"
              onClick={onClose}
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};