import { Link } from "react-router-dom";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
  onSignOut: () => void;
}

const MobileNav = ({ isOpen, onClose, isAuthenticated, onSignOut }: MobileNavProps) => {
  const menuItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Resources", path: "/resources" },
  ];

  const servicesSubmenu = [
    { label: "Startup Booster", path: "/services/startup-booster" },
    { label: "Enterprise Growth", path: "/services/enterprise-growth" },
    { label: "Sustainability Focus", path: "/services/sustainability-focus" },
    { label: "Business Incorporation", path: "/services/business-incorporation" },
    { label: "Training & Advisory", path: "/services/training-advisory" },
  ];

  if (!isOpen) return null;

  return (
    <div className="md:hidden py-4">
      <div className="flex flex-col space-y-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="text-gray-600 hover:text-brand-blue transition-colors"
            onClick={onClose}
          >
            {item.label}
          </Link>
        ))}
        {/* Mobile Services Submenu */}
        <div className="pl-4 space-y-2">
          {servicesSubmenu.map((subItem) => (
            <Link
              key={subItem.path}
              to={subItem.path}
              className="block text-sm text-gray-600 hover:text-brand-blue transition-colors"
              onClick={onClose}
            >
              {subItem.label}
            </Link>
          ))}
        </div>
        {isAuthenticated ? (
          <>
            <Link
              to="/dashboard"
              className="text-gray-600 hover:text-brand-blue transition-colors"
              onClick={onClose}
            >
              Dashboard
            </Link>
            <button
              className="text-left text-gray-600 hover:text-brand-blue transition-colors"
              onClick={() => {
                onSignOut();
                onClose();
              }}
            >
              Sign Out
            </button>
          </>
        ) : (
          <div className="flex flex-col space-y-2">
            <Link
              to="/login"
              className="text-gray-600 hover:text-brand-blue transition-colors"
              onClick={onClose}
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="text-gray-600 hover:text-brand-blue transition-colors"
              onClick={onClose}
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileNav;