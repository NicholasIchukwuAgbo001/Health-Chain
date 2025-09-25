import { Shield, X } from "lucide-react";

interface AuthHeaderProps {
  onClose: () => void;
}

export default function AuthHeader({ onClose }: AuthHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center space-x-2">
        <Shield className="h-6 w-6 text-primary" />
        <h2 className="text-xl font-semibold text-lightgrey">
          Health Chain Login
        </h2>
      </div>
      <button
        onClick={onClose}
        aria-label="Close modal"
        className="text-foreh=ground/80 hover:text-foreground/50 transition-colors"
      >
        <X className="h-6 w-6 cursor-pointer" />
      </button>
    </div>
  );
}
