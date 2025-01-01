import React from 'react';
import { CheckCircle } from 'lucide-react';

interface OrderTimelineProps {
  timeline: Array<{
    date: string;
    status: string;
  }>;
}

export const OrderTimeline<OrderTimelineProps> = ({ timeline }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">Order Timeline</h2>
      <div className="space-y-6">
        {timeline.map((event, index) => (
          <div key={index} className="relative">
            {index !== timeline.length - 1 && (
              <div className="absolute top-5 left-4 h-full w-0.5 bg-blue-100" />
            )}
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <CheckCircle className="h-8 w-8 text-blue-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">{event.status}</p>
                <p className="text-sm text-gray-500">{event.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};