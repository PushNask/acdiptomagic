import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const successStories = [
  {
    title: "Solar-Powered Agriculture",
    client: "Green Farms Cooperative",
    description: "Implemented sustainable farming solutions that increased crop yield by 40% while reducing energy costs.",
    impact: ["40% Yield Increase", "60% Cost Reduction", "100% Renewable Energy"],
    category: "Sustainability"
  },
  {
    title: "Tech Startup Launch",
    client: "FinTech Solutions Ltd",
    description: "Guided a fintech startup from concept to market launch in 6 months, securing $2M in seed funding.",
    impact: ["$2M Funding Secured", "6-Month Launch", "10K+ Users"],
    category: "Startup"
  },
  {
    title: "Enterprise Digital Transformation",
    client: "African Trade Corp",
    description: "Led complete digital transformation, resulting in 75% improved operational efficiency.",
    impact: ["75% Efficiency Gain", "90% Paper Reduction", "50% Cost Savings"],
    category: "Enterprise"
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
            <Card key={index} className="p-6 hover-lift">
              <Badge className="mb-4" variant="secondary">{story.category}</Badge>
              <h3 className="text-xl font-semibold mb-2">{story.title}</h3>
              <p className="text-sm text-brand-green mb-4">{story.client}</p>
              <p className="text-gray-600 mb-6">{story.description}</p>
              <div className="space-y-2">
                {story.impact.map((impact, i) => (
                  <div key={i} className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-brand-green rounded-full mr-2" />
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