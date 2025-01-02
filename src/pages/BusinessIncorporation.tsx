import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Globe, FileCheck, Landmark } from "lucide-react";

const BusinessIncorporation = () => {
  const services = [
    {
      icon: <Building2 className="h-6 w-6" />,
      title: "Incorporation in Africa",
      features: [
        "Legal structure guidance (LLC, partnership)",
        "Tax registration and compliance",
        "Local licensing and permits",
        "Virtual office solutions",
      ],
    },
    {
      icon: <Landmark className="h-6 w-6" />,
      title: "Incorporation in USA",
      features: [
        "Entity formation (LLC, C-Corp, S-Corp)",
        "EIN application",
        "Bank account setup",
        "IRS compliance guidance",
      ],
    },
  ];

  const benefits = [
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Multi-jurisdictional Expertise",
      description: "Navigate complex legal requirements across different markets with ease.",
    },
    {
      icon: <FileCheck className="h-6 w-6" />,
      title: "Fast-tracked Processing",
      description: "Expedited paperwork handling and streamlined incorporation process.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fadeIn">
          Business Incorporation Solutions
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fadeIn" style={{ animationDelay: "0.2s" }}>
          Establish your business in Africa or the USA with ease—let our experts guide you through every step.
        </p>
        <Button size="lg" className="animate-fadeIn hover-lift" style={{ animationDelay: "0.4s" }}>
          Get Started
        </Button>
      </section>

      {/* Services Grid */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12 animate-on-scroll">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <Card key={service.title} className="hover-lift animate-on-scroll">
              <CardHeader>
                <div className="text-brand-green mb-4">{service.icon}</div>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-brand-green rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mb-20 bg-secondary/30 rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-12 animate-on-scroll">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {benefits.map((benefit) => (
            <Card key={benefit.title} className="hover-lift animate-on-scroll">
              <CardHeader>
                <div className="text-brand-green mb-4">{benefit.icon}</div>
                <CardTitle>{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12 animate-on-scroll">
          Transparent Pricing
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {["Basic", "Plus", "Premium"].map((tier) => (
            <Card key={tier} className="hover-lift animate-on-scroll">
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
      </section>

      {/* CTA Section */}
      <section className="text-center bg-brand-green text-white rounded-lg p-12">
        <h2 className="text-3xl font-bold mb-6 animate-on-scroll">
          Ready to Incorporate?
        </h2>
        <p className="text-lg mb-8 opacity-90 animate-on-scroll">
          Book a consultation with our legal and business experts today.
        </p>
        <Button variant="secondary" size="lg" className="hover-lift animate-on-scroll">
          Book Consultation
        </Button>
      </section>
    </div>
  );
};

export default BusinessIncorporation;