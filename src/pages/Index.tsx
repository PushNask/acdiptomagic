import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Globe, Rocket, Leaf, Building, GraduationCap } from "lucide-react";
import TrendsSector from "@/components/sections/TrendsSector";

const Index = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    });

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  const services = [
    {
      icon: <Rocket className="h-6 w-6" />,
      title: "Startup Booster",
      description: "Launch and scale your venture with expert guidance and solid foundation",
    },
    {
      icon: <Building className="h-6 w-6" />,
      title: "Enterprise Growth",
      description: "Strategic solutions for established businesses looking to expand",
    },
    {
      icon: <Leaf className="h-6 w-6" />,
      title: "Sustainability Focus",
      description: "Green energy and smart agriculture solutions for a better future",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Global Reach",
      description: "Business incorporation services in Africa and USA",
    },
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: "Training & Advisory",
      description: "Expert coaching and mentoring for startups and SMEs",
    },
  ];

  const successStories = [
    {
      title: "Tech Startup Success",
      client: "InnovateTech Africa",
      description: "Helped scale operations across three African countries with custom software solutions.",
      impact: "300% growth in first year",
    },
    {
      title: "Sustainable Agriculture",
      client: "GreenHarvest Ltd",
      description: "Implemented smart farming solutions that revolutionized local farming practices.",
      impact: "50% increase in crop yield",
    },
    {
      title: "Energy Innovation",
      client: "SolarPower Solutions",
      description: "Facilitated expansion into rural markets with off-grid energy solutions.",
      impact: "10,000+ households connected",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-green/10 to-transparent" />
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fadeIn">
            Empowering Africa's Growth Through Business and Technology
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fadeIn" style={{ animationDelay: "0.2s" }}>
            Your trusted partner for business consulting, tech solutions, and incorporation services—tailored to Africa's unique opportunities.
          </p>
          <Button size="lg" className="animate-fadeIn hover-lift" style={{ animationDelay: "0.4s" }}>
            Explore Our Services
          </Button>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 animate-on-scroll">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={service.title} className="p-6 glass-card hover-lift animate-on-scroll">
                <div className="mb-4 text-brand-green">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Why Choose Us</h2>
            <p className="text-lg text-muted-foreground mb-8">
              With over three decades of combined experience in business strategy, technology, and sustainable project management, we understand Africa's challenges and opportunities.
            </p>
            <Button variant="outline" className="hover-lift">
              Learn More About Us
            </Button>
          </div>
        </div>
      </section>

      {/* Add Trends Section here */}
      <TrendsSector />

      {/* Success Stories Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 animate-on-scroll">
            Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <Card key={story.title} className="p-6 hover-lift animate-on-scroll">
                <h3 className="text-xl font-semibold mb-2">{story.title}</h3>
                <p className="text-sm text-brand-green mb-4">{story.client}</p>
                <p className="text-muted-foreground mb-4">{story.description}</p>
                <p className="font-semibold text-brand-green">{story.impact}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-brand-green text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Ready to Get Started?</h2>
            <p className="text-lg opacity-90 mb-8">
              Let's discuss how we can help your business grow and succeed in the African market.
            </p>
            <Button variant="secondary" size="lg" className="hover-lift">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
