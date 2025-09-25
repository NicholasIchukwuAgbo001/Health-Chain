"use client";

import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-lightgrey text-center md:text-left">
            © {new Date().getFullYear()} Health Chain — Digital Patient Records System. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <Link
              href="/privacy"
              className="text-sm text-lightgrey hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-lightgrey hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/contact"
              className="text-sm text-lightgrey hover:text-primary transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-lightgrey/50 text-center">
          <p className="text-xs text-lightgrey">
            Secure healthcare data management powered by blockchain technology
          </p>
        </div>
      </div>
    </footer>
  );
}
