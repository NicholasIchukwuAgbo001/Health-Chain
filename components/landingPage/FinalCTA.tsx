"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import AuthModal from "@/components/auth/AuthModal";

export default function FinalCTA() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <>
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Secure Healthcare Data for Nigeria
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              Be part of the digital transformation of Nigerian healthcare. Start managing patient records securely today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowAuthModal(true)}
                className="bg-white text-primary px-8 py-4 rounded-lg hover:bg-white transition-colors font-semibold cursor-pointer"
              >
                Get Started Now
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {showAuthModal && <AuthModal onCloseAction={() => setShowAuthModal(false)} />}
    </>
  );
}
