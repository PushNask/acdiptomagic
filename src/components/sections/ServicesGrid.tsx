import { Card } from "@/components/ui/card";
import { Globe, Rocket, Leaf, Building, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: <Rocket className="h-6 w-6" />,
    title: "Startup Booster",
    description: "Launch and scale your startup with expert guidance",
    link: "/services/startup-booster"
  },
  {
    icon: <Building className="h-6 w-6" />,
    title: "Enterprise Growth",
    description: "Scale your business with strategic solutions",
    link: "/services/enterprise-growth"
  },
  {
    icon: <Leaf className="h-6 w-6" />,
    title: "Sustainability Focus",
    description: "Innovative solutions for sustainable development",
    link: "/services/sustainability-focus"
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Global Reach",
    description: "Business incorporation services in Africa and USA",
    link: "/services/business-incorporation"
  },
  {
    icon: <GraduationCap className="h-6 w-6" />,
    title: "Training & Advisory",
    description: "Expert coaching and mentoring for startups and SMEs",
    link: "/services/training-advisory"
  },
];

const ServicesGrid = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link 
              key={index} 
              to={service.link}
              className="hover-lift"
            >
              <Card className="p-6 h-full glass-card">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-primary/10 rounded-full mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesGrid;