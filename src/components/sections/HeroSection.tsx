import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, Lightbulb, Globe, Users, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

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
      <div className="relative min-h-[80vh] flex items-center bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1649972904349-6e44c42644a7')] bg-cover bg-center opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Empowering Africa's Growth Through Business and Technology
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl mb-8 text-gray-300"
            >
              Your trusted partner for business consulting, tech solutions, and incorporation services—tailored to Africa's unique opportunities.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Button asChild size="lg" className="bg-brand-blue hover:bg-brand-blue/90">
                <Link to="/services">
                  Explore Our Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-3 bg-blue-50 rounded-full">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;