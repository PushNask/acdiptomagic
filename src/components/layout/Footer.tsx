import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { CompanyInfo } from "./footer/CompanyInfo";
import { QuickLinks } from "./footer/QuickLinks";
import { ServicesLinks } from "./footer/ServicesLinks";
import { Newsletter } from "./footer/Newsletter";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { Icon: Linkedin, href: "https://linkedin.com/company/acdito-push", label: "LinkedIn" },
    { Icon: Twitter, href: "https://twitter.com/acditopush", label: "Twitter" },
    { Icon: Facebook, href: "https://facebook.com/acditopush", label: "Facebook" },
    { Icon: Instagram, href: "https://instagram.com/acditopush", label: "Instagram" }
  ];

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="flex flex-col">
            <CompanyInfo />
            <div className="flex space-x-4 mt-4">
              {socialLinks.map(({ Icon, href, label }) => (
                <a 
                  key={label}
                  href={href}
                  className="hover:text-brand-green transition-colors"
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
          <QuickLinks />
          <ServicesLinks />
          <Newsletter />
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} AcDiToPush. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;