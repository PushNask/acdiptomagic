import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Sun, Sprout, BarChart3 } from "lucide-react";

const SustainabilityFocus = () => {
  const services = [
    {
      icon: <Sun className="h-6 w-6" />,
      title: "Energy & Off-Grid Projects",
      description: "Solar solutions, mini-grid management, and comprehensive feasibility studies.",
    },
    {
      icon: <Sprout className="h-6 w-6" />,
      title: "Sustainable Agriculture",
      description: "Smart farming technologies, supply chain optimization, and farm-to-market strategies.",
    },
  ];

  const impactMetrics = [
    {
      metric: "50,000+",
      label: "Tons of CO2 Reduced",
    },
    {
      metric: "10,000+",
      label: "Households Connected",
    },
    {
      metric: "500+",
      label: "Farmers Empowered",
    },
    {
      metric: "30%",
      label: "Average Yield Increase",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fadeIn">
          Sustainability Focus
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fadeIn" style={{ animationDelay: "0.2s" }}>
          Championing sustainability through innovative energy and agriculture solutions.
        </p>
        <Button size="lg" className="animate-fadeIn hover-lift" style={{ animationDelay: "0.4s" }}>
          Explore Solutions
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
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12 animate-on-scroll">
          Our Impact
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {impactMetrics.map((item) => (
            <Card key={item.label} className="text-center p-6 hover-lift animate-on-scroll">
              <h3 className="text-3xl font-bold text-brand-green mb-2">{item.metric}</h3>
              <p className="text-muted-foreground">{item.label}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Success Story */}
      <section className="mb-20 bg-secondary/30 rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-12 animate-on-scroll">
          Success Story
        </h2>
        <div className="max-w-2xl mx-auto">
          <Card className="animate-on-scroll">
            <CardHeader>
              <CardTitle>Rural Electrification Project</CardTitle>
              <p className="text-brand-green">SolarPower Solutions</p>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Implemented solar-powered mini-grids in 15 rural communities, providing reliable electricity to over 10,000 households and enabling local businesses to thrive.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-brand-green">40%</p>
                  <p className="text-sm text-muted-foreground">Cost Reduction</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-brand-green">24/7</p>
                  <p className="text-sm text-muted-foreground">Power Availability</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-brand-green text-white rounded-lg p-12">
        <h2 className="text-3xl font-bold mb-6 animate-on-scroll">
          Join Us in Building a Sustainable Future
        </h2>
        <p className="text-lg mb-8 opacity-90 animate-on-scroll">
          Let's create sustainable solutions that benefit both communities and the environment.
        </p>
        <Button variant="secondary" size="lg" className="hover-lift animate-on-scroll">
          Start Your Project
        </Button>
      </section>
    </div>
  );
};

export default SustainabilityFocus;