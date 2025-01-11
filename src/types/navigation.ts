import { ReactNode } from 'react';

export interface MenuItem {
  label: string;
  path: string;
}

export interface RouteConfig {
  path: string;
  element: ReactNode;
  requiresAuth?: boolean;
  adminOnly?: boolean;
}