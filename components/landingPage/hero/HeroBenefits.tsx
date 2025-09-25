"use client";

import { motion } from "framer-motion";
import { FileCheck, Lock, Database, Globe } from "lucide-react";

const benefits = [
  {
    icon: FileCheck,
    title: "Immutable Records",
    text: "Every patient record is securely stored and cannot be altered or forged.",
  },
  {
    icon: Lock,
    title: "Patient Privacy",
    text: "Data is encrypted end-to-end, giving patients control over who accesses their records.",
  },
  {
    icon: Database,
    title: "Easy Access",
    text: "Hospitals can instantly retrieve accurate patient history to improve care.",
  },
  {
    icon: Globe,
    title: "Nationwide Verification",
    text: "Seamless interoperability across Nigerian hospitals and health systems.",
  },
];

export default function HeroBenefits() {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left max-w-5xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {benefits.map(({ icon: Icon, title, text }) => (
        <div
          key={title}
          className="p-6 bg-white/70 rounded-xl shadow-sm hover:shadow-md transition"
        >
          <Icon className="w-6 h-6 text-primary mb-3" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
          <p className="text-sm text-lightgrey">{text}</p>
        </div>
      ))}
    </motion.div>
  );
}
