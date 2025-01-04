import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Users, BookOpen, Target, Award, ArrowRight } from "lucide-react";

const TrainingAdvisory = () => {
  const services = [
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: "Custom Training Programs",
      description: "Tailored training solutions designed to enhance your team's capabilities and drive performance.",
      features: ["Leadership Development", "Technical Skills", "Process Training", "Team Building"],
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Strategic Advisory",
      description: "Expert consultation on business strategy, market entry, and operational excellence.",
      features: ["Business Strategy", "Market Analysis", "Risk Assessment", "Growth Planning"],
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Mentorship Programs",
      description: "One-on-one coaching and group mentoring sessions with industry experts.",
      features: ["Executive Coaching", "Career Development", "Performance Coaching", "Leadership Mentoring"],
    },
  ];

  const stats = [
    { icon: <Target className="h-8 w-8" />, value: "500+", label: "Professionals Trained" },
    { icon: <Award className="h-8 w-8" />, value: "95%", label: "Success Rate" },
    { icon: <Users className="h-8 w-8" />, value: "50+", label: "Partner Companies" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30" variant="secondary">
            Training & Advisory
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fadeIn text-[#0EA5E9] max-w-3xl">
            Transform Your Team's Potential
          </h1>
          <p className="text-xl md:text-2xl text-[#0EA5E9] mb-8 max-w-2xl animate-fadeIn leading-relaxed" style={{ animationDelay: "0.2s" }}>
            Expert training and advisory services to empower your team and drive sustainable business growth.
          </p>
          <a href="https://calendly.com/mbeh" target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="secondary" className="hover:shadow-lg transition-shadow duration-300">
              Schedule a Consultation
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
            <h2 className="text-3xl font-bold mb-4">Our Training & Advisory Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive programs designed to enhance your team's capabilities and drive business success.
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
          <h2 className="text-3xl font-bold mb-6">Ready to Empower Your Team?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Book a consultation to discuss your training and advisory needs.
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

export default TrainingAdvisory;