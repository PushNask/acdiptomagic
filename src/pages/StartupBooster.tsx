import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Rocket, Target, Users } from "lucide-react";

const StartupBooster = () => {
  const services = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "Business Plan Development",
      description: "Market analysis, financial forecasting, and strategic positioning for your venture.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Market Research",
      description: "Comprehensive competitor assessments, target demographics analysis, and go-to-market strategy.",
    },
    {
      icon: <Rocket className="h-6 w-6" />,
      title: "Prototype Development",
      description: "MVP design, technical architecture guidance, and iterative user testing for tech startups.",
    },
  ];

  const benefits = [
    "Reduce time-to-market significantly",
    "Refine your business idea with expert guidance",
    "Attract potential investors with solid planning",
    "Gain competitive edge in your market",
    "Access to our network of industry experts",
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fadeIn">
          Startup Booster Program
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fadeIn" style={{ animationDelay: "0.2s" }}>
          Kick-start your venture with expert guidance and build a solid foundation for success.
        </p>
        <Button size="lg" className="animate-fadeIn hover-lift" style={{ animationDelay: "0.4s" }}>
          Get Started Today
        </Button>
      </section>

      {/* Services Grid */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12 animate-on-scroll">
          Our Services
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

      {/* Benefits Section */}
      <section className="mb-20 bg-secondary/30 rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-12 animate-on-scroll">
          Benefits
        </h2>
        <div className="max-w-2xl mx-auto">
          {benefits.map((benefit) => (
            <div key={benefit} className="flex items-center mb-4 animate-on-scroll">
              <CheckCircle className="text-brand-green mr-4 h-6 w-6 flex-shrink-0" />
              <p className="text-lg">{benefit}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-brand-green text-white rounded-lg p-12">
        <h2 className="text-3xl font-bold mb-6 animate-on-scroll">
          Ready to Launch Your Startup?
        </h2>
        <p className="text-lg mb-8 opacity-90 animate-on-scroll">
          Contact us today for a custom quote and let's start building your success story.
        </p>
        <Button variant="secondary" size="lg" className="hover-lift animate-on-scroll">
          Get a Quote
        </Button>
      </section>
    </div>
  );
};

export default StartupBooster;