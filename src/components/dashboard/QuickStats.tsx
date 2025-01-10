import { Card, CardContent } from "@/components/ui/card";
import { FileText, Download, MessageCircle, Calendar } from "lucide-react";

const QuickStats = () => {
  const stats = [
    { label: "Active Projects", value: "3", icon: FileText },
    { label: "Resources Downloaded", value: "12", icon: Download },
    { label: "Support Tickets", value: "2", icon: MessageCircle },
    { label: "Upcoming Meetings", value: "1", icon: Calendar }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center">
              <div className="p-3 rounded-full bg-primary/10 mr-4">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-semibold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default QuickStats;