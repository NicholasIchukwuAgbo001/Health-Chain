"use client";

import { CheckCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  "Reduce medical fraud and forgery",
  "Improve patient data portability",
  "Enable instant record verification",
  "Ensure HIPAA compliance",
  "Streamline hospital workflows",
  "Build patient trust and transparency",
];

export default function BenefitsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <h2 className="text-3xl font-bold text-foreground mb-6">Transform Healthcare Data Management</h2>
          <p className="text-lg text-lightgrey mb-8">
            Health Chain addresses critical challenges in Nigerian healthcare by providing a secure, transparent, and efficient way to manage patient records.
          </p>
          <div className="space-y-4">
            {benefits.map((b, i) => (
              <motion.div
                key={b}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-center space-x-3"
              >
                <CheckCircle className="h-5 w-5 text-success" />
                <span className="text-lightgrey">{b}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-primary to-primary/60 p-8 rounded-2xl text-white"
        >
          <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-blue-100 mb-6">
            Join hundreds of healthcare providers already using Health Chain to secure and verify patient records.
          </p>
          <div className="space-y-4">
            <button className="w-full bg-white text-primary px-6 py-3 rounded-lg hover:bg-white transition-colors font-semibold flex items-center justify-center space-x-2">
              <span>Start Free Trial</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <div className="text-center text-sm text-white">
              No setup fees • 30-day free trial • Cancel anytime
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
