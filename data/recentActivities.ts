'use client';

import { Users, FileText, Shield } from "lucide-react";

export const recentActivities = [
  { id: 1, type: "patient_registered", message: "New patient registered: Sarah Johnson", time: "2 minutes ago", icon: Users },
  { id: 2, type: "record_created", message: "Medical record created for John Doe", time: "15 minutes ago", icon: FileText },
  { id: 3, type: "record_verified", message: "Record verified on blockchain: #TX789", time: "1 hour ago", icon: Shield },
  { id: 4, type: "patient_updated", message: "Patient profile updated: Mary Williams", time: "2 hours ago", icon: Users },
];
