import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Globe, Server, TrendingUp } from "lucide-react";

const EnterpriseGrowth = () => {
  const services = [
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Market Expansion Strategies",
      description: "Comprehensive feasibility studies, distribution channel optimization, and strategic partnership identification.",
    },
    {
      icon: <Server className="h-6 w-6" />,
      title: "Advanced Tech Solutions",
      description: "Custom software development, AI-driven analytics, and scalable mobile applications.",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Project Management for Scaling",
      description: "PMO setup, resource allocation optimization, and process improvement frameworks.",
    },
  ];

  const caseStudy = {
    title: "Regional Market Expansion Success",
    client: "TechGrow Solutions",
    challenge: "Expanding operations across West African markets while maintaining service quality.",
    solution: "Implemented scalable tech infrastructure and optimized distribution networks.",
    results: ["200% revenue growth", "5 new market entries", "30% operational cost reduction"],
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fadeIn">
          Enterprise Growth Suite
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fadeIn" style={{ animationDelay: "0.2s" }}>
          Propel your enterprise to new heights with strategic market expansion and cutting-edge tech solutions.
        </p>
        <Button size="lg" className="animate-fadeIn hover-lift" style={{ animationDelay: "0.4s" }}>
          Explore Solutions
        </Button>
      </section>

      {/* Services Grid */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12 animate-on-scroll">
          Key Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

      {/* Case Study Section */}
      <section className="mb-20 bg-secondary/30 rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-12 animate-on-scroll">
          Case Study
        </h2>
        <div className="max-w-2xl mx-auto">
          <Card className="animate-on-scroll">
            <CardHeader>
              <CardTitle>{caseStudy.title}</CardTitle>
              <p className="text-brand-green">{caseStudy.client}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Challenge</h3>
                  <p className="text-muted-foreground">{caseStudy.challenge}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Solution</h3>
                  <p className="text-muted-foreground">{caseStudy.solution}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Results</h3>
                  <ul className="list-disc list-inside text-muted-foreground">
                    {caseStudy.results.map((result) => (
                      <li key={result}>{result}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-brand-green text-white rounded-lg p-12">
        <h2 className="text-3xl font-bold mb-6 animate-on-scroll">
          Ready to Scale Your Enterprise?
        </h2>
        <p className="text-lg mb-8 opacity-90 animate-on-scroll">
          Let's explore your expansion potential—book a consultation today.
        </p>
        <Button variant="secondary" size="lg" className="hover-lift animate-on-scroll">
          Book Consultation
        </Button>
      </section>
    </div>
  );
};

export default EnterpriseGrowth;