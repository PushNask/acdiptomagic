import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Sun, Sprout, BarChart3, ArrowRight } from "lucide-react";

const SustainabilityFocus = () => {
  const services = [
    {
      icon: <Sun className="h-6 w-6" />,
      title: "Energy & Off-Grid Projects",
      description: "Solar solutions, mini-grid management, and comprehensive feasibility studies.",
      features: ["Solar Solutions", "Mini-Grid Systems", "Feasibility Studies", "Energy Optimization"],
    },
    {
      icon: <Sprout className="h-6 w-6" />,
      title: "Sustainable Agriculture",
      description: "Smart farming technologies, supply chain optimization, and farm-to-market strategies.",
      features: ["Smart Farming", "Supply Chain", "Market Access", "Tech Integration"],
    },
  ];

  const stats = [
    { icon: <Sun className="h-8 w-8" />, value: "50K+", label: "Tons CO2 Reduced" },
    { icon: <Sprout className="h-8 w-8" />, value: "10K+", label: "Farmers Empowered" },
    { icon: <BarChart3 className="h-8 w-8" />, value: "30%", label: "Yield Increase" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-brand-green text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30" variant="secondary">
            Sustainability Focus
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fadeIn">
            Building a Sustainable Future
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl animate-fadeIn" style={{ animationDelay: "0.2s" }}>
            Innovative energy and agriculture solutions for a greener, more resilient Africa.
          </p>
          <a href="https://calendly.com/mbeh" target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="secondary" className="hover-lift">
              Start Your Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center text-center p-6 rounded-lg bg-gray-50">
                <div className="text-brand-green mb-3">{stat.icon}</div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Sustainable Solutions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Driving positive environmental impact through innovative energy and agriculture solutions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <Card key={service.title} className="h-full hover-lift">
                <CardHeader>
                  <div className="text-brand-green mb-4">{service.icon}</div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-green mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Make an Impact?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join us in building a greener, more sustainable Africa.
          </p>
          <a href="https://calendly.com/mbeh" target="_blank" rel="noopener noreferrer">
            <Button variant="secondary" size="lg" className="hover-lift">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default SustainabilityFocus;
