import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Users, Handshake, BookOpen, ArrowRight, Target, Award } from "lucide-react";
import { Link } from "react-router-dom";

const TrainingAdvisory = () => {
  const services = [
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: "Startup & SME Training",
      description: "Comprehensive training programs designed specifically for startups and SMEs to build strong foundations and scale effectively.",
      features: ["Business Plan Development", "Financial Management", "Market Analysis"],
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Business Development",
      description: "Strategic guidance and practical tools to help businesses identify opportunities, optimize operations, and drive sustainable growth.",
      features: ["Growth Strategy", "Process Optimization", "Team Building"],
    },
    {
      icon: <Handshake className="h-6 w-6" />,
      title: "Coaching & Mentoring",
      description: "One-on-one coaching and mentoring sessions with experienced business leaders and industry experts to accelerate your success.",
      features: ["Leadership Development", "Strategic Planning", "Performance Coaching"],
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Advisory Services",
      description: "Expert consultation on business strategy, market entry, financial planning, and operational excellence tailored to your needs.",
      features: ["Risk Assessment", "Market Entry Strategy", "Financial Advisory"],
    },
  ];

  const stats = [
    { icon: <Target className="h-8 w-8" />, value: "500+", label: "Trained Professionals" },
    { icon: <Award className="h-8 w-8" />, value: "95%", label: "Success Rate" },
    { icon: <Users className="h-8 w-8" />, value: "50+", label: "Partner Companies" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-brand-green text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30" variant="secondary">
            Training & Advisory
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fadeIn">
            Transform Your Business Potential
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl animate-fadeIn" style={{ animationDelay: "0.2s" }}>
            Expert training and advisory services to empower your team and drive sustainable business growth in Africa.
          </p>
          <Link to="/contact">
            <Button size="lg" variant="secondary" className="hover-lift">
              Schedule a Consultation
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
            <h2 className="text-3xl font-bold mb-4">Our Training & Advisory Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive programs designed to address your specific business needs and challenges.
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
          <h2 className="text-3xl font-bold mb-6">Ready to Accelerate Your Growth?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join our training programs or schedule a consultation to discuss your business needs.
          </p>
          <Link to="/contact">
            <Button variant="secondary" size="lg" className="hover-lift">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default TrainingAdvisory;