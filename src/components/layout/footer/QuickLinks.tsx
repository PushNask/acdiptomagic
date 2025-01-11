import { Link } from "react-router-dom";

export const QuickLinks = () => {
  const links = [
    { to: "/about", label: "About Us" },
    { to: "/services", label: "Services" },
    { to: "/success-stories", label: "Success Stories" },
    { to: "/resources", label: "Resources" }
  ];

  return (
    <div>
      <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.to}>
            <Link 
              to={link.to} 
              className="text-gray-400 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};