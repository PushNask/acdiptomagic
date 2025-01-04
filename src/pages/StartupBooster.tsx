import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RocketLaunch, Target, Users, ChartBar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const StartupBooster = () => {
  const services = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "Business Plan Development",
      description: "Comprehensive market analysis, financial forecasting, and strategic positioning for your venture.",
      features: ["Market Analysis", "Financial Modeling", "Strategic Planning", "Risk Assessment"],
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Market Research",
      description: "In-depth competitor assessments, target demographics analysis, and go-to-market strategy.",
      features: ["Competitor Analysis", "Customer Insights", "Market Trends", "Entry Strategy"],
    },
    {
      icon: <RocketLaunch className="h-6 w-6" />,
      title: "Prototype Development",
      description: "MVP design, technical architecture guidance, and iterative user testing for tech startups.",
      features: ["MVP Design", "Tech Architecture", "User Testing", "Iteration Plans"],
    },
  ];

  const stats = [
    { icon: <Target className="h-8 w-8" />, value: "90%", label: "Success Rate" },
    { icon: <Users className="h-8 w-8" />, value: "200+", label: "Startups Launched" },
    { icon: <ChartBar className="h-8 w-8" />, value: "$10M+", label: "Funding Secured" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-brand-green text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30" variant="secondary">
            Startup Booster
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fadeIn">
            Launch Your Startup with Confidence
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl animate-fadeIn" style={{ animationDelay: "0.2s" }}>
            Expert guidance and support to transform your vision into a thriving business reality.
          </p>
          <Link to="/contact">
            <Button size="lg" variant="secondary" className="hover-lift">
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
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
            <h2 className="text-3xl font-bold mb-4">Our Startup Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive programs designed to take your startup from concept to market success.
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
          <h2 className="text-3xl font-bold mb-6">Ready to Launch Your Startup?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join our startup booster program and turn your vision into reality.
          </p>
          <Link to="/contact">
            <Button variant="secondary" size="lg" className="hover-lift">
              Book a Strategy Session
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default StartupBooster;