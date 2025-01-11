import React from 'react';
import { cn } from "@/lib/utils";
import Logo from "./navbar/Logo";
import DesktopMenu from "./navbar/DesktopMenu";
import MobileMenu from "./navbar/MobileMenu";
import UserMenu from "./navbar/UserMenu";

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  return (
    <nav className={cn(
      "w-full bg-background border-b sticky top-0",
      className
    )}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Logo />
            <DesktopMenu />
          </div>
          <div className="flex items-center gap-4">
            <UserMenu />
            <MobileMenu />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;