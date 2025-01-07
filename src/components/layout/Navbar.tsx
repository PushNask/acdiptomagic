import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import type { User } from '@supabase/supabase-js';
import MainNav from "./navigation/MainNav";
import MobileNav from "./navigation/MobileNav";
import UserNav from "./navigation/UserNav";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserType(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserType(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserType = async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('user_type')
      .eq('id', userId)
      .single();
    setUserType(data?.user_type ?? null);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold" style={{ color: '#1E88E5' }}>
              AcDiTo<span style={{ color: '#F97316' }}>Push</span>
            </span>
          </Link>

          <MainNav />

          <div className="hidden md:flex items-center space-x-2">
            {user ? (
              <UserNav onSignOut={handleSignOut} userType={userType} />
            ) : (
              <>
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
              </>
            )}
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <MobileNav 
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          isAuthenticated={!!user}
          onSignOut={handleSignOut}
        />
      </div>
    </nav>
  );
};

export default Navbar;