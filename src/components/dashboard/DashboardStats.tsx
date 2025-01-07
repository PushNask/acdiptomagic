import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Headphones, Calendar } from 'lucide-react';

const DashboardStats = () => {
  return (
    <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="flex items-center p-4 md:p-6">
          <div className="rounded-full bg-blue-100 p-2 md:p-3">
            <FileText className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
          </div>
          <div className="ml-3 md:ml-4">
            <p className="text-sm text-gray-500">Total Downloads</p>
            <h3 className="text-xl md:text-2xl font-bold">0</h3>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="flex items-center p-4 md:p-6">
          <div className="rounded-full bg-orange-100 p-2 md:p-3">
            <Headphones className="h-5 w-5 md:h-6 md:w-6 text-orange-600" />
          </div>
          <div className="ml-3 md:ml-4">
            <p className="text-sm text-gray-500">Support Tickets</p>
            <h3 className="text-xl md:text-2xl font-bold">0 / 0 Open</h3>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow md:col-span-2 lg:col-span-1">
        <CardContent className="flex items-center p-4 md:p-6">
          <div className="rounded-full bg-green-100 p-2 md:p-3">
            <Calendar className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
          </div>
          <div className="ml-3 md:ml-4">
            <p className="text-sm text-gray-500">Consultations</p>
            <h3 className="text-xl md:text-2xl font-bold">0 Scheduled</h3>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;