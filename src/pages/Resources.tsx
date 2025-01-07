import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, PresentationIcon, ChartBar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Resources = () => {
  const navigate = useNavigate();

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
          <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <div className="p-3 bg-primary/10 rounded-full w-fit mb-4">
                {category.icon}
              </div>
              <CardTitle>{category.title}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full mt-6"
                onClick={() => navigate(`/resources/category/${category.title}`)}
              >
                Access Resources
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Resources;