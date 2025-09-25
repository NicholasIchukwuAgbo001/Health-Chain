import { Shield, Smartphone } from "lucide-react";

interface AuthTypeSelectorProps {
  authType: "hospital" | "patient";
  onChange: (type: "hospital" | "patient") => void;
}

export default function AuthTypeSelector({
  authType,
  onChange,
}: AuthTypeSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3 mb-6">
      <button
        onClick={() => onChange("hospital")}
        className={`p-3 rounded-lg border-2 transition-all shadow-sm cursor-pointer ${
          authType === "hospital"
            ? "border-primary/80 bg-blue-50 text-primary"
            : "border-gray-200 hover:border-gray-300"
        }`}
      >
        <div className="text-center">
          <Shield className="h-6 w-6 mx-auto mb-1" />
          <div className="font-medium">Hospital Staff</div>
        </div>
      </button>
      <button
        onClick={() => onChange("patient")}
        className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
          authType === "patient"
            ? "border-primary/80 bg-blue-50 text-primary"
            : "border-gray-200 hover:border-gray-300"
        }`}
      >
        <div className="text-center">
          <Smartphone className="h-6 w-6 mx-auto mb-1" />
          <div className="font-medium">Patient</div>
        </div>
      </button>
    </div>
  );
}
