'use client';

import { Users, FileText, Shield, Activity } from "lucide-react";

export const dashboardStats = [
  { label: "Total Patients", value: "1,247", change: "+12%", positive: true, icon: Users },
  { label: "Records Created", value: "3,892", change: "+8%", positive: true, icon: FileText },
  { label: "Verified Records", value: "3,847", change: "98.8%", positive: true, icon: Shield },
  { label: "Active Today", value: "156", change: "+23%", positive: true, icon: Activity },
];
