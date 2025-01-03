import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-b from-gray-900 to-gray-800 text-white py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            Empowering Africa's Growth Through Business and Technology
          </h1>
          <p className="text-xl mb-8 text-gray-300 animate-fade-in">
            Your trusted partner for business consulting, tech solutions, and incorporation services—tailored to Africa's unique opportunities.
          </p>
          <div className="space-x-4">
            <Button asChild className="animate-fade-in">
              <Link to="/services">Explore Our Services</Link>
            </Button>
            <Button asChild variant="outline" className="animate-fade-in">
              <Link to="/contact">Get a Quote</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;