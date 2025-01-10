import { Link } from "react-router-dom";
import { MenuItem } from "@/types/navigation";

interface DesktopMenuProps {
  menuItems: MenuItem[];
  servicesSubmenu: MenuItem[];
}

export const DesktopMenu = ({ menuItems, servicesSubmenu }: DesktopMenuProps) => {
  return (
    <div className="hidden md:flex items-center space-x-4">
      {menuItems.map((item) => (
        <div key={item.path} className="relative group">
          <Link
            to={item.path}
            className="text-gray-600 hover:text-brand-blue transition-colors"
          >
            {item.label}
          </Link>
          {item.label === "Services" && (
            <div className="absolute left-0 mt-2 w-64 bg-white border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <div className="py-2">
                {servicesSubmenu.map((subItem) => (
                  <Link
                    key={subItem.path}
                    to={subItem.path}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {subItem.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};