import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Globe, FileCheck, Landmark, ArrowRight } from "lucide-react";

const BusinessIncorporation = () => {
  const services = [
    {
      icon: <Building2 className="h-6 w-6" />,
      title: "Incorporation in Africa",
      description: "Complete incorporation services including legal structure guidance, tax registration, and local compliance.",
      features: ["Legal Structure Setup", "Tax Registration", "Local Licensing", "Virtual Office"],
    },
    {
      icon: <Landmark className="h-6 w-6" />,
      title: "Incorporation in USA",
      description: "Full-service U.S. business formation including entity setup, EIN application, and compliance guidance.",
      features: ["Entity Formation", "EIN Application", "Bank Account Setup", "Compliance Support"],
    },
  ];

  const stats = [
    { icon: <Building2 className="h-8 w-8" />, value: "1000+", label: "Companies Formed" },
    { icon: <Globe className="h-8 w-8" />, value: "15+", label: "Countries Served" },
    { icon: <FileCheck className="h-8 w-8" />, value: "100%", label: "Success Rate" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-brand-green text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30" variant="secondary">
            Business Incorporation
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fadeIn">
            Establish Your Business with Confidence
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl animate-fadeIn" style={{ animationDelay: "0.2s" }}>
            Seamless incorporation services in Africa and the USA—your gateway to global markets.
          </p>
          <a href="https://calendly.com/mbeh" target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="secondary" className="hover-lift">
              Start Incorporating
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
            <h2 className="text-3xl font-bold mb-4">Incorporation Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Expert guidance through every step of the business incorporation process.
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

      {/* Pricing Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Transparent Pricing</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the package that best suits your business needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["Basic", "Plus", "Premium"].map((tier) => (
              <Card key={tier} className="hover-lift">
                <CardHeader>
                  <CardTitle className="text-center">{tier} Package</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <Button variant="outline" className="mt-4">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Incorporate?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Book a consultation with our legal and business experts today.
          </p>
          <a href="https://calendly.com/mbeh" target="_blank" rel="noopener noreferrer">
            <Button variant="secondary" size="lg" className="hover-lift">
              Get a Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default BusinessIncorporation;
