import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section 
      className="relative min-h-[85vh] flex items-center bg-gradient-to-b from-gray-900 to-gray-800 text-white"
      aria-label="Hero section"
    >
      <div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1649972904349-6e44c42644a7')] bg-cover bg-center opacity-10" 
        role="presentation"
      />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            variants={itemVariants}
          >
            Empowering Africa's Growth Through Business and Technology
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Your trusted partner for business consulting, tech solutions, and incorporation services—tailored to Africa's unique opportunities.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={itemVariants}
          >
            <Button 
              size="lg"
              className="bg-brand-blue hover:bg-brand-blue/90 text-white min-w-[200px] min-h-[48px] text-lg"
              onClick={() => navigate('/services')}
            >
              Explore Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 min-w-[200px] min-h-[48px] text-lg"
              onClick={() => navigate('/contact')}
            >
              Get in Touch
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;