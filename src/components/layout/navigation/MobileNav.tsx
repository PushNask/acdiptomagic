import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
}

const MobileNav = ({ isOpen, onClose, isAuthenticated }: MobileNavProps) => {
  const { signOut } = useAuth();
  
  const handleSignOut = async () => {
    try {
      await signOut();
      onClose();
      toast.success('Signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Error signing out');
    }
  };

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Resources", path: "/resources" },
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
        {isAuthenticated ? (
          <button
            className="text-left text-gray-600 hover:text-brand-blue transition-colors"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
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