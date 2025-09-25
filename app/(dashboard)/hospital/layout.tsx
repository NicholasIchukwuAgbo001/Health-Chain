import HospitalClientLayout from "@/components/dashboard/hospital/HospitalClientLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Advertiser Dashboard",
  description: "Manage your advertising campaigns and analytics.",
};

export default function AdvertiserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <HospitalClientLayout>{children}</HospitalClientLayout>;
}
