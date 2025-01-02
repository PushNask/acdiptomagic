import React from "react";
import { Card } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from "recharts";
import { TrendingUp, Zap, Leaf, Building2, Heart, ShoppingBag, Wallet, Plane, GraduationCap, Router } from "lucide-react";

const sectorGrowthData = [
  { sector: "Tech", growth: 85, projected: 95 },
  { sector: "Agri", growth: 65, projected: 80 },
  { sector: "Energy", growth: 70, projected: 90 },
  { sector: "Mfg", growth: 55, projected: 75 },
  { sector: "Health", growth: 60, projected: 85 },
];

const yearlyTrendData = [
  { year: "2020", value: 30 },
  { year: "2021", value: 45 },
  { year: "2022", value: 60 },
  { year: "2023", value: 75 },
  { year: "2024", value: 85 },
  { year: "2025", value: 95 },
];

const sectorIcons = {
  Tech: TrendingUp,
  Agri: Leaf,
  Energy: Zap,
  Mfg: Building2,
  Health: Heart,
  Retail: ShoppingBag,
  Finance: Wallet,
  Tourism: Plane,
  Education: GraduationCap,
  Infrastructure: Router,
};

const TrendsSector = () => {
  return (
    <section className="py-20 px-4 bg-secondary/30">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 animate-on-scroll">
          Current and Projected Trends Across Key Sectors
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Growth by Sector Chart */}
          <Card className="p-6 glass-card">
            <h3 className="text-xl font-semibold mb-6">Sector Growth Rates (%)</h3>
            <ChartContainer className="w-full aspect-[4/3]" config={{}}>
              <BarChart data={sectorGrowthData}>
                <XAxis dataKey="sector" />
                <YAxis />
                <ChartTooltip>
                  <ChartTooltipContent />
                </ChartTooltip>
                <Bar dataKey="growth" fill="#2E7D32" name="Current Growth" />
                <Bar dataKey="projected" fill="#FFC107" name="Projected Growth" />
              </BarChart>
            </ChartContainer>
          </Card>

          {/* Overall Market Trend Chart */}
          <Card className="p-6 glass-card">
            <h3 className="text-xl font-semibold mb-6">Market Growth Trajectory</h3>
            <ChartContainer className="w-full aspect-[4/3]" config={{}}>
              <LineChart data={yearlyTrendData}>
                <XAxis dataKey="year" />
                <YAxis />
                <ChartTooltip>
                  <ChartTooltipContent />
                </ChartTooltip>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#2E7D32" 
                  strokeWidth={2}
                  name="Market Growth"
                />
              </LineChart>
            </ChartContainer>
          </Card>
        </div>

        {/* Key Sectors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {Object.entries(sectorIcons).map(([sector, Icon]) => (
            <Card key={sector} className="p-4 glass-card hover-lift">
              <div className="flex flex-col items-center text-center">
                <Icon className="h-8 w-8 mb-2 text-brand-green" />
                <h4 className="font-semibold">{sector}</h4>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendsSector;