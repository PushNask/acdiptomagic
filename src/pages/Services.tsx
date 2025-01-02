import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket, Building, Leaf, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const Services = () => {
  const services = [
    {
      icon: <Rocket className="h-6 w-6" />,
      title: "Startup Booster",
      description: "Launch and scale your venture with expert guidance and solid foundation.",
      path: "/services/startup-booster",
    },
    {
      icon: <Building className="h-6 w-6" />,
      title: "Enterprise Growth",
      description: "Strategic solutions for established businesses looking to expand.",
      path: "/services/enterprise-growth",
    },
    {
      icon: <Leaf className="h-6 w-6" />,
      title: "Sustainability Focus",
      description: "Green energy and smart agriculture solutions for a better future.",
      path: "/services/sustainability-focus",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Business Incorporation",
      description: "Seamless incorporation services in Africa and USA.",
      path: "/services/business-incorporation",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fadeIn">
          Our Services
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fadeIn" style={{ animationDelay: "0.2s" }}>
          Comprehensive solutions tailored to your business needs, from startup to enterprise scale.
        </p>
      </section>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service) => (
          <Link key={service.title} to={service.path}>
            <Card className="h-full hover-lift animate-on-scroll">
              <CardHeader>
                <div className="text-brand-green mb-4">{service.icon}</div>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{service.description}</p>
                <Button variant="outline" className="mt-4">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* CTA Section */}
      <section className="text-center mt-20 bg-brand-green text-white rounded-lg p-12">
        <h2 className="text-3xl font-bold mb-6 animate-on-scroll">
          Ready to Get Started?
        </h2>
        <p className="text-lg mb-8 opacity-90 animate-on-scroll">
          Contact us today to discuss how we can help your business grow and succeed.
        </p>
        <Button variant="secondary" size="lg" className="hover-lift animate-on-scroll">
          Contact Us
        </Button>
      </section>
    </div>
  );
};

export default Services;