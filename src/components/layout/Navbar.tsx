import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { MainNav } from "./navigation/MainNav";
import MobileNav from "./navigation/MobileNav";
import { UserNav } from "./navigation/UserNav";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

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
            <UserNav />
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
        />
      </div>
    </nav>
  );
};

export default Navbar;