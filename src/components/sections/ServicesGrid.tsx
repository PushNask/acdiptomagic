import { Card } from "@/components/ui/card";
import { Globe, Rocket, Leaf, Building, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const services = [
  {
    icon: <Rocket className="h-6 w-6" />,
    title: "Startup Booster",
    description: "Launch and scale your startup with expert guidance",
    features: ["Business Plan Development", "Market Research", "Prototype Development"],
    link: "/services/startup-booster"
  },
  {
    icon: <Building className="h-6 w-6" />,
    title: "Enterprise Growth",
    description: "Scale your business with strategic solutions",
    features: ["Market Expansion", "Tech Integration", "Process Optimization"],
    link: "/services/enterprise-growth"
  },
  {
    icon: <Leaf className="h-6 w-6" />,
    title: "Sustainability Focus",
    description: "Innovative solutions for sustainable development",
    features: ["Green Energy Solutions", "Smart Agriculture", "ESG Consulting"],
    link: "/services/sustainability-focus"
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Global Reach",
    description: "Business incorporation services in Africa and USA",
    features: ["Legal Structure Setup", "Compliance Support", "Market Entry"],
    link: "/services/business-incorporation"
  },
  {
    icon: <GraduationCap className="h-6 w-6" />,
    title: "Training & Advisory",
    description: "Expert coaching and mentoring for startups and SMEs",
    features: ["Skills Development", "Strategic Planning", "Tech Adoption"],
    link: "/services/training-advisory"
  },
];

const ServicesGrid = () => {
  return (
    <div className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive solutions tailored to your business needs, from startup guidance to enterprise growth
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link to={service.link} className="block h-full">
                <Card className="p-6 h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm border border-gray-200">
                  <div className="flex flex-col h-full">
                    <div className="p-3 bg-primary/10 rounded-full w-fit mb-4">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <div className="mt-auto">
                      <div className="border-t pt-4">
                        <ul className="space-y-2">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center text-sm text-gray-600">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesGrid;