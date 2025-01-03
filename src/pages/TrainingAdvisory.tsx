import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Users, Handshake, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const TrainingAdvisory = () => {
  const services = [
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: "Startup & SME Training",
      description: "Comprehensive training programs designed specifically for startups and SMEs to build strong foundations and scale effectively.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Business Development",
      description: "Strategic guidance and practical tools to help businesses identify opportunities, optimize operations, and drive growth.",
    },
    {
      icon: <Handshake className="h-6 w-6" />,
      title: "Coaching & Mentoring",
      description: "One-on-one coaching and mentoring sessions with experienced business leaders and industry experts.",
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Advisory Services",
      description: "Expert consultation on business strategy, market entry, financial planning, and operational excellence.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fadeIn">
          Training & Advisory Services
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fadeIn" style={{ animationDelay: "0.2s" }}>
          Empower your business journey with expert guidance, practical training, and strategic advisory services.
        </p>
      </section>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {services.map((service) => (
          <Card key={service.title} className="h-full hover-lift animate-on-scroll">
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

      {/* CTA Section */}
      <section className="text-center mt-20 bg-brand-green text-white rounded-lg p-12">
        <h2 className="text-3xl font-bold mb-6 animate-on-scroll">
          Ready to Transform Your Business?
        </h2>
        <p className="text-lg mb-8 opacity-90 animate-on-scroll">
          Join our training programs or schedule a consultation to discuss your business needs.
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

export default TrainingAdvisory;