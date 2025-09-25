'use client';

import { FC } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

interface ActivityItem {
  id: number;
  type: string;
  message: string;
  time: string;
  icon: React.ElementType;
}

interface RecentActivityProps {
  activities: ActivityItem[];
}

const RecentActivity: FC<RecentActivityProps> = ({ activities }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
      <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</a>
    </div>

    <div className="space-y-4">
      {activities.map((activity, index) => (
        <motion.div
          key={activity.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
          className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <activity.icon className="h-5 w-5 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">{activity.message}</p>
            <div className="flex items-center mt-1 text-xs text-gray-500">
              <Clock className="h-3 w-3 mr-1" />
              {activity.time}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

export default RecentActivity;
