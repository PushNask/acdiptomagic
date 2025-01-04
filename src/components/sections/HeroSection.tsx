import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, Lightbulb, Globe, Users } from "lucide-react";

const HeroSection = () => {
  const whyChooseUs = [
    {
      icon: <Shield className="w-8 h-8 text-brand-blue" />,
      title: "Proven Expertise",
      description: "Over 30 years of combined experience in business and technology solutions."
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-brand-blue" />,
      title: "Innovative Solutions",
      description: "Cutting-edge technology combined with strategic business insights."
    },
    {
      icon: <Globe className="w-8 h-8 text-brand-blue" />,
      title: "Africa-Centric",
      description: "Deep understanding of local markets and unique African opportunities."
    },
    {
      icon: <Users className="w-8 h-8 text-brand-blue" />,
      title: "Client Success",
      description: "Dedicated to delivering measurable results and sustainable growth."
    }
  ];

  return (
    <>
      <div className="relative bg-gradient-to-b from-gray-900 to-gray-800 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              Empowering Africa's Growth Through Business and Technology
            </h1>
            <p className="text-xl mb-8 text-gray-300 animate-fade-in">
              Your trusted partner for business consulting, tech solutions, and incorporation services—tailored to Africa's unique opportunities.
            </p>
            <Button asChild className="animate-fade-in">
              <Link to="/services">Explore Our Services</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;