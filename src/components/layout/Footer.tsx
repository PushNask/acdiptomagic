import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">AcDiToPush</h3>
            <p className="text-gray-400 mb-4">
              Empowering Africa's Growth Through Business and Technology
            </p>
            <div className="flex items-center gap-2 mb-4">
              <Phone size={16} className="text-gray-400" />
              <div className="flex flex-col">
                <a href="tel:+18328570043" className="text-gray-400 hover:text-white transition-colors">
                  USA: +1 832 857 0043
                </a>
                <a href="tel:+237671154588" className="text-gray-400 hover:text-white transition-colors">
                  CMR: +237 671 154 588
                </a>
              </div>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-brand-green transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="hover:text-brand-green transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-brand-green transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-brand-green transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/success-stories" className="text-gray-400 hover:text-white transition-colors">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-400 hover:text-white transition-colors">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/services/startup-booster" className="text-gray-400 hover:text-white transition-colors">
                  Startup Booster
                </Link>
              </li>
              <li>
                <Link to="/services/enterprise-growth" className="text-gray-400 hover:text-white transition-colors">
                  Enterprise Growth
                </Link>
              </li>
              <li>
                <Link to="/services/sustainability" className="text-gray-400 hover:text-white transition-colors">
                  Sustainability Focus
                </Link>
              </li>
              <li>
                <Link to="/services/business-incorporation" className="text-gray-400 hover:text-white transition-colors">
                  Business Incorporation
                </Link>
              </li>
              <li>
                <Link to="/services/training-advisory" className="text-gray-400 hover:text-white transition-colors">
                  Training & Advisory
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest updates and insights.
            </p>
            <div className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-brand-green"
              />
              <Button variant="default">Subscribe</Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
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