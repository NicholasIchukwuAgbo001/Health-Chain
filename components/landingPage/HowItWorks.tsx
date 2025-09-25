"use client";

import { Shield, FileCheck, Users } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: Shield,
    title: "1. Hospital Creates Record",
    description:
      "Medical staff securely input patient data. Records are encrypted and stored in our secure database.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: FileCheck,
    title: "2. Blockchain Verification",
    description:
      "A cryptographic hash is generated and stored on Sui blockchain, creating immutable proof of record authenticity.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: Users,
    title: "3. Secure Access & Verification",
    description:
      "Patients access their records securely. Third parties can verify authenticity using blockchain hashes.",
    color: "bg-purple-100 text-purple-600",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            How Health Chain Works
          </h2>
          <p className="text-lg text-lightgery max-w-2xl mx-auto">
            A simple three-step process that ensures security, privacy, and verifiability
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center"
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${step.color.split(" ")[0]}`}
              >
                <step.icon className={`h-8 w-8 ${step.color.split(" ")[1]}`} />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-lightgrey">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
