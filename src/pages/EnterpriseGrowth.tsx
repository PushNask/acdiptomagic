import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Globe, Server, TrendingUp, ArrowRight } from "lucide-react";

const EnterpriseGrowth = () => {
  const services = [
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Market Expansion Strategies",
      description: "Comprehensive feasibility studies, distribution channel optimization, and strategic partnership identification.",
      features: ["Market Entry Analysis", "Distribution Networks", "Partnership Development", "Risk Management"],
    },
    {
      icon: <Server className="h-6 w-6" />,
      title: "Advanced Tech Solutions",
      description: "Custom software development, AI-driven analytics, and scalable mobile applications.",
      features: ["Custom Software", "AI Analytics", "Mobile Apps", "Cloud Solutions"],
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Project Management",
      description: "PMO setup, resource allocation optimization, and process improvement frameworks.",
      features: ["PMO Setup", "Resource Planning", "Process Optimization", "Performance Tracking"],
    },
  ];

  const stats = [
    { icon: <Building2 className="h-8 w-8" />, value: "500+", label: "Projects Delivered" },
    { icon: <Globe className="h-8 w-8" />, value: "15+", label: "Countries Served" },
    { icon: <TrendingUp className="h-8 w-8" />, value: "200%", label: "Average Growth" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30" variant="secondary">
            Enterprise Growth
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fadeIn max-w-3xl">
            Scale Your Enterprise to New Heights
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl animate-fadeIn leading-relaxed" style={{ animationDelay: "0.2s" }}>
            Strategic market expansion and cutting-edge tech solutions for sustainable growth.
          </p>
          <a href="https://calendly.com/mbeh" target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="secondary" className="hover:shadow-lg transition-shadow duration-300">
              Explore Solutions
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
        </div>
      </section>

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
            <h2 className="text-3xl font-bold mb-4">Enterprise Solutions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive growth solutions tailored for established enterprises looking to scale.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
          <h2 className="text-3xl font-bold mb-6">Ready to Scale Your Enterprise?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Book a consultation to discuss your expansion goals.
          </p>
          <a href="https://calendly.com/mbeh" target="_blank" rel="noopener noreferrer">
            <Button variant="secondary" size="lg" className="hover-lift">
              Book Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default EnterpriseGrowth;
