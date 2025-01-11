import { Phone } from "lucide-react";
import { Link } from "react-router-dom";

export const CompanyInfo = () => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">AcDiToPush</h3>
      <p className="text-gray-400 mb-4">
        Empowering Africa's Growth Through Business and Technology
      </p>
      <div className="flex items-center gap-2 mb-4">
        <Phone size={16} className="text-gray-400" />
        <div className="flex flex-col">
          <a 
            href="tel:+18328570043" 
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Call our USA office"
          >
            USA: +1 832 857 0043
          </a>
          <a 
            href="tel:+237671154588" 
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Call our Cameroon office"
          >
            CMR: +237 671 154 588
          </a>
        </div>
      </div>
    </div>
  );
};