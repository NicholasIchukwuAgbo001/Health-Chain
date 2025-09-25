'use client';

import { FC } from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

interface Stat {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  icon: React.ElementType;
}

interface DashboardStatsProps {
  stats: Stat[];
}

const DashboardStats: FC<DashboardStatsProps> = ({ stats }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    {stats.map((stat, index) => (
      <motion.div
        key={stat.label}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg border border-gray-200 cursor-pointer transition-shadow"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <div className={`flex items-center mt-1 ${stat.positive ? "text-green-600" : "text-red-600"}`}>
              <TrendingUp className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">{stat.change}</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <stat.icon className="h-6 w-6 text-blue-600" />
          </div>
        </div>
      </motion.div>
    ))}
  </div>
);

export default DashboardStats;
