export interface MenuItem {
  label: string;
  path: string;
}

export interface NavigationProps {
  menuItems: MenuItem[];
  servicesSubmenu: MenuItem[];
}