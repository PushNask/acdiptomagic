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
  const hideNavigation = isAdminRoute || isDashboardRoute;

  return (
    <div className="min-h-screen flex flex-col">
      {!hideNavigation && <AnnouncementBanner className="z-50" />}
      {!hideNavigation && <Navbar className="z-40" />}
      <main className="flex-1"> 
        {children}
      </main>
      {!hideNavigation && <Footer />}
      <ChatBot />
    </div>
  );
};