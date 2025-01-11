import { Link } from "react-router-dom";

export const ServicesLinks = () => {
  const services = [
    { to: "/services/startup-booster", label: "Startup Booster" },
    { to: "/services/enterprise-growth", label: "Enterprise Growth" },
    { to: "/services/sustainability", label: "Sustainability Focus" },
    { to: "/services/business-incorporation", label: "Business Incorporation" },
    { to: "/services/training-advisory", label: "Training & Advisory" }
  ];

  return (
    <div>
      <h4 className="text-lg font-semibold mb-4">Services</h4>
      <ul className="space-y-2">
        {services.map((service) => (
          <li key={service.to}>
            <Link 
              to={service.to} 
              className="text-gray-400 hover:text-white transition-colors"
            >
              {service.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};