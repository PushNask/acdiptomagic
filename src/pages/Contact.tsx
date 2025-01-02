import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, LinkedinIcon, InstagramIcon, FacebookIcon } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone",
      details: "+237 677 123 456",
      link: "tel:+237677123456",
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      details: "info@acdito-push.com",
      link: "mailto:info@acdito-push.com",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Office",
      details: "Douala, Cameroon",
      link: "https://maps.google.com",
    },
  ];

  const socialLinks = [
    {
      icon: <LinkedinIcon className="h-6 w-6" />,
      name: "LinkedIn",
      link: "#",
    },
    {
      icon: <InstagramIcon className="h-6 w-6" />,
      name: "Instagram",
      link: "#",
    },
    {
      icon: <FacebookIcon className="h-6 w-6" />,
      name: "Facebook",
      link: "#",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fadeIn">
          Contact Us
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fadeIn" style={{ animationDelay: "0.2s" }}>
          Whether you're launching a startup, scaling an enterprise, or seeking sustainable solutions, our team is ready to help.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <Card className="p-6 animate-on-scroll">
          <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <Input id="email" type="email" placeholder="your@email.com" />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2">
                Subject
              </label>
              <Input id="subject" placeholder="How can we help?" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <Textarea
                id="message"
                placeholder="Tell us about your project..."
                className="min-h-[150px]"
              />
            </div>
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        </Card>

        {/* Contact Information */}
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {contactInfo.map((item) => (
              <a
                key={item.title}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Card className="p-6 text-center hover-lift animate-on-scroll">
                  <div className="text-brand-green mb-4 flex justify-center">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.details}</p>
                </Card>
              </a>
            ))}
          </div>

          {/* Social Links */}
          <Card className="p-6 animate-on-scroll">
            <h2 className="text-2xl font-bold mb-6">Connect With Us</h2>
            <div className="flex justify-center space-x-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-brand-green transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </Card>

          {/* Business Hours */}
          <Card className="p-6 animate-on-scroll">
            <h2 className="text-2xl font-bold mb-6">Business Hours</h2>
            <div className="space-y-2 text-muted-foreground">
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday: 9:00 AM - 1:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;