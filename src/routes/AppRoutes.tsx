import { Routes, Route } from "react-router-dom";
import AuthLayout from "@/components/layout/AuthLayout";
import MainLayout from "@/components/layout/MainLayout";

// Page imports
import Index from "@/pages/Index";
import About from "@/pages/About";
import Services from "@/pages/Services";
import StartupBooster from "@/pages/StartupBooster";
import EnterpriseGrowth from "@/pages/EnterpriseGrowth";
import SustainabilityFocus from "@/pages/SustainabilityFocus";
import BusinessIncorporation from "@/pages/BusinessIncorporation";
import TrainingAdvisory from "@/pages/TrainingAdvisory";
import Blog from "@/pages/Blog";
import Resources from "@/pages/Resources";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth routes without footer */}
      <Route path="/login" element={
        <AuthLayout>
          <Login />
        </AuthLayout>
      } />
      <Route path="/signup" element={
        <AuthLayout>
          <Signup />
        </AuthLayout>
      } />

      {/* Public routes */}
      <Route path="/" element={
        <MainLayout>
          <Index />
        </MainLayout>
      } />
      <Route path="/about" element={
        <MainLayout>
          <About />
        </MainLayout>
      } />
      <Route path="/services" element={
        <MainLayout>
          <Services />
        </MainLayout>
      } />
      <Route path="/services/startup-booster" element={
        <MainLayout>
          <StartupBooster />
        </MainLayout>
      } />
      <Route path="/services/enterprise-growth" element={
        <MainLayout>
          <EnterpriseGrowth />
        </MainLayout>
      } />
      <Route path="/services/sustainability-focus" element={
        <MainLayout>
          <SustainabilityFocus />
        </MainLayout>
      } />
      <Route path="/services/business-incorporation" element={
        <MainLayout>
          <BusinessIncorporation />
        </MainLayout>
      } />
      <Route path="/services/training-advisory" element={
        <MainLayout>
          <TrainingAdvisory />
        </MainLayout>
      } />
      <Route path="/blog" element={
        <MainLayout>
          <Blog />
        </MainLayout>
      } />
      <Route path="/resources" element={
        <MainLayout>
          <Resources />
        </MainLayout>
      } />
      <Route path="/contact" element={
        <MainLayout>
          <Contact />
        </MainLayout>
      } />

      {/* Catch all route */}
      <Route path="*" element={
        <MainLayout>
          <NotFound />
        </MainLayout>
      } />
    </Routes>
  );
};

export default AppRoutes;