import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from "@/components/shared/ProtectedRoute";
import { AdminRoute } from "@/components/shared/AdminRoute";
import { RouteConfig } from "@/types/navigation";
import { publicRoutes, authRoutes, protectedRoutes, catchAllRoute } from "@/config/routes";

export const RouteRenderer: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      {publicRoutes.map((route) => (
        <Route 
          key={route.path} 
          path={route.path} 
          element={route.element} 
        />
      ))}

      {/* Auth routes */}
      {authRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <ProtectedRoute requiresAuth={false}>
              {route.element}
            </ProtectedRoute>
          }
        />
      ))}

      {/* Protected routes */}
      {protectedRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            route.adminOnly ? (
              <AdminRoute>{route.element}</AdminRoute>
            ) : (
              <ProtectedRoute>{route.element}</ProtectedRoute>
            )
          }
        />
      ))}

      {/* Catch all route */}
      <Route path={catchAllRoute.path} element={catchAllRoute.element} />
    </Routes>
  );
};