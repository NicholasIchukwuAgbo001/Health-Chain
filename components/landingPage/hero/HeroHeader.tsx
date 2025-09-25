"use client";

import { motion } from "framer-motion";

export default function HeroHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <p className="text-primary font-semibold uppercase tracking-wide mb-3">
        Blockchain-Backed Health Data
      </p>

      <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
        Secure, Portable & Verifiable
        <span className="text-primary block">Patient Records</span>
      </h1>

      <p className="text-base md:text-lg text-lightgrey mb-8 max-w-3xl mx-auto">
        A modern digital health record system for Nigerian hospitals powered by blockchain.
        Patients own their data. Hospitals verify instantly. Government gets trusted insights.
      </p>
    </motion.div>
  );
}
