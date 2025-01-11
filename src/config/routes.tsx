import { RouteConfig } from "@/types/navigation";

// Page imports
import Index from "@/pages/Index";
import About from "@/pages/About";
import Services from "@/pages/Services";
import StartupBooster from "@/pages/StartupBooster";
import EnterpriseGrowth from "@/pages/EnterpriseGrowth";
import SustainabilityFocus from "@/pages/SustainabilityFocus";
import BusinessIncorporation from "@/pages/BusinessIncorporation";
import TrainingAdvisory from "@/pages/TrainingAdvisory";
import Resources from "@/pages/Resources";
import ResourceSales from "@/pages/ResourceSales";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import Dashboard from "@/pages/Dashboard";
import AdminDashboard from "@/pages/admin/Dashboard";

export const publicRoutes: RouteConfig[] = [
  { path: "/", element: <Index /> },
  { path: "/about", element: <About /> },
  { path: "/services", element: <Services /> },
  { path: "/services/startup-booster", element: <StartupBooster /> },
  { path: "/services/enterprise-growth", element: <EnterpriseGrowth /> },
  { path: "/services/sustainability-focus", element: <SustainabilityFocus /> },
  { path: "/services/business-incorporation", element: <BusinessIncorporation /> },
  { path: "/services/training-advisory", element: <TrainingAdvisory /> },
  { path: "/resources", element: <Resources /> },
  { path: "/resources/category/:category", element: <ResourceSales /> },
];

export const authRoutes: RouteConfig[] = [
  { 
    path: "/login", 
    element: <Login />,
    requiresAuth: false 
  },
  { 
    path: "/signup", 
    element: <Signup />,
    requiresAuth: false 
  },
];

export const protectedRoutes: RouteConfig[] = [
  { 
    path: "/dashboard/*", 
    element: <Dashboard />,
    requiresAuth: true 
  },
  { 
    path: "/admin/*", 
    element: <AdminDashboard />,
    requiresAuth: true,
    adminOnly: true 
  },
];

export const catchAllRoute: RouteConfig = {
  path: "*",
  element: <NotFound />
};