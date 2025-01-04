import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Rocket, Building, Leaf, Globe, GraduationCap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Services = () => {
  const services = [
    {
      icon: <Rocket className="h-6 w-6" />,
      title: "Startup Booster",
      description: "Launch and scale your venture with expert guidance and solid foundation. Get comprehensive support from ideation to market entry.",
      features: ["Business Plan Development", "Market Research", "Prototype Development"],
      path: "/services/startup-booster",
    },
    {
      icon: <Building className="h-6 w-6" />,
      title: "Enterprise Growth",
      description: "Scale your established business with strategic market expansion and cutting-edge technological solutions.",
      features: ["Market Expansion Strategies", "Advanced Tech Solutions", "Project Management"],
      path: "/services/enterprise-growth",
    },
    {
      icon: <Leaf className="h-6 w-6" />,
      title: "Sustainability Focus",
      description: "Champion sustainability through innovative energy and agriculture solutions for a greener future.",
      features: ["Off-Grid Energy Projects", "Smart Agriculture", "Supply Chain Optimization"],
      path: "/services/sustainability-focus",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Business Incorporation",
      description: "Establish your business seamlessly in Africa or the USA with our comprehensive incorporation services.",
      features: ["Legal Structure Guidance", "Tax Registration", "Compliance Support"],
      path: "/services/business-incorporation",
    },
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: "Training & Advisory",
      description: "Enhance your team's capabilities with expert training and strategic advisory services.",
      features: ["Custom Training Programs", "Strategic Consulting", "Mentorship"],
      path: "/services/training-advisory",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <Badge className="mb-4" variant="secondary">Our Services</Badge>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fadeIn">
          Comprehensive Solutions for Your Business
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fadeIn">
          From startup guidance to enterprise growth, we offer tailored services to meet 
          your business needs at every stage of development.
        </p>
      </section>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {services.map((service) => (
          <Link key={service.title} to={service.path}>
            <Card className="h-full hover-lift">
              <CardHeader>
                <div className="text-brand-green mb-4">{service.icon}</div>
                <CardTitle className="flex items-center justify-between">
                  {service.title}
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-green mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* CTA Section */}
      <section className="text-center bg-brand-green text-white rounded-lg p-12">
        <h2 className="text-3xl font-bold mb-6 animate-on-scroll">
          Ready to Transform Your Business?
        </h2>
        <p className="text-lg mb-8 opacity-90 animate-on-scroll">
          Contact us today to discuss how we can help your business grow and succeed.
        </p>
        <Link to="/contact">
          <Button variant="secondary" size="lg" className="hover-lift animate-on-scroll">
            Contact Us
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default Services;