import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileDown, Book, PresentationIcon, ChartBar } from "lucide-react";

const Resources = () => {
  const resources = [
    {
      title: "Business Guides",
      description: "Comprehensive guides for business incorporation and growth",
      items: [
        "Steps to Incorporate in Cameroon",
        "USA LLC Formation Checklist",
        "Business Plan Templates",
        "Market Entry Strategy Guide"
      ],
      icon: <Book className="h-6 w-6" />
    },
    {
      title: "Training Materials",
      description: "Resources for startups and SME development",
      items: [
        "Startup Development Workbook",
        "SME Growth Strategies",
        "Business Coaching Framework",
        "Mentorship Program Guide"
      ],
      icon: <PresentationIcon className="h-6 w-6" />
    },
    {
      title: "Industry Reports",
      description: "Analysis and insights on African markets",
      items: [
        "Tech Ecosystem Report",
        "Sustainable Energy Outlook",
        "Agricultural Innovation Study",
        "Market Trends Analysis"
      ],
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
        {resources.map((resource, index) => (
          <Card key={index} className="hover-lift">
            <CardHeader>
              <div className="p-3 bg-primary/10 rounded-full w-fit mb-4">
                {resource.icon}
              </div>
              <CardTitle>{resource.title}</CardTitle>
              <CardDescription>{resource.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {resource.items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <FileDown className="h-4 w-4 text-primary" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full mt-6">
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