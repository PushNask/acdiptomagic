import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import type { User } from '@supabase/supabase-js';

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatBot from "@/components/shared/ChatBot";
import AnnouncementBanner from "@/components/shared/AnnouncementBanner";

import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import StartupBooster from "./pages/StartupBooster";
import EnterpriseGrowth from "./pages/EnterpriseGrowth";
import SustainabilityFocus from "./pages/SustainabilityFocus";
import BusinessIncorporation from "./pages/BusinessIncorporation";
import TrainingAdvisory from "./pages/TrainingAdvisory";
import Blog from "./pages/Blog";
import Resources from "./pages/Resources";
import ResourceSales from "./pages/ResourceSales";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

const ProtectedRoute = ({ children, adminOnly = false }: { children: React.ReactNode, adminOnly?: boolean }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user;
      setUser(currentUser ?? null);

      if (currentUser) {
        // Get the user_type from the profiles table
        const { data: profile } = await supabase
          .from('profiles')
          .select('user_type')
          .eq('id', currentUser.id)
          .single();
        
        setIsAdmin(profile?.user_type === 'admin');
      }

      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_, session) => {
      const currentUser = session?.user;
      setUser(currentUser ?? null);

      if (currentUser) {
        // Get the user_type from the profiles table
        const { data: profile } = await supabase
          .from('profiles')
          .select('user_type')
          .eq('id', currentUser.id)
          .single();
        
        setIsAdmin(profile?.user_type === 'admin');
      }

      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If this is an admin-only route and the user is not an admin
  if (adminOnly && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  // If the user is an admin and they're trying to access the regular dashboard
  if (isAdmin && !adminOnly && window.location.pathname === '/dashboard') {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <div className="min-h-screen flex flex-col">
            <AnnouncementBanner />
            <Navbar />
            <main className="flex-1 pt-16">
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/startup-booster" element={<StartupBooster />} />
                <Route path="/services/enterprise-growth" element={<EnterpriseGrowth />} />
                <Route path="/services/sustainability-focus" element={<SustainabilityFocus />} />
                <Route path="/services/business-incorporation" element={<BusinessIncorporation />} />
                <Route path="/services/training-advisory" element={<TrainingAdvisory />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/resources/category/:category" element={<ResourceSales />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Protected routes */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />

                {/* Admin routes */}
                <Route path="/admin" element={
                  <ProtectedRoute adminOnly>
                    <AdminDashboard />
                  </ProtectedRoute>
                } />

                {/* Catch all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <ChatBot />
          </div>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;