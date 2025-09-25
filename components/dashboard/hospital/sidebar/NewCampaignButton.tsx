"use client";

import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";

interface NewCampaignButtonProps {
  isIconOnly?: boolean;
}

export default function NewCampaignButton({ isIconOnly = false }: NewCampaignButtonProps) {
  return (
    <div className="flex justify-center items-center">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {isIconOnly ? (
          <Link
            href="/advertiser/campaigns/create"
            className="flex items-center justify-center w-10 h-10 bg-primary text-white rounded-full shadow cursor-pointer"
          >
            <Plus className="w-4 h-4" />
          </Link>
        ) : (
          <Link
            href="/advertiser/campaigns/create"
            className="flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-lg shadow w-full tracking-widest font-semibold text-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            New Campaign
          </Link>
        )}
      </motion.div>
    </div>
  );
}
