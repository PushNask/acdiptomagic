import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Headphones, Calendar } from 'lucide-react';

const DashboardStats = () => {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card>
        <CardContent className="flex items-center p-6">
          <div className="rounded-full bg-blue-100 p-3">
            <FileText className="h-6 w-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-500">Total Downloads</p>
            <h3 className="text-2xl font-bold">0</h3>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center p-6">
          <div className="rounded-full bg-orange-100 p-3">
            <Headphones className="h-6 w-6 text-orange-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-500">Support Tickets</p>
            <h3 className="text-2xl font-bold">0 / 0 Open</h3>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center p-6">
          <div className="rounded-full bg-green-100 p-3">
            <Calendar className="h-6 w-6 text-green-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-500">Consultations</p>
            <h3 className="text-2xl font-bold">0 Scheduled</h3>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;