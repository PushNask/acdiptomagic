import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from '@supabase/supabase-js';
import { Logo } from "./navbar/Logo";
import { DesktopMenu } from "./navbar/DesktopMenu";
import { MobileMenu } from "./navbar/MobileMenu";
import { UserMenu } from "./navbar/UserMenu";
import type { MenuItem } from "@/types/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const menuItems: MenuItem[] = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Resources", path: "/resources" },
  ];

  const servicesSubmenu: MenuItem[] = [
    { label: "Startup Booster", path: "/services/startup-booster" },
    { label: "Enterprise Growth", path: "/services/enterprise-growth" },
    { label: "Sustainability Focus", path: "/services/sustainability-focus" },
    { label: "Business Incorporation", path: "/services/business-incorporation" },
    { label: "Training & Advisory", path: "/services/training-advisory" },
  ];

  return (
    <nav className="fixed top-[40px] left-0 right-0 z-40 bg-white/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Logo />

          <DesktopMenu 
            menuItems={menuItems}
            servicesSubmenu={servicesSubmenu}
          />

          <div className="hidden md:flex items-center space-x-4">
            <UserMenu 
              user={user}
              onSignOut={handleSignOut}
              navigate={navigate}
            />
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <MobileMenu 
          isOpen={isOpen}
          menuItems={menuItems}
          servicesSubmenu={servicesSubmenu}
          onClose={() => setIsOpen(false)}
          onSignOut={handleSignOut}
          user={user}
        />
      </div>
    </nav>
  );
};

export default Navbar;