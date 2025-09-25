'use client';

import { FC } from "react";

import DashboardStats from "@/components/dashboard/hospital/dashboard/DashboardStats";
import QuickActions from "@/components/dashboard/hospital/dashboard/QuickActions";
import RecentActivity from "@/components/dashboard/hospital/dashboard/RecentActivity";
import SystemStatus from "@/components/dashboard/hospital/dashboard/SystemStatus";

import { dashboardStats } from "@/data/dashboardStats";
import { quickActions } from "@/data/quickActions";
import { recentActivities } from "@/data/recentActivities";

const HospitalDashboard: FC = () => {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-4">
        <h1 className="text-3xl font-semibold text-dark mb-2">Hospital Dashboard</h1>
        <p className="text-lightgrey mb-5">Manage patient records and monitor system activity</p>

        <DashboardStats stats={dashboardStats} />

        <div className="grid lg:grid-cols-3 gap-8">
          <QuickActions actions={quickActions} />
          <div className="lg:col-span-2">
            <RecentActivity activities={recentActivities} />
          </div>
        </div>

        <SystemStatus />
      </div>
    </div>
  );
};

export default HospitalDashboard;
