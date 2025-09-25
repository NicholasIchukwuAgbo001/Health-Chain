'use client';

import { Plus, Search, Shield } from "lucide-react";

export const quickActions = [
  { title: "Register New Patient", description: "Add a new patient to the system", icon: Plus, link: "/hospital/patients", color: "bg-blue-600 hover:bg-blue-700" },
  { title: "Search Patients", description: "Find existing patient records", icon: Search, link: "/hospital/patients", color: "bg-green-600 hover:bg-green-700" },
  { title: "Verify Records", description: "Verify record authenticity", icon: Shield, link: "/hospital/patients", color: "bg-purple-600 hover:bg-purple-700" },
];
