import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from "./Navbar";
import Footer from "./Footer";
import AnnouncementBanner from "@/components/shared/AnnouncementBanner";
import ChatBot from "@/components/shared/ChatBot";

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isDashboardRoute = location.pathname.startsWith('/dashboard');
  const showNavbar = !isAdminRoute && !isDashboardRoute;

  return (
    <div className="min-h-screen flex flex-col">
      {showNavbar && <AnnouncementBanner className="z-50" />}
      {showNavbar && <Navbar className="z-40" />}
      <main className={showNavbar ? "flex-1 pt-[136px]" : "flex-1"}> 
        {children}
      </main>
      {showNavbar && <Footer />}
      <ChatBot />
    </div>
  );
};