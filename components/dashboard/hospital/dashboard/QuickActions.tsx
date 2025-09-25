'use client';

import { FC } from "react";
import Link from "next/link";

interface QuickAction {
  title: string;
  description: string;
  icon: React.ElementType;
  link: string;
  color: string;
}

interface QuickActionsProps {
  actions: QuickAction[];
}

const QuickActions: FC<QuickActionsProps> = ({ actions }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
    <div className="space-y-3">
      {actions.map((action) => (
        <Link
          key={action.title}
          href={action.link}
          className={`block p-4 rounded-lg text-white transition-colors ${action.color}`}
        >
          <div className="flex items-center space-x-3">
            <action.icon className="h-6 w-6" />
            <div>
              <div className="font-medium">{action.title}</div>
              <div className="text-sm opacity-90">{action.description}</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

export default QuickActions;
