import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StrictMode } from "react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatBot from "@/components/shared/ChatBot";

import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import StartupBooster from "./pages/StartupBooster";
import EnterpriseGrowth from "./pages/EnterpriseGrowth";
import SustainabilityFocus from "./pages/SustainabilityFocus";
import BusinessIncorporation from "./pages/BusinessIncorporation";
import Blog from "./pages/Blog";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";

const queryClient = new QueryClient();

const App = () => (
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider delayDuration={0}>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 pt-16">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/startup-booster" element={<StartupBooster />} />
                <Route path="/services/enterprise-growth" element={<EnterpriseGrowth />} />
                <Route path="/services/sustainability-focus" element={<SustainabilityFocus />} />
                <Route path="/services/business-incorporation" element={<BusinessIncorporation />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>
            <Footer />
            <ChatBot />
          </div>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);

export default App;