import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { FileDown, Book, PresentationIcon, ChartBar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Resource {
  id: string;
  title: string;
  description: string;
  file_url: string;
  price: number;
  category: string;
}

const Resources = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setResources(data || []);
    } catch (error) {
      console.error('Error fetching resources:', error);
      toast({
        title: "Error",
        description: "Failed to load resources. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleBuyClick = (resource: Resource) => {
    setSelectedResource(resource);
    setIsDialogOpen(true);
  };

  const categories = [
    {
      title: "Business Guides",
      description: "Comprehensive guides for business incorporation and growth",
      icon: <Book className="h-6 w-6" />
    },
    {
      title: "Training Materials",
      description: "Resources for startups and SME development",
      icon: <PresentationIcon className="h-6 w-6" />
    },
    {
      title: "Industry Reports",
      description: "Analysis and insights on African markets",
      icon: <ChartBar className="h-6 w-6" />
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Resources & Downloads</h1>
        <p className="text-lg text-gray-600">
          Equip yourself with the right tools and knowledge to navigate Africa's dynamic markets.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category, index) => (
          <Card key={index} className="hover-lift">
            <CardHeader>
              <div className="p-3 bg-primary/10 rounded-full w-fit mb-4">
                {category.icon}
              </div>
              <CardTitle>{category.title}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {resources
                  .filter(resource => resource.category === category.title)
                  .slice(0, 4)
                  .map((resource, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <FileDown className="h-4 w-4 text-primary" />
                      <span className="text-sm">{resource.title}</span>
                    </li>
                  ))}
              </ul>
              <Button 
                className="w-full mt-6"
                onClick={() => {
                  const resourcesInCategory = resources.filter(r => r.category === category.title);
                  if (resourcesInCategory.length > 0) {
                    handleBuyClick(resourcesInCategory[0]);
                  }
                }}
              >
                Access Resources
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Purchase Instructions</DialogTitle>
            <DialogDescription>
              Follow these steps to access {selectedResource?.title}:
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm">
              1. Contact our sales team at <span className="font-medium">sales@acdito-push.com</span>
            </p>
            <p className="text-sm">
              2. Reference the resource: {selectedResource?.title}
            </p>
            <p className="text-sm">
              3. Price: ${selectedResource?.price}
            </p>
            <p className="text-sm">
              4. You'll receive access instructions within 24 hours after payment confirmation.
            </p>
            <Button 
              className="w-full"
              onClick={() => {
                window.location.href = `mailto:sales@acdito-push.com?subject=Purchase%20Request:%20${selectedResource?.title}&body=I'm%20interested%20in%20purchasing%20${selectedResource?.title}.%20Please%20provide%20payment%20instructions.`;
                setIsDialogOpen(false);
              }}
            >
              Contact Sales Team
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Resources;