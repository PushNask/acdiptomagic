import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Target, Shield, Lightbulb } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Integrity",
      description: "We hold ourselves to the highest ethical standards in all our dealings.",
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Innovation",
      description: "We stay ahead of the curve in business and technology solutions.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Collaboration",
      description: "We believe in the power of partnerships to achieve extraordinary results.",
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Impact",
      description: "We measure our success through the tangible growth of our clients.",
    },
  ];

  const stats = [
    { value: "30+", label: "Years Combined Experience" },
    { value: "100+", label: "Satisfied Clients" },
    { value: "15+", label: "African Markets" },
    { value: "50+", label: "Successful Projects" },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <Badge className="mb-4" variant="secondary">About Us</Badge>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fadeIn">
          Empowering Africa's Future
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fadeIn">
          AcDiToPush is more than a consulting firm—we are passionate champions of Africa's potential, 
          bridging business expertise with technological innovation.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="mb-20">
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="hover-lift">
            <CardContent className="pt-6">
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-muted-foreground">
                To deliver reliable, results-oriented, and customized solutions for startups, 
                enterprises, and governments in Africa, leveraging best-in-class technology 
                and strategic business insights.
              </p>
            </CardContent>
          </Card>
          <Card className="hover-lift">
            <CardContent className="pt-6">
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-muted-foreground">
                To become Africa's most trusted, impactful, and innovative business and 
                technology consulting partner, spearheading sustainable development and 
                growth across the continent and beyond.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Core Values */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <Card key={index} className="hover-lift">
              <CardContent className="pt-6">
                <div className="text-brand-green mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="mb-20 bg-secondary/30 rounded-lg p-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-2">
              <div className="text-4xl font-bold text-brand-green">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-12">Our Leadership</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          With over three decades of combined experience in business strategy, 
          technology, and sustainable project management, our team brings deep 
          expertise to every challenge.
        </p>
      </section>
    </div>
  );
};

export default About;