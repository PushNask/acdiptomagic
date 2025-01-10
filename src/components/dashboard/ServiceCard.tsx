import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, ArrowRight, Star } from "lucide-react";

interface ServiceCardProps {
  service: {
    id: string;
    title: string;
    description: string;
    price: string;
    duration: string;
    features: string[];
  };
  onRequest: (service: any) => void;
}

const ServiceCard = ({ service, onRequest }: ServiceCardProps) => (
  <Card className="group hover:shadow-lg transition-all duration-200">
    <CardContent className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
            {service.title}
          </h3>
          <p className="text-muted-foreground mt-1">{service.description}</p>
        </div>
        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
          {service.price}
        </span>
      </div>

      <div className="flex items-center text-sm text-muted-foreground mb-4">
        <Clock className="h-4 w-4 mr-2" />
        <span>{service.duration}</span>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {service.features.map((feature, index) => (
          <span 
            key={index}
            className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm"
          >
            {feature}
          </span>
        ))}
      </div>

      <div className="flex justify-between items-center pt-4 border-t">
        <div className="flex items-center text-sm text-muted-foreground">
          <Star className="h-4 w-4 mr-1 text-yellow-400" />
          <span>4.8 (120 reviews)</span>
        </div>
        <Button 
          onClick={() => onRequest(service)}
          className="transition-transform hover:translate-x-1"
        >
          Request Service <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default ServiceCard;