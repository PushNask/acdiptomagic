import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Logo } from "./navbar/Logo";
import { DesktopMenu } from "./navbar/DesktopMenu";
import { MobileMenu } from "./navbar/MobileMenu";
import { UserMenu } from "./navbar/UserMenu";
import { MenuItem } from "@/types/navigation";
import { supabase } from "@/integrations/supabase/client";

interface NavbarProps {
  className?: string;
}

const menuItems: MenuItem[] = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Resources", path: "/resources" }
];

const servicesSubmenu: MenuItem[] = [
  { label: "Startup Booster", path: "/services/startup-booster" },
  { label: "Enterprise Growth", path: "/services/enterprise-growth" },
  { label: "Sustainability Focus", path: "/services/sustainability-focus" },
  { label: "Business Incorporation", path: "/services/business-incorporation" },
  { label: "Training & Advisory", path: "/services/training-advisory" }
];

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <nav className={cn(
      "w-full bg-background border-b sticky top-0",
      className
    )}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Logo />
            <DesktopMenu 
              menuItems={menuItems} 
              servicesSubmenu={servicesSubmenu} 
            />
          </div>
          <div className="flex items-center gap-4">
            <UserMenu 
              user={user} 
              onSignOut={handleSignOut}
              navigate={navigate}
            />
            <MobileMenu 
              isOpen={isOpen}
              menuItems={menuItems}
              servicesSubmenu={servicesSubmenu}
              onClose={() => setIsOpen(false)}
              onSignOut={handleSignOut}
              user={user}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;