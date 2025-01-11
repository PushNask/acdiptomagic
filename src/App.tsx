import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ProtectedRoute } from "@/components/shared/ProtectedRoute";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatBot from "@/components/shared/ChatBot";
import AnnouncementBanner from "@/components/shared/AnnouncementBanner";

// Page imports
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

// Wrapper component to conditionally render navbar
const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isDashboardRoute = location.pathname.startsWith('/dashboard');
  const showNavbar = !isAdminRoute && !isDashboardRoute;

  return (
    <div className="min-h-screen flex flex-col">
      {showNavbar && <AnnouncementBanner className="z-50" />}
      {showNavbar && <Navbar className="z-40" />}
      <main className={showNavbar ? "flex-1 pt-[136px]" : "flex-1"}> 
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
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/category/:category" element={<ResourceSales />} />

          {/* Auth routes - redirect if already logged in */}
          <Route 
            path="/login" 
            element={
              <ProtectedRoute requiresAuth={false}>
                <Login />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/signup" 
            element={
              <ProtectedRoute requiresAuth={false}>
                <Signup />
              </ProtectedRoute>
            } 
          />

          {/* Protected user routes */}
          <Route 
            path="/dashboard/*" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />

          {/* Protected admin routes */}
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute adminOnly>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />

          {/* Catch all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {showNavbar && <Footer />}
      <ChatBot />
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <AppContent />
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
