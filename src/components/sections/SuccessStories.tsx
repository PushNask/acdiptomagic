import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const successStories = [
  {
    title: "Environment Sustainability Startup",
    client: "ClosedLoop System Ventures",
    description: "Social enterprise that focuses on waste management and turning different types of waste into valuable products. Implemented sustainable management and tech solutions that increased yields by 40% while reducing operational costs.",
    impact: ["40% Yield Increase", "60% Cost Reduction"],
    category: "Sustainability"
  },
  {
    title: "Oil Company New Branches Launch",
    client: "Goshen Oil SARL",
    description: "Help secured $1M in funding, Guided the setup of 4 gas stations, handled the hiring and management of 65+ employees.",
    impact: ["$1M Funding Secured", "6-Month Launch", "65+ employees hired"],
    category: "Enterprise"
  },
  {
    title: "Enterprise Digital Transformation",
    client: "Beneficial Solutions LLC",
    description: "Incorporation, Business Plan, Project and Operations Management.",
    impact: ["85% Efficiency Gain", "90% Process Speed", "50% Cost Savings"],
    category: "Enterprise"
  },
  {
    title: "Enterprise Digital Transformation",
    client: "Biora Cosmetics",
    description: "Incorporation, Business Plan, Project and Operations Management planning.",
    impact: ["55% Efficiency Gain", "59% Process Speed", "30% Cost Savings"],
    category: "Cosmetic Manufacturing"
  },
  {
    title: "Team Training and Project Planning",
    client: "VALDO LLC",
    description: "Recruitments and Team Training. Project and Operations Management planning.",
    impact: ["55% Efficiency Gain", "59% Process Speed", "45% Cost Savings"],
    category: "Import/Export"
  }
];

const SuccessStories = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Success Stories</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Real results from our partnerships with businesses across Africa
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {successStories.map((story, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300">
              <Badge className="mb-4" variant="secondary">{story.category}</Badge>
              <h3 className="text-xl font-semibold mb-2">{story.title}</h3>
              <p className="text-sm text-brand-blue mb-4">{story.client}</p>
              <p className="text-gray-600 mb-6">{story.description}</p>
              <div className="space-y-2">
                {story.impact.map((impact, i) => (
                  <div key={i} className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-brand-blue rounded-full mr-2" />
                    {impact}
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;