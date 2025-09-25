'use client';

import { FC } from "react";

const SystemStatus: FC = () => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-8">
    <h2 className="text-lg font-semibold text-gray-900 mb-4">System Status</h2>

    <div className="grid md:grid-cols-3 gap-6">
      {["Database", "Blockchain", "Encryption"].map((status) => (
        <div key={status} className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <div>
            <div className="font-medium text-gray-900">{status}</div>
            <div className="text-sm text-gray-600">Operational</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default SystemStatus;
